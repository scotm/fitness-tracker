import { eq } from "drizzle-orm";
import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

import { exercises } from "~/server/db/schema";
import { exerciseInsertSchema } from "~/types";

export const exerciseRouter = createTRPCRouter({
	create: protectedProcedure
		.input(exerciseInsertSchema)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(exercises).values({
				id: crypto.randomUUID(),
				name: input.name,
				category: input.category,
				description: input.description,
				how_to_perform: input.how_to_perform,
				difficulty: input.difficulty,
			});
		}),

	getAll: publicProcedure
		.input(
			z.object({
				take: z.number().optional().default(10),
				skip: z.number().optional().default(0),
				orderBy: z.enum(["createdAt", "name"]).optional().default("createdAt"),
			}),
		)
		.query(async ({ ctx, input }) => {
			const exercises = await ctx.db.query.exercises.findMany({
				limit: input.take,
				offset: input.skip,
				orderBy: (exercises, { desc }) => [
					desc(exercises[input.orderBy as keyof typeof exercises]),
				],
			});
			return exercises;
		}),

	getLatest: publicProcedure.query(async ({ ctx }) => {
		const exercise = await ctx.db.query.exercises.findFirst({
			orderBy: (exercises, { desc }) => [desc(exercises.createdAt)],
		});

		return exercise ?? null;
	}),

	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const exercise = await ctx.db.query.exercises.findFirst({
				where: eq(exercises.id, input.id),
			});
		}),
	update: protectedProcedure
		.input(exerciseInsertSchema)
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.update(exercises)
				.set(input)
				.where(eq(exercises.id, input.id));
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db.delete(exercises).where(eq(exercises.id, input.id));
		}),
});
