"use client";

import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Plus, ArrowRight, Calendar, Clock, Dumbbell } from "lucide-react";
import type { WorkoutTemplate } from "./WorkoutPlannerContainer";

interface WorkoutTemplatesProps {
	onSelectTemplate: (template: WorkoutTemplate) => void;
}

// Mock data for templates
const MOCK_TEMPLATES: WorkoutTemplate[] = [
	{
		id: "template1",
		name: "Full Body Strength",
		description:
			"A comprehensive full body workout targeting all major muscle groups",
		exercises: [
			{
				id: "ex1",
				name: "Barbell Bench Press",
				category: "Strength",
				description: "Compound exercise for chest development",
				difficulty: "Intermediate",
				order: 0,
				sets: [
					{ id: "set1", setNumber: 1, targetReps: 10, targetWeight: 135 },
					{ id: "set2", setNumber: 2, targetReps: 8, targetWeight: 155 },
					{ id: "set3", setNumber: 3, targetReps: 6, targetWeight: 175 },
				],
				muscles: ["chest", "triceps", "deltoids", "pectorals"],
				equipment: ["barbell"],
				how_to_perform:
					"Lie on a bench with a barbell in your hands. Lower the barbell to your chest, then push it back up to the starting position.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "ex3",
				name: "Squats",
				category: "Strength",
				description: "Lower body compound exercise",
				difficulty: "Intermediate",
				order: 1,
				sets: [
					{ id: "set4", setNumber: 1, targetReps: 10, targetWeight: 185 },
					{ id: "set5", setNumber: 2, targetReps: 8, targetWeight: 205 },
					{ id: "set6", setNumber: 3, targetReps: 6, targetWeight: 225 },
				],
				muscles: ["quadriceps", "hamstrings", "glutes", "adductors"],
				equipment: ["barbell"],
				how_to_perform:
					"Stand with feet shoulder-width apart. Lower your body by bending your knees and hips, then push through your heels to return to the starting position.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
	},
	{
		id: "template2",
		name: "Upper Body Focus",
		description: "Targets chest, back, shoulders, and arms",
		exercises: [
			{
				id: "ex1",
				name: "Barbell Bench Press",
				category: "Strength",
				description: "Compound exercise for chest development",
				difficulty: "Intermediate",
				order: 0,
				sets: [
					{ id: "set1", setNumber: 1, targetReps: 10, targetWeight: 135 },
					{ id: "set2", setNumber: 2, targetReps: 8, targetWeight: 155 },
					{ id: "set3", setNumber: 3, targetReps: 6, targetWeight: 175 },
				],
				muscles: ["chest", "triceps", "deltoids", "pectorals"],
				equipment: ["barbell"],
				how_to_perform:
					"Lie on a bench with a barbell in your hands. Lower the barbell to your chest, then push it back up to the starting position.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "ex2",
				name: "Pull-ups",
				category: "Strength",
				description: "Upper body compound movement",
				difficulty: "Intermediate",
				order: 1,
				sets: [
					{ id: "set4", setNumber: 1, targetReps: 8, targetWeight: 0 },
					{ id: "set5", setNumber: 2, targetReps: 8, targetWeight: 0 },
					{ id: "set6", setNumber: 3, targetReps: 8, targetWeight: 0 },
				],
				muscles: ["chest", "triceps", "deltoids", "pectorals"],
				equipment: ["barbell"],
				how_to_perform:
					"Grab a pull-up bar with an overhand grip. Pull yourself up until your chin is over the bar, then lower yourself back down.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
	},
];

export default function WorkoutTemplates({
	onSelectTemplate,
}: WorkoutTemplatesProps) {
	const [templates, setTemplates] = useState<WorkoutTemplate[]>(MOCK_TEMPLATES);
	const [searchTerm, setSearchTerm] = useState("");
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [newTemplateName, setNewTemplateName] = useState("");
	const [newTemplateDescription, setNewTemplateDescription] = useState("");

	// Filter templates based on search
	const filteredTemplates = templates.filter(
		(template) =>
			template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			template.description?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// Create a new template (currently just mocks the creation)
	const handleCreateTemplate = () => {
		const newTemplate: WorkoutTemplate = {
			id: `template${templates.length + 1}`,
			name: newTemplateName,
			description: newTemplateDescription,
			exercises: [],
		};

		setTemplates([...templates, newTemplate]);
		setNewTemplateName("");
		setNewTemplateDescription("");
		setCreateDialogOpen(false);
	};

	// Calculate exercise count for a template
	const getExerciseCount = (template: WorkoutTemplate) => {
		return template.exercises.length;
	};

	// Calculate total sets for a template
	const getTotalSets = (template: WorkoutTemplate) => {
		return template.exercises.reduce(
			(total, exercise) => total + exercise.sets.length,
			0,
		);
	};

	// Estimate workout duration (rough calculation)
	const getEstimatedDuration = (template: WorkoutTemplate) => {
		// Assume average of 2 minutes per set
		const totalSets = getTotalSets(template);
		return totalSets * 2;
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center space-x-2">
				<Input
					type="text"
					placeholder="Search templates..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-1"
				/>
				<Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="icon" className="shrink-0">
							<Plus className="h-4 w-4" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create New Template</DialogTitle>
							<DialogDescription>
								Create a new workout template that you can use and modify later.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="template-name">Template Name</Label>
								<Input
									id="template-name"
									placeholder="e.g., Full Body Workout"
									value={newTemplateName}
									onChange={(e) => setNewTemplateName(e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="template-description">Description</Label>
								<Textarea
									id="template-description"
									placeholder="Describe this workout template..."
									value={newTemplateDescription}
									onChange={(e) => setNewTemplateDescription(e.target.value)}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setCreateDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button
								onClick={handleCreateTemplate}
								disabled={!newTemplateName}
							>
								Create Template
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<ScrollArea className="h-[500px] pr-4">
				<div className="space-y-3">
					{filteredTemplates.length > 0 ? (
						filteredTemplates.map((template) => (
							<Card key={template.id} className="overflow-hidden">
								<CardContent className="p-0">
									<div className="p-4">
										<h3 className="font-semibold text-lg">{template.name}</h3>
										{template.description && (
											<p className="text-sm text-muted-foreground mt-1">
												{template.description}
											</p>
										)}

										<div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
											<div className="flex items-center">
												<Dumbbell className="h-4 w-4 mr-1" />
												<span>{getExerciseCount(template)} exercises</span>
											</div>
											<div className="flex items-center">
												<Calendar className="h-4 w-4 mr-1" />
												<span>{getTotalSets(template)} sets</span>
											</div>
											<div className="flex items-center">
												<Clock className="h-4 w-4 mr-1" />
												<span>~{getEstimatedDuration(template)} mins</span>
											</div>
										</div>
									</div>

									<div className="border-t p-3 bg-muted/30 flex justify-end">
										<Button
											variant="default"
											size="sm"
											onClick={() => onSelectTemplate(template)}
										>
											Use Template
											<ArrowRight className="h-4 w-4 ml-2" />
										</Button>
									</div>
								</CardContent>
							</Card>
						))
					) : (
						<div className="text-center py-8 text-muted-foreground">
							{searchTerm
								? "No templates found matching your search."
								: "You haven't created any templates yet."}
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
}
