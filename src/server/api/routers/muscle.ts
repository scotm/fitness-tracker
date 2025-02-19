// import { desc, eq } from "drizzle-orm";
// import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

import { muscles } from "~/server/db/schema";
import { muscleInsertSchema } from "~/types";

export const muscleRouter = createTRPCRouter({
	create: protectedProcedure
		.input(muscleInsertSchema)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(muscles).values({
				id: crypto.randomUUID(),
				name: input.name,
				description: input.description,
			});
		}),

	getAll: publicProcedure.query(async ({ ctx }) => {
		const muscles = await ctx.db.query.muscles.findMany({
			orderBy: (muscle, { asc }) => [asc(muscle.name)],
		});
		return muscles;
	}),

	// getById: publicProcedure
	// 	.input(z.object({ id: z.string() }))
	// 	.query(async ({ ctx, input }) => {
	// 		const exercise = await ctx.db.query.exercises.findFirst({
	// 			where: eq(exercises.id, input.id),
	// 		});
	// 	}),

	// update: protectedProcedure
	// 	.input(exerciseInsertSchema)
	// 	.mutation(async ({ ctx, input }) => {
	// 		if (!input.id) {
	// 			throw new Error("Exercise ID is required");
	// 		}
	// 		await ctx.db
	// 			.update(exercises)
	// 			.set(input)
	// 			.where(eq(exercises.id, input.id));
	// 	}),

	// delete: protectedProcedure
	// 	.input(z.object({ id: z.string() }))
	// 	.mutation(async ({ ctx, input }) => {
	// 		await ctx.db.delete(exercises).where(eq(exercises.id, input.id));
	// 	}),
});
