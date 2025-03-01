import path from "node:path";
import fs from "node:fs";

import type { ExerciseInsert, EquipmentInsert, MuscleInsert } from "~/types";

// Function to load exercise fixture data from JSON files
export function loadExerciseFixtures(): ExerciseInsert[] {
	const fixturesDir = path.join(
		process.cwd(),
		"src/server/db/fixtures/llm-output/exercises/gpt-4o-2024-08-06",
	);
	const fixtures: ExerciseInsert[] = [];

	try {
		// Check if directory exists
		if (!fs.existsSync(fixturesDir)) {
			console.warn(`Fixtures directory not found: ${fixturesDir}`);
			return [];
		}

		// Read all JSON files in the directory
		const files = fs
			.readdirSync(fixturesDir)
			.filter((file) => file.endsWith(".json"));

		for (const file of files) {
			try {
				const filePath = path.join(fixturesDir, file);
				const fileContent = fs.readFileSync(filePath, "utf-8");
				const exerciseData = JSON.parse(fileContent);

				// Map the JSON data to ExerciseInsert format
				const exercise: ExerciseInsert = {
					name: exerciseData.name,
					category: mapCategory(exerciseData),
					description: exerciseData.short_summary || "",
					how_to_perform: exerciseData.how_to_perform || "",
					difficulty: mapDifficulty(exerciseData),
				};

				fixtures.push(exercise);
			} catch (error) {
				console.error(`Error processing file ${file}:`, error);
			}
		}
	} catch (error) {
		console.error("Error loading exercise fixtures:", error);
	}

	// Sort fixtures by name
	fixtures.sort((a, b) => a.name.localeCompare(b.name));

	return fixtures;
}

// Load fixture data
export const exerciseData = loadExerciseFixtures();

// Function to generate equipment relations from fixture data
export function generateEquipmentRelations(): {
	exerciseName: string;
	equipmentNames: string[];
}[] {
	const relations: {
		exerciseName: string;
		equipmentNames: string[];
	}[] = [];

	try {
		const fixturesDir = path.join(
			process.cwd(),
			"src/server/db/fixtures/llm-output/exercises/gpt-4o-2024-08-06",
		);

		if (!fs.existsSync(fixturesDir)) {
			return [];
		}

		const files = fs
			.readdirSync(fixturesDir)
			.filter((file) => file.endsWith(".json"));

		for (const file of files) {
			try {
				const filePath = path.join(fixturesDir, file);
				const fileContent = fs.readFileSync(filePath, "utf-8");
				const exerciseData = JSON.parse(fileContent);

				if (
					exerciseData.equipment_used &&
					exerciseData.equipment_used.length > 0
				) {
					relations.push({
						exerciseName: exerciseData.name,
						equipmentNames: mapEquipmentNames(exerciseData.equipment_used),
					});
				}
			} catch (error) {
				console.error(
					`Error processing equipment relations for file ${file}:`,
					error,
				);
			}
		}
	} catch (error) {
		console.error("Error generating equipment relations:", error);
	}

	return relations;
}

// Function to generate muscle relations from fixture data
export function generateMuscleRelations(): {
	exerciseName: string;
	muscles: { name: string; role: "Primary" | "Secondary" }[];
}[] {
	const relations: {
		exerciseName: string;
		muscles: { name: string; role: "Primary" | "Secondary" }[];
	}[] = [];

	try {
		const fixturesDir = path.join(
			process.cwd(),
			"src/server/db/fixtures/llm-output/exercises/gpt-4o-2024-08-06",
		);

		if (!fs.existsSync(fixturesDir)) {
			return [];
		}

		const files = fs
			.readdirSync(fixturesDir)
			.filter((file) => file.endsWith(".json"));

		for (const file of files) {
			try {
				const filePath = path.join(fixturesDir, file);
				const fileContent = fs.readFileSync(filePath, "utf-8");
				const exerciseData = JSON.parse(fileContent);

				if (exerciseData.muscles_used && exerciseData.muscles_used.length > 0) {
					const payload = {
						exerciseName: exerciseData.name,
						muscles: mapMuscleNames(exerciseData.muscles_used),
					};
					const uniqueMuscles = new Set(
						payload.muscles.map((muscle) => muscle.name),
					);
					if (uniqueMuscles.size !== payload.muscles.length) {
						payload.muscles = [...payload.muscles];
					}
					relations.push(payload);
				}
			} catch (error) {
				console.error(
					`Error processing muscle relations for file ${file}:`,
					error,
				);
			}
		}
	} catch (error) {
		console.error("Error generating muscle relations:", error);
	}

	return relations;
}

// Helper function to map equipment names to match existing records
function mapEquipmentNames(equipmentList: string[]): string[] {
	const equipmentMap: Record<string, string> = {
		"pull-up bar": "Pull-up Bar",
		"pullup bar": "Pull-up Bar",
		dumbbell: "Dumbbells",
		dumbbells: "Dumbbells",
		barbell: "Barbell",
		kettlebell: "Kettlebell",
		"resistance band": "Resistance Bands",
		"resistance bands": "Resistance Bands",
		"gym mat": "Gym Mat",
		mat: "Gym Mat",
		bench: "Bench",
		"swiss ball": "Swiss Ball",
		"exercise ball": "Swiss Ball",
		"stability ball": "Swiss Ball",
		"jump rope": "Jump Rope",
		"sz-bar": "SZ-Bar",
		"ez bar": "SZ-Bar",
		"ez-bar": "SZ-Bar",
	};

	return equipmentList.map((item) => {
		const lowerItem = item.toLowerCase();
		return equipmentMap[lowerItem] || item;
	});
}

// Helper function to map muscle names to match existing records
function mapMuscleNames(
	muscleList: string[],
): { name: string; role: "Primary" | "Secondary" }[] {
	const muscleMap: Record<string, string> = {
		chest: "Chest (Pectoralis)",
		pectorals: "Chest (Pectoralis)",
		pectoralis: "Chest (Pectoralis)",
		pecs: "Chest (Pectoralis)",
		back: "Back (Latissimus Dorsi)",
		lats: "Back (Latissimus Dorsi)",
		"latissimus dorsi": "Back (Latissimus Dorsi)",
		shoulders: "Shoulders (Deltoids)",
		deltoids: "Shoulders (Deltoids)",
		delts: "Shoulders (Deltoids)",
		biceps: "Biceps",
		triceps: "Triceps",
		quads: "Quadriceps",
		quadriceps: "Quadriceps",
		hamstrings: "Hamstrings",
		glutes: "Glutes",
		"gluteus maximus": "Glutes",
		calves: "Soleus",
		abs: "Abs",
		abdominals: "Abs",
		"rectus abdominis": "Abs",
		core: "Core",
		traps: "Trapezius",
		trapezius: "Trapezius",
		"lower back": "Erector spinae",
		"erector spinae": "Erector spinae",
		obliques: "Obliques",
	};

	return muscleList.map((muscle) => {
		const lowerMuscle = muscle.toLowerCase();
		const mappedName = muscleMap[lowerMuscle] || muscle;
		// Assign all as Primary for simplicity
		return { name: mappedName, role: "Primary" };
	});
}

// Helper function to map category
function mapCategory(
	exerciseData: Record<string, unknown>,
): "Strength" | "Cardio" | "Flexibility" | "Balance" | "Sport" {
	if (!exerciseData.category || typeof exerciseData.category !== "string")
		return "Strength";

	switch (exerciseData.category.toLowerCase()) {
		case "strength":
			return "Strength";
		case "cardio":
			return "Cardio";
		case "flexibility":
			return "Flexibility";
		case "balance":
			return "Balance";
		case "sport":
			return "Sport";
		default:
			return "Strength";
	}
}

// Helper function to map difficulty
function mapDifficulty(
	exerciseData: Record<string, unknown>,
): "Beginner" | "Intermediate" | "Advanced" {
	// Default to Intermediate if no clear difficulty is found
	return "Intermediate";
}

// Generate equipment and muscle relations
const fixtureEquipmentRelations = generateEquipmentRelations();
const fixtureMuscleRelations = generateMuscleRelations();

export const equipmentData: EquipmentInsert[] = [
	{
		name: "None",
		description: "Requires no equipment",
	},
	{
		name: "Dumbbells",
		description: "Free weights used for resistance training",
	},
	{
		name: "Barbell",
		description: "A long bar and weights used for resistance training",
	},
	{
		name: "SZ-Bar",
		description: "A short bar and weights with a curved centre",
	},
	{
		name: "Gym Mat",
		description: "A non-slip mat for floor exercises and yoga",
	},
	{
		name: "Pull-up Bar",
		description: "A mounted bar for performing pull-ups and hanging exercises",
	},
	{
		name: "Resistance Bands",
		description: "Elastic bands used for strength training and rehabilitation",
	},
	{
		name: "Jump Rope",
		description: "A rope used for cardio and coordination exercises",
	},
	{
		name: "Swiss Ball",
		description: "A ball used for stability and balance exercises",
	},
	{
		name: "Kettlebell",
		description: "A weight used for strength training and rehabilitation",
	},
	{
		name: "Bench",
		description: "A flat surface used for strength training and rehabilitation",
	},
];

export const muscleData: MuscleInsert[] = [
	{
		name: "Chest (Pectoralis)",
		description:
			"The large muscles of the chest, responsible for pushing movements",
		is_front: true,
	},
	{
		name: "Back (Latissimus Dorsi)",
		description:
			"The large muscles of the back, responsible for pulling movements",
		is_front: false,
	},
	{
		name: "Shoulders (Deltoids)",
		description: "The three-headed shoulder muscles that control arm movement",
		is_front: true,
	},
	{
		name: "Biceps",
		description: "The front of the upper arm, responsible for elbow flexion",
		is_front: true,
	},
	{
		name: "Triceps",
		description: "The back of the upper arm, responsible for elbow extension",
		is_front: false,
	},
	{
		name: "Quadriceps",
		description: "The front thigh muscles, responsible for leg extension",
		is_front: true,
	},
	{
		name: "Hamstrings",
		description: "The back thigh muscles, responsible for leg flexion",
		is_front: false,
	},
	{
		name: "Glutes",
		description: "The buttocks muscles, responsible for hip extension",
		is_front: false,
	},
	{
		name: "Trapezius",
		is_front: false,
	},
	{
		name: "Soleus",
		description: "The lower leg muscles, responsible for plantar flexion",
		is_front: false,
	},
	{
		name: "Brachialis",
		description: "The front of the upper arm, responsible for elbow flexion",
		is_front: true,
	},
	{
		name: "Abs",
		description: "The abdominal muscles, responsible for core stability",
		is_front: true,
	},
	{
		name: "Erector spinae",
		description: "The back muscles, responsible for spine stability",
		is_front: false,
	},
	{
		name: "Obliques",
		description:
			"The side abdominal muscles, responsible for twisting movements",
		is_front: true,
	},
	{
		name: "Core",
		description:
			"The abdominal and lower back muscles that stabilize the spine",
		is_front: true,
	},
];

// Define exercise-equipment relationships
export const exerciseEquipmentRelations: {
	exerciseName: string;
	equipmentNames: string[];
}[] = [...fixtureEquipmentRelations];

// Define exercise-muscle relationships
export const exerciseMuscleRelations: {
	exerciseName: string;
	muscles: { name: string; role: "Primary" | "Secondary" }[];
}[] = [...fixtureMuscleRelations];

export const defaultUser = {
	name: "Demo User",
	email: "demo@example.com",
	password: "password123",
};

export const testUser = {
	name: "Test User",
	email: "test@example.com",
	password: "TestPassword123!",
};
