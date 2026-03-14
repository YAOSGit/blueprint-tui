// src/loader/index.ts
import fs from 'node:fs';
import path from 'node:path';
import type {
	ResolvedChapter,
	ResolvedStep,
	ResolvedTour,
} from '../types/Tour/index.js';
import { parseFrontmatter } from './frontmatterParser.js';
import { walkBlueprint } from './walker.js';

export async function loadTour(
	blueprintDir: string,
	projectRoot?: string,
): Promise<ResolvedTour> {
	const raw = await walkBlueprint(blueprintDir);
	const root = projectRoot ?? path.resolve(blueprintDir, '..');

	const seenStepIds = new Set<string>();
	const seenChapterIds = new Set<string>();

	const chapters: ResolvedChapter[] = [];

	for (const rawChapter of raw.chapters) {
		if (seenChapterIds.has(rawChapter.id)) {
			throw new Error(`Duplicate chapter id: ${rawChapter.id}`);
		}
		seenChapterIds.add(rawChapter.id);

		const steps: ResolvedStep[] = [];

		for (const rawStep of rawChapter.steps) {
			if (seenStepIds.has(rawStep.id)) {
				throw new Error(`Duplicate step id: ${rawStep.id}`);
			}
			seenStepIds.add(rawStep.id);

			const { frontmatter, body } = parseFrontmatter(rawStep.rawContent);

			steps.push({
				...frontmatter,
				id: rawStep.id,
				body,
				filePath: rawStep.filePath,
			});
		}

		chapters.push({
			id: rawChapter.id,
			title: rawChapter.meta.title,
			description: rawChapter.meta.description,
			steps,
		});
	}

	if (chapters.length === 0 || chapters.every((c) => c.steps.length === 0)) {
		throw new Error('Tour has no steps');
	}

	// Pre-flight: check all teleport.file paths exist on disk
	for (const chapter of chapters) {
		for (const step of chapter.steps) {
			if (step.teleport) {
				const absPath = path.resolve(root, step.teleport.file);
				if (!fs.existsSync(absPath)) {
					throw new Error(
						`Step ${step.id}: teleport file ${step.teleport.file} not found`,
					);
				}
			}
		}
	}

	return {
		name: raw.meta.name,
		version: raw.meta.version,
		author: raw.meta.author,
		editor: raw.meta.editor,
		chapters,
	};
}
