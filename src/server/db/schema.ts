import { relations, sql } from "drizzle-orm";
import {
	index,
	int,
	primaryKey,
	real,
	sqliteTableCreator,
	text,
} from "drizzle-orm/sqlite-core";
import type { AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
	(name) => `fitness-tracker_${name}`,
);

export const users = createTable("user", {
	id: text("id", { length: 36 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name", { length: 255 }),
	email: text("email", { length: 255 }).notNull(),
	password: text("password", { length: 255 }).notNull().default(""),
	emailVerified: int("email_verified", {
		mode: "timestamp",
	}).default(sql`(unixepoch())`),
	image: text("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
}));

export const accounts = createTable(
	"account",
	{
		userId: text("user_id", { length: 36 })
			.notNull()
			.references(() => users.id),
		type: text("type", { length: 255 })
			.$type<AdapterAccount["type"]>()
			.notNull(),
		provider: text("provider", { length: 255 }).notNull(),
		providerAccountId: text("provider_account_id", { length: 255 }).notNull(),
		refresh_token: text("refresh_token"),
		refresh_token_expires_in: int("refresh_token_expires_in"),
		access_token: text("access_token"),
		expires_at: int("expires_at"),
		token_type: text("token_type", { length: 255 }),
		scope: text("scope", { length: 255 }),
		id_token: text("id_token"),
		session_state: text("session_state", { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
		userIdIdx: index("account_user_id_idx").on(account.userId),
	}),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
	"session",
	{
		sessionToken: text("session_token", { length: 255 }).notNull().primaryKey(),
		userId: text("userId", { length: 36 })
			.notNull()
			.references(() => users.id),
		expires: int("expires", { mode: "timestamp" }).notNull(),
	},
	(session) => ({
		userIdIdx: index("session_userId_idx").on(session.userId),
	}),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
	"verification_token",
	{
		identifier: text("identifier", { length: 255 }).notNull(),
		token: text("token", { length: 255 }).notNull(),
		expires: int("expires", { mode: "timestamp" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);

/**
 * Exercise table storing basic exercise information
 * @property {string} id - Unique identifier for the exercise
 * @property {string} name - Name of the exercise
 * @property {("Strength"|"Cardio"|"Flexibility"|"Balance"|"Sport")} category - Exercise category
 * @property {string} description - Description of the exercise
 * @property {("Beginner"|"Intermediate"|"Advanced")} difficulty - Difficulty level of the exercise
 * @property {string} targetMuscles - Target muscle groups (comma-separated)
 * @property {number} createdAt - Unix timestamp of creation
 * @property {number} updatedAt - Unix timestamp of last update
 */
export const exercises = createTable("exercises", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	category: text("category", {
		enum: ["Strength", "Cardio", "Flexibility", "Balance", "Sport"],
	}).notNull(),
	description: text("description").notNull(),
	how_to_perform: text("how_to_perform").notNull(),
	difficulty: text("difficulty", {
		enum: ["Beginner", "Intermediate", "Advanced"],
	}).notNull(),
	createdAt: int("created_at", { mode: "timestamp" })
		.default(sql`(unixepoch())`)
		.notNull(),
	updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

/**
 * Equipment table storing available exercise equipment
 * @property {string} id - Unique identifier for the equipment
 * @property {string} name - Name of the equipment
 * @property {string} description - Optional description of the equipment
 * @property {number} createdAt - Unix timestamp of creation
 * @property {number} updatedAt - Unix timestamp of last update
 */
export const equipment = createTable("equipment", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	createdAt: int("created_at", { mode: "timestamp" })
		.default(sql`(unixepoch())`)
		.notNull(),
	updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

/**
 * Junction table for the many-to-many relationship between exercises and equipment
 * @property {string} id - Unique identifier for the relationship
 * @property {string} exerciseId - Foreign key referencing the exercise
 * @property {string} equipmentId - Foreign key referencing the equipment
 */
export const exerciseEquipment = createTable("exercise_equipment", {
	id: text("id").primaryKey(),
	exerciseId: text("exercise_id")
		.notNull()
		.references(() => exercises.id),
	equipmentId: text("equipment_id")
		.notNull()
		.references(() => equipment.id),
});

/**
 * Workout table storing user workout plans
 * @property {string} id - Unique identifier for the workout
 * @property {string} userId - Foreign key referencing the user
 * @property {string} name - Name of the workout
 * @property {string} description - Optional description of the workout
 * @property {number} createdAt - Unix timestamp of creation
 * @property {number} updatedAt - Unix timestamp of last update
 */
export const workouts = createTable("workouts", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	name: text("name").notNull(),
	description: text("description"),
	createdAt: int("created_at", { mode: "timestamp" })
		.default(sql`(unixepoch())`)
		.notNull(),
	updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

/**
 * Junction table for exercises within workouts
 * @property {string} id - Unique identifier for the workout exercise
 * @property {string} workoutId - Foreign key referencing the workout
 * @property {string} exerciseId - Foreign key referencing the exercise
 * @property {number} order - Order of the exercise within the workout
 * @property {number} targetSets - Target number of sets to complete
 */
export const workoutExercises = createTable("workout_exercises", {
	id: text("id").primaryKey(),
	workoutId: text("workout_id")
		.notNull()
		.references(() => workouts.id),
	exerciseId: text("exercise_id")
		.notNull()
		.references(() => exercises.id),
	order: int("order").notNull(),
	targetSets: int("target_sets").notNull(),
});

/**
 * Table for individual sets within workout exercises
 * @property {string} id - Unique identifier for the set
 * @property {string} workoutExerciseId - Foreign key referencing the workout exercise
 * @property {number} setNumber - Order/number of the set
 * @property {number} targetReps - Target number of repetitions
 * @property {number} targetWeight - Target weight to use
 * @property {number} targetDuration - Target duration in seconds (for timed exercises)
 * @property {number} completedReps - Actual completed repetitions
 * @property {number} completedWeight - Actual weight used
 * @property {number} completedDuration - Actual duration achieved
 * @property {boolean} isComplete - Whether the set has been completed
 */
export const workoutSets = createTable("workout_sets", {
	id: text("id").primaryKey(),
	workoutExerciseId: text("workout_exercise_id")
		.notNull()
		.references(() => workoutExercises.id),
	setNumber: int("set_number").notNull(),
	targetReps: int("target_reps"),
	targetWeight: real("target_weight"),
	targetDuration: int("target_duration"),
	completedReps: int("completed_reps"),
	completedWeight: real("completed_weight"),
	completedDuration: int("completed_duration"),
	isComplete: int("is_complete", { mode: "boolean" }).default(false).notNull(),
});

/**
 * Relations configuration for workout exercises
 */
export const workoutExercisesRelations = relations(
	workoutExercises,
	({ one, many }) => ({
		workout: one(workouts, {
			fields: [workoutExercises.workoutId],
			references: [workouts.id],
		}),
		exercise: one(exercises, {
			fields: [workoutExercises.exerciseId],
			references: [exercises.id],
		}),
		sets: many(workoutSets),
	}),
);

/**
 * Relations configuration for workout sets
 */
export const workoutSetsRelations = relations(workoutSets, ({ one }) => ({
	workoutExercise: one(workoutExercises, {
		fields: [workoutSets.workoutExerciseId],
		references: [workoutExercises.id],
	}),
}));

/**
 * Exercise logs table for tracking completed exercises
 * @property {string} id - Unique identifier for the log entry
 * @property {string} userId - Foreign key referencing the user
 * @property {string} exerciseId - Foreign key referencing the exercise
 * @property {string} workoutId - Optional foreign key referencing the workout
 * @property {number} sets - Number of sets completed
 * @property {number} reps - Number of repetitions per set
 * @property {number} weight - Weight used (in preferred unit)
 * @property {number} duration - Duration in seconds (for timed exercises)
 * @property {string} notes - Optional notes about the exercise session
 * @property {number} completedAt - Unix timestamp of completion
 */
export const exerciseLogs = createTable("exercise_logs", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	exerciseId: text("exercise_id")
		.notNull()
		.references(() => exercises.id),
	workoutId: text("workout_id").references(() => workouts.id),
	sets: int("sets"),
	reps: int("reps"),
	weight: real("weight"),
	duration: int("duration"),
	notes: text("notes"),
	completedAt: int("completed_at", { mode: "timestamp" })
		.default(sql`(unixepoch())`)
		.notNull(),
});

/**
 * Personal records table for tracking user's best performances
 * @property {string} id - Unique identifier for the record
 * @property {string} userId - Foreign key referencing the user
 * @property {string} exerciseId - Foreign key referencing the exercise
 * @property {number} value - Record value (weight, reps, or duration)
 * @property {string} type - Type of record ("weight", "reps", "duration")
 * @property {number} achievedAt - Unix timestamp when the record was achieved
 */
export const personalRecords = createTable("personal_records", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	exerciseId: text("exercise_id")
		.notNull()
		.references(() => exercises.id),
	value: real("value").notNull(),
	type: text("type").notNull(), // e.g., "weight", "reps", "duration"
	achievedAt: int("achieved_at", { mode: "timestamp" })
		.default(sql`(unixepoch())`)
		.notNull(),
});

/**
 * Muscle table storing muscle groups
 * @property {string} id - Unique identifier for the muscle
 * @property {string} name - Name of the muscle group
 * @property {string} description - Optional description of the muscle group
 * @property {number} createdAt - Unix timestamp of creation
 * @property {number} updatedAt - Unix timestamp of last update
 */
export const muscles = createTable("muscles", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	createdAt: int("created_at", { mode: "timestamp" })
		.default(sql`(unixepoch())`)
		.notNull(),
	updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

/**
 * Junction table for the many-to-many relationship between exercises and muscles
 * @property {string} id - Unique identifier for the relationship
 * @property {string} exerciseId - Foreign key referencing the exercise
 * @property {string} muscleId - Foreign key referencing the muscle
 * @property {("Primary"|"Secondary")} role - Whether this muscle is primary or secondary for the exercise
 */
export const exerciseMuscles = createTable("exercise_muscles", {
	id: text("id").primaryKey(),
	exerciseId: text("exercise_id")
		.notNull()
		.references(() => exercises.id),
	muscleId: text("muscle_id")
		.notNull()
		.references(() => muscles.id),
	role: text("role", {
		enum: ["Primary", "Secondary"],
	}).notNull(),
});

/**
 * Relations configuration for exercises table
 * Defines the relationship between exercises and their equipment
 */
export const exercisesRelations = relations(exercises, ({ many }) => ({
	equipment: many(exerciseEquipment),
	muscles: many(exerciseMuscles),
}));

/**
 * Relations configuration for equipment table
 * Defines the relationship between equipment and exercises
 */
export const equipmentRelations = relations(equipment, ({ many }) => ({
	exercises: many(exerciseEquipment),
}));

/**
 * Relations configuration for the exercise-equipment junction table
 * Defines the relationships to both exercises and equipment tables
 */
export const exerciseEquipmentRelations = relations(
	exerciseEquipment,
	({ one }) => ({
		exercise: one(exercises, {
			fields: [exerciseEquipment.exerciseId],
			references: [exercises.id],
		}),
		equipment: one(equipment, {
			fields: [exerciseEquipment.equipmentId],
			references: [equipment.id],
		}),
	}),
);

/**
 * Relations configuration for muscles table
 */
export const musclesRelations = relations(muscles, ({ many }) => ({
	exercises: many(exerciseMuscles),
}));

/**
 * Relations configuration for the exercise-muscles junction table
 */
export const exerciseMusclesRelations = relations(
	exerciseMuscles,
	({ one }) => ({
		exercise: one(exercises, {
			fields: [exerciseMuscles.exerciseId],
			references: [exercises.id],
		}),
		muscle: one(muscles, {
			fields: [exerciseMuscles.muscleId],
			references: [muscles.id],
		}),
	}),
);
