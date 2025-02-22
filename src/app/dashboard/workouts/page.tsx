import type { Metadata } from "next";
import ExerciseLibrary from "~/components/Exercise/ExerciseLibrary";
import MotivationalTips from "~/components/MotivationalTips";
import ProgressTracker from "~/components/ProgressTracker";

export const metadata: Metadata = {
	title: "Workouts | Fitness Tracker",
	description: "Customizable workout plans and progress tracking",
};

export default function WorkoutsPage() {
	return (
		<main className="mx-auto max-w-7xl space-y-6">
			<header>
				<h1 className="font-bold text-2xl tracking-tight dark:text-white">
					Workouts
				</h1>
				<p className="text-gray-500 dark:text-gray-400">
					Customize your workout plans and track your progress.
				</p>
			</header>

			{/* Exercise Library */}
			<ExerciseLibrary />

			{/* Progress Tracker */}
			<ProgressTracker />

			{/* Motivational Tips */}
			<MotivationalTips />
		</main>
	);
}
