"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
	type Control,
	type FieldPath,
	useController,
	useForm,
} from "react-hook-form";
import { z } from "zod";
import { createExercise } from "~/app/dashboard/exercise/new/action";
import { type Equipment, exerciseInsertSchema, Muscle } from "~/types";
// import type { ExtractKeysOfStringArray } from "~/types/utils";

const exerciseInsertSchemaWithEquipment = exerciseInsertSchema.extend({
	equipment: z.array(z.string()),
	muscles: z.array(z.string()),
});

type FormData = z.infer<typeof exerciseInsertSchemaWithEquipment>;

// type EquipmentKeyNames = ExtractKeysOfStringArray<FormData>;

// infer these from the exercise schema
const difficultyOptions = exerciseInsertSchema.shape.difficulty.options;
const categoryOptions = exerciseInsertSchema.shape.category.options;

function Checkboxes<T extends { id: string; name: string }>({
	options,
	control,
	name,
}: {
	options: T[];
	control: Control<FormData>;
	name: FieldPath<FormData>;
}) {
	const { field } = useController({
		control,
		name,
	});

	if (!Array.isArray(field.value)) {
		throw new Error("Value must be an array");
	}

	const [value, setValue] = useState(field.value);

	return (
		<div className="flex flex-col gap-2">
			{options.map((option, index) => (
				<div key={option.id}>
					<input
						onChange={(e) => {
							let valueCopy = [...value];

							if (e.target.checked) {
								valueCopy.push(option.id);
							} else {
								valueCopy = valueCopy.filter((id) => id !== option.id);
							}

							// send data to react hook form
							field.onChange(valueCopy);

							// update local state
							setValue(valueCopy);
						}}
						type="checkbox"
						name={`${name}.${index}`}
						checked={value.includes(option.id)}
						value={option.id}
					/>
					<label htmlFor={option.id}>{option.name}</label>
				</div>
			))}
		</div>
	);
}

export default function NewExerciseForm({
	equipmentAvailable,
	musclesAvailable,
}: { equipmentAvailable: Equipment[]; musclesAvailable: Muscle[] }) {
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
			onSubmit={form.handleSubmit(createExercise)}
			className="flex flex-col gap-4"
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="name">Name</label>
				<input
					className="rounded-md border-2 border-gray-300 p-2"
					{...form.register("name")}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="description">Description</label>
				<input
					className="rounded-md border-2 border-gray-300 p-2"
					{...form.register("description")}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="how_to_perform">How to perform</label>
				<textarea
					className="rounded-md border-2 border-gray-300 p-2"
					{...form.register("how_to_perform")}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="difficulty">Difficulty</label>
				<select {...form.register("difficulty")}>
					{difficultyOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="category">Category</label>
				<select {...form.register("category")}>
					{categoryOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
			<Checkboxes
				options={equipmentAvailable}
				control={form.control}
				name="equipment"
			/>
			<Checkboxes
				options={musclesAvailable}
				control={form.control}
				name="muscles"
			/>
			<button className="rounded-md bg-blue-500 p-2 text-white" type="submit">
				Create
			</button>
		</form>
	);
}
