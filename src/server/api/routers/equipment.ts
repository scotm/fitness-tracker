// import { desc, eq } from "drizzle-orm";
// import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

import { equipment } from "~/server/db/schema";
import { equipmentInsertSchema } from "~/types";

export const equipmentRouter = createTRPCRouter({
	create: protectedProcedure
		.input(equipmentInsertSchema)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(equipment).values({
				id: crypto.randomUUID(),
				name: input.name,
				description: input.description,
			});
		}),

	getAll: publicProcedure.query(async ({ ctx }) => {
		const equipment = await ctx.db.query.equipment.findMany({
			orderBy: (equipment, { asc }) => [asc(equipment.name)],
		});
		return equipment;
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
