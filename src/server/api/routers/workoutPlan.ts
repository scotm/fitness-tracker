import { and, eq, isNull, or } from "drizzle-orm";
import { z } from "zod";
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

import { workoutPlans } from "~/server/db/schema";
import { workoutPlanInsertSchema } from "~/types";

export const workoutPlanRouter = createTRPCRouter({
	create: protectedProcedure
		.input(workoutPlanInsertSchema)
		.mutation(async ({ ctx, input }) => {
			const session = ctx.session;

			await ctx.db.insert(workoutPlans).values({
				userId: session?.user?.id ?? null,
				name: input.name,
				description: input.description,
				difficulty: input.difficulty,
				estimatedDuration: input.estimatedDuration,
			});
		}),

	getAllForUser: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.query.workoutPlans.findMany({
			where: or(
				eq(workoutPlans.userId, ctx.session.user.id),
				isNull(workoutPlans.userId),
			),
			orderBy: (plan, { desc }) => [desc(plan.createdAt)],
		});
	}),

	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			return await ctx.db.query.workoutPlans.findFirst({
				where: eq(workoutPlans.id, input.id),
			});
		}),

	update: protectedProcedure
		.input(
			workoutPlanInsertSchema
				.omit({ createdAt: true, updatedAt: true })
				.partial(),
		)
		.mutation(async ({ ctx, input }) => {
			if (!input.id) {
				throw new Error("Exercise ID is required");
			}
			await ctx.db
				.update(workoutPlans)
				.set(input)
				.where(eq(workoutPlans.id, input.id));
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.db
				.delete(workoutPlans)
				.where(
					and(
						eq(workoutPlans.id, input.id),
						eq(workoutPlans.userId, ctx.session.user.id),
					),
				);
		}),
});
