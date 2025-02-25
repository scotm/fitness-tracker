"use client";

import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Grip, Trash2, Plus, Minus, Save, Edit, Clock } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import type { WorkoutExercise, WorkoutSet } from "./WorkoutPlannerContainer";

interface WorkoutBuilderProps {
	exercises: WorkoutExercise[];
	onReorder: (sourceIndex: number, destinationIndex: number) => void;
	onRemove: (exerciseId: string) => void;
	onUpdateSets: (exerciseId: string, sets: WorkoutSet[]) => void;
	onUpdateNotes: (exerciseId: string, notes: string) => void;
}

// Type for drag item
interface DragItem {
	index: number;
	id: string;
	type: string;
}

// Exercise item component with drag and drop
const ExerciseItem = ({
	exercise,
	index,
	onRemove,
	onUpdateSets,
	onUpdateNotes,
	onReorder,
}: {
	exercise: WorkoutExercise;
	index: number;
	onRemove: (id: string) => void;
	onUpdateSets: (id: string, sets: WorkoutSet[]) => void;
	onUpdateNotes: (id: string, notes: string) => void;
	onReorder: (sourceIndex: number, destinationIndex: number) => void;
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [notes, setNotes] = useState(exercise.notes || "");

	// Set up drag
	const [{ isDragging }, drag, dragPreview] = useDrag({
		type: "EXERCISE",
		item: { type: "EXERCISE", id: exercise.id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	// Set up drop
	const [, drop] = useDrop({
		accept: "EXERCISE",
		hover(item: DragItem, monitor) {
			if (!monitor.isOver({ shallow: true })) return;
			if (item.index === index) return;

			// Call reorder function from parent
			window.requestAnimationFrame(() => {
				// This is handled in the parent component
				onReorder(item.index, index);
				item.index = index;
			});
		},
	});

	// Add a new set
	const addSet = () => {
		const newSet: WorkoutSet = {
			id: crypto.randomUUID(),
			setNumber: exercise.sets.length + 1,
			targetReps: 10,
			targetWeight: 0,
		};

		onUpdateSets(exercise.id, [...exercise.sets, newSet]);
	};

	// Remove a set
	const removeSet = (setId: string) => {
		if (exercise.sets.length <= 1) return; // Keep at least one set

		const updatedSets = exercise.sets
			.filter((set) => set.id !== setId)
			.map((set, idx) => ({
				...set,
				setNumber: idx + 1,
			}));

		onUpdateSets(exercise.id, updatedSets);
	};

	// Update a set's values
	const updateSetValue = (
		setId: string,
		field: keyof WorkoutSet,
		value: number,
	) => {
		const updatedSets = exercise.sets.map((set) => {
			if (set.id === setId) {
				return {
					...set,
					[field]: value,
				};
			}
			return set;
		});

		onUpdateSets(exercise.id, updatedSets);
	};

	// Save notes
	const saveNotes = () => {
		onUpdateNotes(exercise.id, notes);
		setIsEditing(false);
	};

	return (
		<div
			//@ts-ignore
			ref={drop}
			className={`border rounded-lg p-4 bg-card ${isDragging ? "opacity-50" : ""}`}
			style={{ opacity: isDragging ? 0.5 : 1 }}
		>
			<div
				//@ts-ignore
				ref={dragPreview}
			>
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center">
						<div
							//@ts-ignore
							ref={drag}
							className="cursor-move mr-2"
						>
							<Grip className="h-4 w-4 text-muted-foreground" />
						</div>
						<div>
							<h3 className="font-medium">{exercise.name}</h3>
							<div className="text-sm text-muted-foreground">
								{exercise.description}
							</div>
						</div>
					</div>

					<Button
						variant="ghost"
						size="icon"
						onClick={() => onRemove(exercise.id)}
						className="text-destructive"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>

				<div className="flex flex-wrap gap-1 mb-4">
					<Badge variant="secondary">{exercise.category}</Badge>
					<Badge variant="outline">{exercise.difficulty}</Badge>
					{exercise.targetMuscles && (
						<Badge variant="outline" className="bg-primary/10">
							{exercise.targetMuscles}
						</Badge>
					)}
				</div>

				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="sets">
						<AccordionTrigger>Sets & Reps</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-[60px]">Set</TableHead>
											<TableHead>Reps</TableHead>
											<TableHead>Weight</TableHead>
											<TableHead className="w-[50px]"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{exercise.sets.map((set) => (
											<TableRow key={set.id}>
												<TableCell>{set.setNumber}</TableCell>
												<TableCell>
													<Input
														type="number"
														value={set.targetReps ?? 0}
														onChange={(e) =>
															updateSetValue(
																set.id,
																"targetReps",
																parseInt(e.target.value),
															)
														}
														className="h-8 w-16"
														min={0}
													/>
												</TableCell>
												<TableCell>
													<Input
														type="number"
														value={set.targetWeight ?? 0}
														onChange={(e) =>
															updateSetValue(
																set.id,
																"targetWeight",
																parseFloat(e.target.value),
															)
														}
														className="h-8 w-16"
														min={0}
														step={2.5}
													/>
												</TableCell>
												<TableCell>
													<Button
														variant="ghost"
														size="icon"
														onClick={() => removeSet(set.id)}
													>
														<Minus className="h-3 w-3" />
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>

								<Button
									variant="outline"
									size="sm"
									onClick={addSet}
									className="w-full"
								>
									<Plus className="h-4 w-4 mr-2" />
									Add Set
								</Button>
							</div>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="notes">
						<AccordionTrigger>Notes</AccordionTrigger>
						<AccordionContent>
							{isEditing ? (
								<div className="space-y-2">
									<Textarea
										value={notes}
										onChange={(e) => setNotes(e.target.value)}
										placeholder="Add notes for this exercise..."
										className="min-h-[100px]"
									/>
									<div className="flex justify-end space-x-2">
										<Button
											variant="outline"
											size="sm"
											onClick={() => setIsEditing(false)}
										>
											Cancel
										</Button>
										<Button variant="default" size="sm" onClick={saveNotes}>
											<Save className="h-4 w-4 mr-2" />
											Save
										</Button>
									</div>
								</div>
							) : (
								<div>
									<div className="text-sm mb-2">
										{notes ? notes : "No notes added yet."}
									</div>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setIsEditing(true)}
									>
										<Edit className="h-4 w-4 mr-2" />
										{notes ? "Edit Notes" : "Add Notes"}
									</Button>
								</div>
							)}
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="rest">
						<AccordionTrigger>Rest Timer</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<Label htmlFor="rest-time">Rest Between Sets</Label>
									<div className="flex items-center">
										<Input
											id="rest-time"
											type="number"
											className="w-16 h-8 mr-2"
											defaultValue={60}
											min={0}
										/>
										<span className="text-sm">seconds</span>
									</div>
								</div>
								<Button
									variant="outline"
									className="w-full"
									onClick={() => alert("Start timer feature")}
								>
									<Clock className="h-4 w-4 mr-2" />
									Start Timer
								</Button>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
};

export default function WorkoutBuilder({
	exercises,
	onReorder,
	onRemove,
	onUpdateSets,
	onUpdateNotes,
}: WorkoutBuilderProps) {
	// Function to handle reordering of exercises
	const handleReorder = (sourceIndex: number, destinationIndex: number) => {
		onReorder(sourceIndex, destinationIndex);
	};

	return (
		<div className="space-y-4">
			{exercises.length === 0 ? (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-8">
						<div className="text-center space-y-2">
							<h3 className="font-medium">No exercises added yet</h3>
							<p className="text-sm text-muted-foreground">
								Search and add exercises from the library
							</p>
						</div>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-3">
					{exercises.map((exercise, index) => (
						<ExerciseItem
							key={exercise.id}
							exercise={exercise}
							index={index}
							onRemove={onRemove}
							onUpdateSets={onUpdateSets}
							onUpdateNotes={onUpdateNotes}
							onReorder={handleReorder}
						/>
					))}
				</div>
			)}
		</div>
	);
}
