"use client";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { createExercise } from "~/app/dashboard/exercise/new/action";
import { type Equipment, exerciseInsertSchema, type Muscle } from "~/types";
import { Checkboxes } from "../forms/Checkboxes";

const exerciseInsertSchemaWithEquipment = exerciseInsertSchema.extend({
	equipment: z.array(z.string()),
	muscles: z.array(z.string()),
});

type FormData = z.infer<typeof exerciseInsertSchemaWithEquipment>;

// infer these from the exercise schema
const difficultyOptions = exerciseInsertSchema.shape.difficulty.options;
const categoryOptions = exerciseInsertSchema.shape.category.options;

export default function NewExerciseForm({
	equipmentAvailable,
	musclesAvailable,
}: { equipmentAvailable: Equipment[]; musclesAvailable: Muscle[] }) {
	const utils = api.useUtils();
	const router = useRouter();
	const createExercise = api.exercise.create.useMutation({
		onSuccess: async (exerciseId) => {
			await utils.exercise.invalidate();
			toast.success("Exercise created successfully");

			// TODO: Redirect to the exercise details page
			router.push(`/dashboard/exercise/${exerciseId}`);
		},
		onError: (error) => {
			console.error(error);
			toast.error("Error creating exercise");
		},
	});

	const form = useForm<FormData>({
		resolver: zodResolver(exerciseInsertSchemaWithEquipment),
		defaultValues: {
			name: "",
			description: "",
			how_to_perform: "",
			difficulty: "Beginner",
			category: "Strength",
			equipment: [],
			muscles: [],
			// image_url: "",
		},
	});
	return (
		<form
			onSubmit={form.handleSubmit(async (data) => {
				await createExercise.mutateAsync(data);
				form.reset();
			})}
			className="flex flex-col gap-4"
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="name" className="font-bold text-lg">
					Exercise Name
				</label>
				<input
					className="rounded-md border-2 border-gray-300 p-2"
					{...form.register("name")}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="description" className="font-bold text-lg">
					Description
				</label>
				<input
					className="rounded-md border-2 border-gray-300 p-2"
					{...form.register("description")}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="how_to_perform" className="font-bold text-lg">
					How to perform
				</label>
				<textarea
					className="min-h-48 rounded-md border-2 border-gray-300 p-2"
					{...form.register("how_to_perform")}
				/>
			</div>
			<div className="grid grid-cols-4 gap-2">
				<label htmlFor="difficulty" className="font-bold text-lg">
					Difficulty
				</label>
				<select {...form.register("difficulty")}>
					{difficultyOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				<label htmlFor="category" className="font-bold text-lg">
					Category
				</label>
				<select {...form.register("category")}>
					{categoryOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
			<Checkboxes
				groupName="Equipment"
				options={equipmentAvailable}
				control={form.control}
				name="equipment"
			/>
			<Checkboxes
				groupName="Muscles"
				options={musclesAvailable}
				control={form.control}
				name="muscles"
			/>
			<button
				className="rounded-md bg-blue-500 p-2 text-white"
				type="submit"
				disabled={createExercise.isPending}
			>
				{createExercise.isPending ? "Creating..." : "Create"}
			</button>
		</form>
	);
}
