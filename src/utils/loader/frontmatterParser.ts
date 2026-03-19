// src/utils/loader/frontmatterParser.ts
import { parseFrontmatter as toolkitParseFrontmatter } from '@yaos-git/toolkit/cli/frontmatter';
import type { StepFrontmatter } from '../../types/Tour/index.js';
import { StepFrontmatterSchema } from '../../types/Tour/index.js';

export type ParsedStep = {
	frontmatter: StepFrontmatter;
	body: string;
};

// Toolkit expects SchemaLike<T> (duck-typed safeParse). Zod 3 structurally
// matches but the generic doesn't unify, so we widen through unknown.
export function parseFrontmatter(raw: string): ParsedStep {
	return toolkitParseFrontmatter(
		raw,
		StepFrontmatterSchema as unknown as Parameters<typeof toolkitParseFrontmatter<StepFrontmatter>>[1],
	);
}
