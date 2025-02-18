import NewExerciseForm from "~/components/Exercise/NewExerciseForm";
import { HydrateClient, api } from "~/trpc/server";

export default async function NewExercisePage() {
	const equipmentAvailable = await api.equipment.getAll();
	const musclesAvailable = await api.muscle.getAll();

	return (
		<HydrateClient>
			<main className="mx-auto max-w-7xl space-y-6">
				<div className="flex flex-col gap-4">
					<h1 className="font-bold text-2xl">New Exercise</h1>
					<NewExerciseForm
						equipmentAvailable={equipmentAvailable}
						musclesAvailable={musclesAvailable}
					/>
				</div>
			</main>
		</HydrateClient>
	);
}
