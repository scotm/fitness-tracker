"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Dumbbell, Plus } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "~/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import type { Exercise } from "./WorkoutPlannerContainer";

interface ExerciseSearchProps {
	onAddExercise: (exercise: Exercise) => void;
}

// Mock data for now - will be replaced with API call
const MOCK_EXERCISES: Exercise[] = [
	{
		id: "ex1",
		name: "Barbell Bench Press",
		category: "Strength",
		description: "Compound exercise for chest development",
		difficulty: "Intermediate",
		targetMuscles: "Chest, Triceps, Shoulders",
		equipment: ["Barbell", "Bench"],
	},
	{
		id: "ex2",
		name: "Pull-ups",
		category: "Strength",
		description: "Upper body compound movement",
		difficulty: "Intermediate",
		targetMuscles: "Back, Biceps",
		equipment: ["Pull-up Bar"],
	},
	{
		id: "ex3",
		name: "Squats",
		category: "Strength",
		description: "Lower body compound exercise",
		difficulty: "Intermediate",
		targetMuscles: "Quadriceps, Hamstrings, Glutes",
		equipment: ["Barbell", "Squat Rack"],
	},
	{
		id: "ex4",
		name: "Plank",
		category: "Strength",
		description: "Core stability exercise",
		difficulty: "Beginner",
		targetMuscles: "Core, Shoulders",
		equipment: [],
	},
	{
		id: "ex5",
		name: "Bicycle Crunches",
		category: "Strength",
		description: "Dynamic core exercise",
		difficulty: "Beginner",
		targetMuscles: "Abs, Obliques",
		equipment: [],
	},
];

export default function ExerciseSearch({ onAddExercise }: ExerciseSearchProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
	const [filteredExercises, setFilteredExercises] =
		useState<Exercise[]>(MOCK_EXERCISES);

	// Filter exercises based on search term and filters
	useEffect(() => {
		const filtered = MOCK_EXERCISES.filter((exercise) => {
			const matchesSearch =
				exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				exercise.targetMuscles
					?.toLowerCase()
					.includes(searchTerm.toLowerCase());

			const matchesCategory = selectedCategory
				? exercise.category === selectedCategory
				: true;
			const matchesDifficulty = selectedDifficulty
				? exercise.difficulty === selectedDifficulty
				: true;

			return matchesSearch && matchesCategory && matchesDifficulty;
		});

		setFilteredExercises(filtered);
	}, [searchTerm, selectedCategory, selectedDifficulty]);

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="flex items-center space-x-2">
					<Search className="h-5 w-5" />
					<span>Exercise Library</span>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center space-x-2">
					<Input
						type="text"
						placeholder="Search exercises..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="flex-1"
					/>
					<Button variant="outline" size="icon">
						<Filter className="h-4 w-4" />
					</Button>
				</div>

				<div className="grid grid-cols-2 gap-2">
					<Select value={selectedCategory} onValueChange={setSelectedCategory}>
						<SelectTrigger>
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="">All Categories</SelectItem>
							<SelectItem value="Strength">Strength</SelectItem>
							<SelectItem value="Cardio">Cardio</SelectItem>
							<SelectItem value="Flexibility">Flexibility</SelectItem>
							<SelectItem value="Balance">Balance</SelectItem>
							<SelectItem value="Sport">Sport</SelectItem>
						</SelectContent>
					</Select>

					<Select
						value={selectedDifficulty}
						onValueChange={setSelectedDifficulty}
					>
						<SelectTrigger>
							<SelectValue placeholder="Difficulty" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="">All Difficulties</SelectItem>
							<SelectItem value="Beginner">Beginner</SelectItem>
							<SelectItem value="Intermediate">Intermediate</SelectItem>
							<SelectItem value="Advanced">Advanced</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
					{filteredExercises.length > 0 ? (
						filteredExercises.map((exercise) => (
							<div
								key={exercise.id}
								className="flex justify-between items-start border rounded-lg p-3"
							>
								<div>
									<div className="font-medium flex items-center">
										<Dumbbell className="h-4 w-4 mr-2 text-muted-foreground" />
										{exercise.name}
									</div>
									<div className="text-sm text-muted-foreground mt-1">
										{exercise.description}
									</div>
									<div className="flex flex-wrap gap-1 mt-2">
										<Badge variant="outline">{exercise.difficulty}</Badge>
										<Badge variant="outline">{exercise.category}</Badge>
									</div>
								</div>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => onAddExercise(exercise)}
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
						))
					) : (
						<div className="text-center py-4 text-muted-foreground">
							No exercises found.
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
