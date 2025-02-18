import {
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

import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const exerciseSchema = createSelectSchema(exercises);
export const exerciseInsertSchema = createInsertSchema(exercises);
export const equipmentSchema = createSelectSchema(equipment);
export const equipmentInsertSchema = createInsertSchema(equipment);
export const muscleSchema = createSelectSchema(muscles);
export const muscleInsertSchema = createInsertSchema(muscles);
export const workoutSchema = createSelectSchema(workouts);
export const workoutInsertSchema = createInsertSchema(workouts);
export const workoutExerciseSchema = createSelectSchema(workoutExercises);
export const workoutExerciseInsertSchema = createInsertSchema(workoutExercises);
export const workoutSetSchema = createSelectSchema(workoutSets);
export const workoutSetInsertSchema = createInsertSchema(workoutSets);
export const exerciseLogSchema = createSelectSchema(exerciseLogs);
export const exerciseLogInsertSchema = createInsertSchema(exerciseLogs);
export const personalRecordSchema = createSelectSchema(personalRecords);
export const personalRecordInsertSchema = createInsertSchema(personalRecords);
export const exerciseEquipmentSchema = createSelectSchema(exerciseEquipment);
export const exerciseEquipmentInsertSchema =
	createInsertSchema(exerciseEquipment);
export const exerciseMuscleSchema = createSelectSchema(exerciseMuscles);
export const exerciseMuscleInsertSchema = createInsertSchema(exerciseMuscles);
export const accountSchema = createSelectSchema(accounts);
export const accountInsertSchema = createInsertSchema(accounts);
export const userSchema = createSelectSchema(users);
export const userInsertSchema = createInsertSchema(users);

export type Exercise = typeof exercises.$inferSelect;
export type ExerciseInsert = typeof exercises.$inferInsert;

export type Equipment = typeof equipment.$inferSelect;
export type EquipmentInsert = typeof equipment.$inferInsert;

export type Muscle = typeof muscles.$inferSelect;
export type MuscleInsert = typeof muscles.$inferInsert;

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
