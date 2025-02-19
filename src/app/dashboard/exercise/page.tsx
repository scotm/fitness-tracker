import React from "react";
import { api } from "~/trpc/server";
import { Badge } from "~/components/ui/badge";

export default async function ExerciseListPage() {
	const exercises = await api.exercise.getAll();

	if (!exercises) {
		return (
			<div className="flex h-[50vh] items-center justify-center">
				<p className="text-muted-foreground">No exercises found</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="space-y-8">
				{exercises.map((exercise) => (
					<div key={exercise.id} className="space-y-4">
						<div className="flex items-center justify-between">
							<h1 className="font-bold text-4xl tracking-tight">
								{exercise.name}
							</h1>
							<div className="flex gap-2">{exercise.description}</div>
							<Badge variant="secondary" className="text-sm">
								{exercise.category}
							</Badge>
						</div>
						<div className="flex gap-2">
							<Badge variant="outline" className="text-sm">
								{exercise.difficulty}
							</Badge>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
