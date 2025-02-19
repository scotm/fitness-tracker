"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
	type Control,
	type FieldPath,
	type FieldValues,
	useController,
	useForm,
} from "react-hook-form";
import { z } from "zod";
import { createExercise } from "~/app/dashboard/exercise/new/action";
import { type Equipment, exerciseInsertSchema, type Muscle } from "~/types";
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

const capitalize = (s: string) => {
	if (!s || s.length === 0 || s[0] === undefined) return "";
	return s[0].toUpperCase() + s.slice(1);
};

function Checkboxes<
	T extends { id: string; name: string },
	U extends FieldValues,
>({
	options,
	control,
	name,
}: {
	options: T[];
	control: Control<U>;
	name: FieldPath<U>;
}) {
	const fieldname = capitalize(name);
	const { field } = useController({
		control,
		name,
	});

	if (!Array.isArray(field.value)) {
		throw new Error("Value must be an array");
	}

	const [value, setValue] = useState<string[]>(field.value);

	return (
		<div className="flex flex-col gap-2 rounded-md border-2 border-gray-300 p-2 dark:border-gray-600">
			<div>
				<h4 className="font-bold text-lg">{fieldname}</h4>
			</div>
			<div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
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
							className="mr-2"
						/>
						<label htmlFor={option.id}>{option.name}</label>
					</div>
				))}
			</div>
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
