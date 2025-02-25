"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ExerciseSearch from "~/components/WorkoutPlanner/ExerciseSearch";
import WorkoutBuilder from "~/components/WorkoutPlanner/WorkoutBuilder";
import WorkoutTemplates from "~/components/WorkoutPlanner/WorkoutTemplates";
import RestTimer from "~/components/WorkoutPlanner/RestTimer";
import { Button } from "~/components/ui/button";
import { PlusCircle, Save } from "lucide-react";

// Define interfaces for our components
export interface Exercise {
	id: string;
	name: string;
	category: string;
	difficulty: string;
	targetMuscles?: string;
	equipment?: string[];
	description: string;
}

export interface WorkoutExercise extends Exercise {
	order: number;
	sets: WorkoutSet[];
	notes?: string;
}

export interface WorkoutSet {
	id: string;
	setNumber: number;
	targetReps?: number;
	targetWeight?: number;
	targetDuration?: number;
	isComplete?: boolean;
}

export interface WorkoutTemplate {
	id: string;
	name: string;
	description?: string;
	exercises: WorkoutExercise[];
}

export default function WorkoutPlannerContainer() {
	const [selectedWorkout, setSelectedWorkout] =
		useState<WorkoutTemplate | null>(null);
	const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
		[],
	);

	// Function to add an exercise to the workout
	const addExerciseToWorkout = (exercise: Exercise) => {
		const newExercise: WorkoutExercise = {
			...exercise,
			order: workoutExercises.length,
			sets: [
				{
					id: crypto.randomUUID(),
					setNumber: 1,
					targetReps: 10,
					targetWeight: 0,
				},
			],
		};

		setWorkoutExercises([...workoutExercises, newExercise]);
	};

	// Function to reorder exercises using drag and drop
	const reorderExercises = (sourceIndex: number, destinationIndex: number) => {
		const reorderedExercises = [...workoutExercises];
		const [removed] = reorderedExercises.splice(sourceIndex, 1);
		if (!removed) return;

		reorderedExercises.splice(destinationIndex, 0, removed);

		// Update order property
		const updatedExercises = reorderedExercises.map((exercise, index) => ({
			...exercise,
			order: index,
		}));

		setWorkoutExercises(updatedExercises);
	};

	// Function to remove an exercise from the workout
	const removeExercise = (exerciseId: string) => {
		const filteredExercises = workoutExercises
			.filter((ex) => ex.id !== exerciseId)
			.map((exercise, index) => ({
				...exercise,
				order: index,
			}));

		setWorkoutExercises(filteredExercises);
	};

	// Function to update sets for an exercise
	const updateExerciseSets = (exerciseId: string, sets: WorkoutSet[]) => {
		const updatedExercises = workoutExercises.map((exercise) => {
			if (exercise.id === exerciseId) {
				return {
					...exercise,
					sets,
				};
			}
			return exercise;
		});

		setWorkoutExercises(updatedExercises);
	};

	// Function to update notes for an exercise
	const updateExerciseNotes = (exerciseId: string, notes: string) => {
		const updatedExercises = workoutExercises.map((exercise) => {
			if (exercise.id === exerciseId) {
				return {
					...exercise,
					notes,
				};
			}
			return exercise;
		});

		setWorkoutExercises(updatedExercises);
	};

	// Function to save current workout as a template
	const saveAsTemplate = () => {
		// This would typically involve an API call to save the template
		console.log("Saving workout as template:", {
			exercises: workoutExercises,
		});

		// Implementation will depend on your API structure
	};

	// Function to load a template
	const loadTemplate = (template: WorkoutTemplate) => {
		setSelectedWorkout(template);
		setWorkoutExercises(template.exercises);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<Tabs defaultValue="builder" className="w-full">
						<TabsList className="mb-4">
							<TabsTrigger value="builder">Workout Builder</TabsTrigger>
							<TabsTrigger value="templates">Templates</TabsTrigger>
						</TabsList>

						<TabsContent value="builder" className="space-y-4">
							<div className="flex justify-between items-center">
								<h2 className="text-xl font-semibold">
									{selectedWorkout ? selectedWorkout.name : "New Workout"}
								</h2>
								<div className="flex gap-2">
									<Button variant="outline" size="sm" onClick={saveAsTemplate}>
										<Save className="h-4 w-4 mr-2" />
										Save as Template
									</Button>
								</div>
							</div>

							<WorkoutBuilder
								exercises={workoutExercises}
								onReorder={reorderExercises}
								onRemove={removeExercise}
								onUpdateSets={updateExerciseSets}
								onUpdateNotes={updateExerciseNotes}
							/>
						</TabsContent>

						<TabsContent value="templates">
							<WorkoutTemplates onSelectTemplate={loadTemplate} />
						</TabsContent>
					</Tabs>
				</div>

				<div className="space-y-6">
					<ExerciseSearch onAddExercise={addExerciseToWorkout} />
					<RestTimer />
				</div>
			</div>
		</DndProvider>
	);
}
