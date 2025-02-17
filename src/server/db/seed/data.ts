import type { ExerciseInsert, EquipmentInsert, MuscleInsert } from "~/types";

export const exerciseData: Omit<ExerciseInsert, "id">[] = [
	{
		name: "Push-ups",
		category: "Strength",
		description:
			"A classic bodyweight exercise that targets the chest, shoulders, and triceps",
		difficulty: "Beginner",
	},
	{
		name: "Pull-ups",
		category: "Strength",
		description:
			"An upper body exercise that primarily targets the back and biceps",
		difficulty: "Intermediate",
	},
	{
		name: "Squats",
		category: "Strength",
		description:
			"A lower body compound exercise that targets the quadriceps, hamstrings, and glutes",
		difficulty: "Beginner",
	},
	{
		name: "Running",
		category: "Cardio",
		description:
			"A fundamental cardio exercise that improves endurance and cardiovascular health",
		difficulty: "Beginner",
	},
	{
		name: "Yoga Flow",
		category: "Flexibility",
		description:
			"A series of poses that improve flexibility, balance, and mind-body connection",
		difficulty: "Beginner",
	},
];

export const equipmentData: Omit<EquipmentInsert, "id">[] = [
	{
		name: "Dumbbells",
		description: "Free weights used for resistance training",
	},
	{
		name: "Yoga Mat",
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
];

export const muscleData: Omit<MuscleInsert, "id">[] = [
	{
		name: "Chest (Pectoralis)",
		description:
			"The large muscles of the chest, responsible for pushing movements",
	},
	{
		name: "Back (Latissimus Dorsi)",
		description:
			"The large muscles of the back, responsible for pulling movements",
	},
	{
		name: "Shoulders (Deltoids)",
		description: "The three-headed shoulder muscles that control arm movement",
	},
	{
		name: "Biceps",
		description: "The front of the upper arm, responsible for elbow flexion",
	},
	{
		name: "Triceps",
		description: "The back of the upper arm, responsible for elbow extension",
	},
	{
		name: "Quadriceps",
		description: "The front thigh muscles, responsible for leg extension",
	},
	{
		name: "Hamstrings",
		description: "The back thigh muscles, responsible for leg flexion",
	},
	{
		name: "Glutes",
		description: "The buttocks muscles, responsible for hip extension",
	},
	{
		name: "Core",
		description:
			"The abdominal and lower back muscles that stabilize the spine",
	},
];

// Define exercise-equipment relationships
export const exerciseEquipmentRelations: {
	exerciseName: string;
	equipmentNames: string[];
}[] = [
	{
		exerciseName: "Push-ups",
		equipmentNames: ["Yoga Mat"],
	},
	{
		exerciseName: "Pull-ups",
		equipmentNames: ["Pull-up Bar"],
	},
	{
		exerciseName: "Yoga Flow",
		equipmentNames: ["Yoga Mat"],
	},
];

// Define exercise-muscle relationships
export const exerciseMuscleRelations: {
	exerciseName: string;
	muscles: { name: string; role: "Primary" | "Secondary" }[];
}[] = [
	{
		exerciseName: "Push-ups",
		muscles: [
			{ name: "Chest (Pectoralis)", role: "Primary" },
			{ name: "Shoulders (Deltoids)", role: "Primary" },
			{ name: "Triceps", role: "Primary" },
			{ name: "Core", role: "Secondary" },
		],
	},
	{
		exerciseName: "Pull-ups",
		muscles: [
			{ name: "Back (Latissimus Dorsi)", role: "Primary" },
			{ name: "Biceps", role: "Primary" },
			{ name: "Shoulders (Deltoids)", role: "Secondary" },
			{ name: "Core", role: "Secondary" },
		],
	},
	{
		exerciseName: "Squats",
		muscles: [
			{ name: "Quadriceps", role: "Primary" },
			{ name: "Hamstrings", role: "Primary" },
			{ name: "Glutes", role: "Primary" },
			{ name: "Core", role: "Secondary" },
		],
	},
];
