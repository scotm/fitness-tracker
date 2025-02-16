import type React from "react";
import Image from "next/image";
import {
	ArrowRight,
	Calendar,
	Dumbbell,
	LineChart,
	Timer,
	Trophy,
} from "lucide-react";

type Feature = {
	name: string;
	description: string;
	image_url: string;
	icon: React.ElementType;
};

export const HomepageFeatures = () => {
	const features: Feature[] = [
		{
			name: "Exercise Library",
			description:
				"Access a comprehensive database of exercises with detailed instructions and form guides.",
			image_url:
				"https://tailwindui.com/plus-assets/img/component-images/bento-01-speed.png",
			icon: Dumbbell,
		},
		{
			name: "Workout Builder",
			description:
				"Get and adjust a personalized fitness plan tailored to your goals and preferences.",
			image_url:
				"https://tailwindui.com/plus-assets/img/component-images/bento-01-speed.png",
			icon: Dumbbell,
		},
		{
			name: "Workout Tracking",
			description:
				"Log your workouts, track sets, reps, and weights with an intuitive interface.",
			image_url:
				"https://tailwindui.com/plus-assets/img/component-images/bento-01-speed.png",
			icon: Calendar,
		},
		{
			name: "Progress Analytics",
			description:
				"Visualize your progress with detailed charts and performance metrics.",
			image_url:
				"https://tailwindui.com/plus-assets/img/component-images/bento-01-speed.png",
			icon: LineChart,
		},
		{
			name: "Rest Timer",
			description:
				"Built-in rest timer to optimize your workout intervals and recovery.",
			image_url:
				"https://tailwindui.com/plus-assets/img/component-images/bento-01-speed.png",
			icon: Timer,
		},
		{
			name: "Personal Records",
			description:
				"Track and celebrate your personal bests across all exercises.",
			image_url:
				"https://tailwindui.com/plus-assets/img/component-images/bento-01-speed.png",
			icon: Trophy,
		},
	];

	return (
		<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
			<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
				{features.map((feature) => (
					<div key={feature.name} className="flex flex-col">
						<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
							<feature.icon
								className="h-5 w-5 flex-none text-blue-600"
								aria-hidden="true"
							/>
							{feature.name}
						</dt>
						<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
							<p className="flex-auto">{feature.description}</p>
						</dd>
						<Image
							width={500}
							height={500}
							src={feature.image_url}
							alt={feature.name}
							className="rounded-md shadow-lg"
						/>
					</div>
				))}
			</dl>
		</div>
	);
};
