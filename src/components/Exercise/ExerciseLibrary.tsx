import type React from "react";
import Link from "next/link";
import { api } from "~/trpc/server";

const ExerciseLibrary: React.FC = async () => {
	const exercises = await api.exercise.getAll();

	return (
		<section>
			<h2 className="font-bold text-xl tracking-tight dark:text-white">
				Exercise Library
			</h2>
			<p className="text-gray-500 dark:text-gray-400">
				Browse and select exercises for your workout plan.
			</p>
			<ul className="flex flex-wrap gap-2">
				{exercises.map((exercise) => (
					<li key={exercise.id}>
						<Link href={`/dashboard/exercise/${exercise.id}`}>
							{exercise.name}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default ExerciseLibrary;
