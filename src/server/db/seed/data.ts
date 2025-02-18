import type { ExerciseInsert, EquipmentInsert, MuscleInsert } from "~/types";

export const exerciseData: Omit<ExerciseInsert, "id">[] = [
	{
		name: "Push-ups",
		category: "Strength",
		description:
			"A classic bodyweight exercise that targets the chest, shoulders, and triceps",
		how_to_perform:
			"1. Start in a plank position with your hands slightly wider than shoulder-width apart.\n2. Lower your body by bending your elbows, creating a 90-degree angle at your elbows.\n3. Push through your palms to straighten your elbows and return to the starting position.\n4. Repeat for the desired number of reps.",
		difficulty: "Beginner",
	},
	{
		name: "Pull-ups",
		category: "Strength",
		description:
			"An upper body exercise that primarily targets the back and biceps",
		how_to_perform:
			"1. Hang from a pull-up bar with your hands slightly wider than shoulder-width apart.\n2. Pull yourself up until your chin is over the bar.\n3. Lower yourself back down to the starting position.\n4. Repeat for the desired number of reps.",
		difficulty: "Intermediate",
	},
	{
		name: "Squats",
		category: "Strength",
		description:
			"A lower body compound exercise that targets the quadriceps, hamstrings, and glutes",
		how_to_perform:
			"1. Stand with your feet shoulder-width apart and your toes slightly turned out.\n2. Lower your body by bending your knees and pushing your hips back, as if sitting into a chair.\n3. Keep your back straight and your core engaged.\n4. Push through your heels to return to the starting position.\n5. Repeat for the desired number of reps.",
		difficulty: "Beginner",
	},
	{
		name: "Running",
		category: "Cardio",
		description:
			"A fundamental cardio exercise that improves endurance and cardiovascular health",
		how_to_perform:
			"1. Start by standing with your feet shoulder-width apart and your toes slightly turned out.\n2. Push through your heels to return to the starting position.\n3. Repeat for the desired number of reps.",
		difficulty: "Beginner",
	},
	{
		name: "Yoga Flow",
		category: "Flexibility",
		description:
			"A series of poses that improve flexibility, balance, and mind-body connection",
		how_to_perform:
			"1. Start by standing with your feet shoulder-width apart and your toes slightly turned out.\n2. Push through your heels to return to the starting position.\n3. Repeat for the desired number of reps.",
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
