import { Metadata } from "next";
import WorkoutPlannerContainer from "@/components/WorkoutPlanner/WorkoutPlannerContainer";

export const metadata: Metadata = {
	title: "Workout Planner",
	description: "Create and customize your workout plans",
};

export default function WorkoutPlannerPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<h1 className="text-3xl font-bold">Workout Planner</h1>
				<p className="text-muted-foreground">
					Create, customize, and track your workout routines
				</p>
			</div>

			<WorkoutPlannerContainer />
		</div>
	);
}
