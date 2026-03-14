// src/loader/walker.ts
import fs from 'node:fs/promises';
import path from 'node:path';
import YAML from 'yaml';
import type { BlueprintMeta, ChapterMeta } from '../types/Tour/index.js';
import { BlueprintMetaSchema, ChapterMetaSchema } from '../types/Tour/index.js';

export type RawStep = {
	id: string;
	filePath: string;
	rawContent: string;
};

export type RawChapter = {
	id: string;
	dirPath: string;
	meta: ChapterMeta;
	steps: RawStep[];
};

export type RawTour = {
	meta: BlueprintMeta;
	chapters: RawChapter[];
};

function stripPrefix(name: string): string {
	return name.replace(/^\d+-/, '');
}

function stripExtension(name: string): string {
	return name.replace(/\.md$/, '');
}

export async function walkBlueprint(blueprintDir: string): Promise<RawTour> {
	// Read blueprint.yaml
	const metaPath = path.join(blueprintDir, 'blueprint.yaml');
	let metaRaw: string;
	try {
		metaRaw = await fs.readFile(metaPath, 'utf-8');
	} catch {
		throw new Error(`Missing or unreadable blueprint.yaml at ${metaPath}`);
	}

	const metaParsed = YAML.parse(metaRaw);
	const metaResult = BlueprintMetaSchema.safeParse(metaParsed);
	if (!metaResult.success) {
		const issues = metaResult.error.issues.map(
			(i) => `${i.path.join('.')}: ${i.message}`,
		);
		throw new Error(`Invalid blueprint.yaml: ${issues.join(', ')}`);
	}

	// Discover chapter directories (sorted by name for prefix ordering)
	const entries = await fs.readdir(blueprintDir, { withFileTypes: true });
	const chapterDirs = entries
		.filter((e) => e.isDirectory())
		.sort((a, b) => a.name.localeCompare(b.name));

	const chapters: RawChapter[] = [];

	for (const dir of chapterDirs) {
		const chapterPath = path.join(blueprintDir, dir.name);

		// Read chapter.yaml
		const chapterMetaPath = path.join(chapterPath, 'chapter.yaml');
		let chapterMetaRaw: string;
		try {
			chapterMetaRaw = await fs.readFile(chapterMetaPath, 'utf-8');
		} catch {
			throw new Error(`Chapter ${dir.name} missing chapter.yaml`);
		}

		const chapterParsed = YAML.parse(chapterMetaRaw);
		const chapterResult = ChapterMetaSchema.safeParse(chapterParsed);
		if (!chapterResult.success) {
			const issues = chapterResult.error.issues.map(
				(i) => `${i.path.join('.')}: ${i.message}`,
			);
			throw new Error(
				`Invalid chapter.yaml in ${dir.name}: ${issues.join(', ')}`,
			);
		}

		// Discover step .md files (sorted by name for prefix ordering)
		const stepEntries = await fs.readdir(chapterPath, { withFileTypes: true });
		const stepFiles = stepEntries
			.filter((e) => e.isFile() && e.name.endsWith('.md'))
			.sort((a, b) => a.name.localeCompare(b.name));

		const steps: RawStep[] = [];
		for (const file of stepFiles) {
			const filePath = path.join(chapterPath, file.name);
			const rawContent = await fs.readFile(filePath, 'utf-8');
			steps.push({
				id: stripPrefix(stripExtension(file.name)),
				filePath,
				rawContent,
			});
		}

		chapters.push({
			id: stripPrefix(dir.name),
			dirPath: chapterPath,
			meta: chapterResult.data,
			steps,
		});
	}

	return {
		meta: metaResult.data,
		chapters,
	};
}
