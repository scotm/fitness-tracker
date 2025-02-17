import type {
	accounts,
	exerciseEquipment,
	exerciseLogs,
	exerciseMuscles,
	exercises,
	equipment,
	muscles,
	personalRecords,
	users,
	workoutExercises,
	workoutSets,
	workouts,
} from "../server/db/schema";

export type Exercise = {
	id: string;
	name: string;
	category: "Strength" | "Cardio" | "Flexibility" | "Balance" | "Sport";
	description?: string;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	createdAt: number;
	updatedAt?: number;
};

export type Equipment = {
	id: string;
	name: string;
	description?: string;
	createdAt: number;
	updatedAt?: number;
};

export type Muscle = {
	id: string;
	name: string;
	description?: string;
	createdAt: number;
	updatedAt?: number;
};

export type ExerciseInsert = Omit<Exercise, "createdAt" | "updatedAt">;
export type EquipmentInsert = Omit<Equipment, "createdAt" | "updatedAt">;
export type MuscleInsert = Omit<Muscle, "createdAt" | "updatedAt">;

export type ExerciseEquipment = typeof exerciseEquipment.$inferSelect;
export type ExerciseEquipmentInsert = typeof exerciseEquipment.$inferInsert;

export type Workout = typeof workouts.$inferSelect;
export type WorkoutInsert = typeof workouts.$inferInsert;

export type WorkoutExercise = typeof workoutExercises.$inferSelect;
export type WorkoutExerciseInsert = typeof workoutExercises.$inferInsert;

export type WorkoutSet = typeof workoutSets.$inferSelect;
export type WorkoutSetInsert = typeof workoutSets.$inferInsert;

export type ExerciseLog = typeof exerciseLogs.$inferSelect;
export type ExerciseLogInsert = typeof exerciseLogs.$inferInsert;

export type PersonalRecord = typeof personalRecords.$inferSelect;
export type PersonalRecordInsert = typeof personalRecords.$inferInsert;

export type ExerciseMuscle = typeof exerciseMuscles.$inferSelect;
export type ExerciseMuscleInsert = typeof exerciseMuscles.$inferInsert;

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type AccountInsert = typeof accounts.$inferInsert;
