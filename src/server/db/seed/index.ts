import { db } from "..";
import {
	exercises,
	equipment,
	exerciseEquipment,
	muscles,
	exerciseMuscles,
	users,
} from "../schema";
import {
	exerciseData,
	equipmentData,
	muscleData,
	exerciseEquipmentRelations,
	exerciseMuscleRelations,
	defaultUser,
} from "./data";
import { hash } from "bcryptjs";

export async function seed() {
	console.log("🌱 Starting database seeding...");

	try {
		// Clear existing data
		await db.delete(exerciseMuscles);
		await db.delete(exerciseEquipment);
		await db.delete(exercises);
		await db.delete(equipment);
		await db.delete(muscles);
		await db.delete(users);

		console.log("Cleared existing data");

		// Create default user
		const hashedPassword = await hash(defaultUser.password, 10);
		await db.insert(users).values({
			name: defaultUser.name,
			email: defaultUser.email,
			password: hashedPassword,
		});

		console.log("Created default user");

		// Insert exercises
		const insertedExercises = await Promise.all(
			exerciseData.map(async (exercise) => {
				return db
					.insert(exercises)
					.values({
						name: exercise.name,
						category: exercise.category,
						description: exercise.description,
						how_to_perform: exercise.how_to_perform,
						difficulty: exercise.difficulty,
					})
					.returning()
					.get();
			}),
		);

		console.log(`Inserted ${insertedExercises.length} exercises`);

		// Insert equipment
		const insertedEquipment = await Promise.all(
			equipmentData.map(async (item) => {
				return db
					.insert(equipment)
					.values({
						name: item.name,
						description: item.description,
					})
					.returning()
					.get();
			}),
		);

		console.log(`Inserted ${insertedEquipment.length} equipment items`);

		// Insert muscles
		const insertedMuscles = await Promise.all(
			muscleData.map(async (muscle) => {
				return db
					.insert(muscles)
					.values({
						name: muscle.name,
						description: muscle.description,
						is_front: muscle.is_front,
					})
					.returning()
					.get();
			}),
		);

		console.log(`Inserted ${insertedMuscles.length} muscles`);

		// Create exercise-equipment relationships
		for (const relation of exerciseEquipmentRelations) {
			const exercise = insertedExercises.find(
				(e) => e.name === relation.exerciseName,
			);
			if (!exercise) continue;

			for (const equipmentName of relation.equipmentNames) {
				const equipmentItem = insertedEquipment.find(
					(e) => e.name === equipmentName,
				);
				if (!equipmentItem) continue;

				await db.insert(exerciseEquipment).values({
					exerciseId: exercise.id,
					equipmentId: equipmentItem.id,
				});
			}
		}

		console.log("Created exercise-equipment relationships");

		// Create exercise-muscle relationships
		for (const relation of exerciseMuscleRelations) {
			const exercise = insertedExercises.find(
				(e) => e.name === relation.exerciseName,
			);
			if (!exercise) continue;

			for (const muscleInfo of relation.muscles) {
				const muscle = insertedMuscles.find((m) => m.name === muscleInfo.name);
				if (!muscle) continue;

				await db.insert(exerciseMuscles).values({
					exerciseId: exercise.id,
					muscleId: muscle.id,
				});
			}
		}

		console.log("Created exercise-muscle relationships");
		console.log("✅ Seeding completed successfully");
	} catch (error) {
		console.error("❌ Error seeding database:", error);
		throw error;
	}
}

// Allow running directly from command line
if (require.main === module) {
	seed()
		.then(() => process.exit(0))
		.catch((error) => {
			console.error(error);
			process.exit(1);
		});
}
