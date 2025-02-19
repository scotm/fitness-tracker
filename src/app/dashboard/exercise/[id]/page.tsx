import React from "react";
import { api } from "~/trpc/server";
import { Badge } from "~/components/ui/badge";

export default async function ExercisePage({
	params,
}: { params: { id: string } }) {
	const { id } = params;
	const exercise = await api.exercise.getById({ id });

	if (!exercise) {
		return (
			<div className="flex h-[50vh] items-center justify-center">
				<p className="text-muted-foreground">Exercise not found</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="space-y-8">
				{/* Header Section */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h1 className="font-bold text-4xl tracking-tight">
							{exercise.name}
						</h1>
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

				{/* Description Section */}
				<div className="rounded-lg border bg-card p-6 shadow-sm">
					<h2 className="mb-4 font-semibold text-xl">Description</h2>
					<p className="text-muted-foreground">{exercise.description}</p>
				</div>

				{/* How to Perform Section */}
				<div className="rounded-lg border bg-card p-6 shadow-sm">
					<h2 className="mb-4 font-semibold text-xl">How to Perform</h2>
					<div className="prose prose-sm max-w-none text-muted-foreground">
						{exercise.how_to_perform.split("\n").map((step, index) => (
							<p key={index} className="mb-2">
								{step}
							</p>
						))}
					</div>
				</div>

				{/* Equipment and Muscles Section */}
				<div className="grid gap-6 md:grid-cols-2">
					{/* Equipment */}
					<div className="rounded-lg border bg-card p-6 shadow-sm">
						<h2 className="mb-4 font-semibold text-xl">Required Equipment</h2>
						<div className="flex flex-wrap gap-2">
							{exercise.equipment.map((eq) => (
								<Badge key={eq.id} variant="secondary">
									{eq.equipmentId}
								</Badge>
							))}
						</div>
					</div>

					{/* Target Muscles */}
					<div className="rounded-lg border bg-card p-6 shadow-sm">
						<h2 className="mb-4 font-semibold text-xl">Target Muscles</h2>
						<div className="flex flex-wrap gap-2">
							{exercise.muscles.map((muscle) => (
								<Badge key={muscle.id} variant="secondary">
									{muscle.muscleId}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
