"use client";

import { useState } from "react";
import {
	type Control,
	type FieldPath,
	type FieldValues,
	useController,
} from "react-hook-form";

const capitalize = (s: string) => {
	if (!s || s.length === 0 || s[0] === undefined) return "";
	return s[0].toUpperCase() + s.slice(1);
};

type CheckboxProps<
	T extends { id: string; name: string },
	U extends FieldValues,
> = {
	options: T[];
	control: Control<U>;
	name: FieldPath<U>;
	groupName?: string;
};

export const Checkboxes = <
	T extends { id: string; name: string },
	U extends FieldValues,
>(
	props: CheckboxProps<T, U>,
) => {
	const { groupName, options, control, name } = props;
	const fieldHeader = groupName ? capitalize(groupName) : capitalize(name);
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
				<h4 className="font-bold text-lg">{fieldHeader}</h4>
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
};
