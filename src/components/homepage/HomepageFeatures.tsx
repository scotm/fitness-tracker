import type React from "react";
import Image, { type StaticImageData } from "next/image";
import { Calendar, Dumbbell, LineChart, Timer, Trophy } from "lucide-react";

import equipmentImage from "~/images/fitness-594143_640.jpg";
import workoutImage from "~/images/woman-2260736_640.jpg";
import progressImage from "~/images/control-2721901_640.jpg";
import analyticsImage from "~/images/analytics-925379_640.jpg";
import restTimerImage from "~/images/casio-8392121_640.jpg";
import personalRecordsImage from "~/images/hands-1851218_640.jpg";

type Feature = {
	name: string;
	description: string;
	image_url: StaticImageData;
	icon: React.ElementType;
};

export const HomepageFeatures = () => {
	const features: Feature[] = [
		{
			name: "Exercise Library",
			description:
				"Access a comprehensive database of exercises with detailed instructions and form guides.",
			image_url: equipmentImage,
			icon: Dumbbell,
		},
		{
			name: "Workout Builder",
			description:
				"Get and adjust a personalized fitness plan tailored to your goals and preferences.",
			image_url: workoutImage,
			icon: Dumbbell,
		},
		{
			name: "Workout Tracking",
			description:
				"Log your workouts, track sets, reps, and weights with an intuitive interface.",
			image_url: progressImage,
			icon: Calendar,
		},
		{
			name: "Progress Analytics",
			description:
				"Visualize your progress with detailed charts and performance metrics.",
			image_url: analyticsImage,
			icon: LineChart,
		},
		{
			name: "Rest Timer",
			description:
				"Built-in rest timer to optimize your workout intervals and recovery.",
			image_url: restTimerImage,
			icon: Timer,
		},
		{
			name: "Personal Records",
			description:
				"Track and celebrate your personal bests across all exercises.",
			image_url: personalRecordsImage,
			icon: Trophy,
		},
	];

	return (
		<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
			<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
				{features.map((feature) => (
					<div key={feature.name} className="flex flex-col">
						<dt className="flex items-center gap-x-3 font-semibold text-base text-gray-900 leading-7 dark:text-white">
							<feature.icon
								className="h-5 w-5 flex-none text-blue-600"
								aria-hidden="true"
							/>
							{feature.name}
						</dt>
						<dd className="mt-4 flex flex-auto flex-col gap-y-4 text-base text-gray-600 leading-7 dark:text-gray-400">
							<p className="flex-auto">{feature.description}</p>
							<Image
								width={384}
								height={216}
								src={feature.image_url}
								alt={feature.name}
								className="rounded-md shadow-lg"
							/>
						</dd>
					</div>
				))}
			</dl>
		</div>
	);
};
