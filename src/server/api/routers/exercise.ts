import { eq } from "drizzle-orm";
import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

import {
	exerciseEquipment,
	exerciseMuscles,
	exercises,
} from "~/server/db/schema";
import { exerciseInsertSchema } from "~/types";

const exerciseInsertSchemaWithEquipment = exerciseInsertSchema.extend({
	equipment: z.array(z.string()),
	muscles: z.array(z.string()),
});

export const exerciseRouter = createTRPCRouter({
	create: protectedProcedure
		.input(exerciseInsertSchemaWithEquipment)
		.mutation(async ({ ctx, input }) => {
			const exercise = await ctx.db
				.insert(exercises)
				.values({
					id: crypto.randomUUID(),
					name: input.name,
					category: input.category,
					description: input.description,
					how_to_perform: input.how_to_perform,
					difficulty: input.difficulty,
				})
				.returning();
			if (!exercise || exercise.length === 0 || !exercise[0]) {
				throw new Error("Unable to create exercise");
			}
			for (const equipment of input.equipment) {
				await ctx.db.insert(exerciseEquipment).values({
					id: crypto.randomUUID(),
					exerciseId: exercise[0].id,
					equipmentId: equipment,
				});
			}
			for (const muscle of input.muscles) {
				await ctx.db.insert(exerciseMuscles).values({
					id: crypto.randomUUID(),
					exerciseId: exercise[0].id,
					muscleId: muscle,
				});
			}
			return exercise[0].id;
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
				with: {
					equipment: true,
					muscles: true,
				},
			});
			return exercise;
		}),

	update: protectedProcedure
		.input(exerciseInsertSchema)
		.mutation(async ({ ctx, input }) => {
			if (!input.id) {
				throw new Error("Exercise ID is required");
			}
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
