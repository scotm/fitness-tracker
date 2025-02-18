"use server";

import type { ExerciseInsert } from "~/types";

export const createExercise = async (
	data: ExerciseInsert & { equipment: string[] },
) => {
	console.log(data);
};
