// src/types/Tour/index.ts
import { z } from 'zod';

// --- Zod schemas (validate raw data from files) ---

export const TeleportSchema = z.object({
	file: z.string(),
	line: z.number().default(1),
	highlight: z.string().optional(),
});

export const ActionSchema = z.object({
	label: z.string(),
	command: z.string(),
	persistent: z.boolean().default(false),
});

export const ValidateSchema = z.object({
	command: z.string(),
	hint: z.string(),
});

export const StepFrontmatterSchema = z.object({
	title: z.string(),
	teleport: TeleportSchema.optional(),
	actions: z.array(ActionSchema).default([]),
	validate: ValidateSchema.optional(),
	required: z.boolean().default(false),
});

export const ChapterMetaSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
});

export const BlueprintMetaSchema = z.object({
	name: z.string(),
	version: z.string(),
	author: z.string().optional(),
	editor: z.string().optional(),
});

// --- Resolved types (full in-memory representations) ---

export const ResolvedStepSchema = StepFrontmatterSchema.extend({
	id: z.string(),
	body: z.string(),
	filePath: z.string(),
});

export const ResolvedChapterSchema = ChapterMetaSchema.extend({
	id: z.string(),
	steps: z.array(ResolvedStepSchema),
});

export const ResolvedTourSchema = BlueprintMetaSchema.extend({
	chapters: z.array(ResolvedChapterSchema),
});

// --- Inferred TypeScript types ---

export type Teleport = z.infer<typeof TeleportSchema>;
export type Action = z.infer<typeof ActionSchema>;
export type Validate = z.infer<typeof ValidateSchema>;
export type StepFrontmatter = z.infer<typeof StepFrontmatterSchema>;
export type ChapterMeta = z.infer<typeof ChapterMetaSchema>;
export type BlueprintMeta = z.infer<typeof BlueprintMetaSchema>;
export type ResolvedStep = z.infer<typeof ResolvedStepSchema>;
export type ResolvedChapter = z.infer<typeof ResolvedChapterSchema>;
export type ResolvedTour = z.infer<typeof ResolvedTourSchema>;
