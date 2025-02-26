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
	// CardFooter,
} from "~/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";

type Exercise = inferProcedureOutput<AppRouter["exercise"]["getAll"]>[number];

interface ExerciseSearchProps {
	onAddExercise: (exercise: Exercise) => void;
}

export default function ExerciseSearch({ onAddExercise }: ExerciseSearchProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
	const [exercises] = api.exercise.getAll.useSuspenseQuery(undefined);
	const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(
		exercises ?? [],
	);
	const categories = [
		...new Set(exercises.map((exercise) => exercise.category)),
	].toSorted();
	const difficulties = [
		...new Set(exercises.map((exercise) => exercise.difficulty)),
	].toSorted();

	// Filter exercises based on search term and filters
	useEffect(() => {
		if (!exercises) return;
		const filtered = exercises.filter((exercise) => {
			const matchesSearch =
				exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				exercise.muscles.some((muscle) =>
					muscle.toLowerCase().includes(searchTerm.toLowerCase()),
				);

			const matchesCategory =
				selectedCategory === "all"
					? true
					: exercise.category === selectedCategory;
			const matchesDifficulty =
				selectedDifficulty === "all"
					? true
					: exercise.difficulty === selectedDifficulty;

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
							<SelectItem value="all">All Categories</SelectItem>
							{categories.map((category) => (
								<SelectItem key={category} value={category}>
									{category}
								</SelectItem>
							))}
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
							<SelectItem value="all">All Difficulties</SelectItem>
							{difficulties.map((difficulty) => (
								<SelectItem key={difficulty} value={difficulty}>
									{difficulty}
								</SelectItem>
							))}
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
