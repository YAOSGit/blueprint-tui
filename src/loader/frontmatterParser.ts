// src/loader/frontmatterParser.ts
import matter from 'gray-matter';
import type { StepFrontmatter } from '../types/Tour/index.js';
import { StepFrontmatterSchema } from '../types/Tour/index.js';

export type ParsedStep = {
	frontmatter: StepFrontmatter;
	body: string;
};

export function parseFrontmatter(raw: string): ParsedStep {
	const { data, content } = matter(raw);

	if (!data || Object.keys(data).length === 0) {
		throw new Error('Missing YAML frontmatter');
	}

	const result = StepFrontmatterSchema.safeParse(data);

	if (!result.success) {
		const issues = result.error.issues.map(
			(i) => `${i.path.join('.')}: ${i.message}`,
		);
		throw new Error(`Invalid frontmatter: ${issues.join(', ')}`);
	}

	return {
		frontmatter: result.data,
		body: content.trim(),
	};
}
