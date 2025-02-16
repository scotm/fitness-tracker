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
	id: text("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name", { length: 255 }),
	email: text("email", { length: 255 }).notNull(),
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
		userId: text("user_id", { length: 255 })
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
		userId: text("userId", { length: 255 })
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

export const exercises = createTable("exercises", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	category: text("category").notNull(),
	description: text("description"),
	difficulty: text("difficulty"),
	targetMuscles: text("target_muscles"),
	createdAt: int("created_at", { mode: "timestamp" })
		.default(sql`(unixepoch())`)
		.notNull(),
	updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
		() => new Date(),
	),
});

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

export const workoutExercises = createTable("workout_exercises", {
	id: text("id").primaryKey(),
	workoutId: text("workout_id")
		.notNull()
		.references(() => workouts.id),
	exerciseId: text("exercise_id")
		.notNull()
		.references(() => exercises.id),
	sets: int("sets"),
	reps: int("reps"),
	weight: real("weight"),
	duration: int("duration"),
	order: int("order"),
});

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
