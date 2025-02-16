import React from "react";
import Link from "next/link";
import { Trophy, History, Plus, Timer } from "lucide-react";

export const QuickActions = () => {
	const quickActions = [
		{
			name: "Start Workout",
			description: "Begin a new training session",
			href: "/dashboard/workouts/new",
			icon: Plus,
			color: "bg-blue-500",
		},
		{
			name: "View History",
			description: "See your past workouts",
			href: "/dashboard/workouts",
			icon: History,
			color: "bg-green-500",
		},
		{
			name: "Personal Records",
			description: "Track your achievements",
			href: "/dashboard/progress",
			icon: Trophy,
			color: "bg-purple-500",
		},
		{
			name: "Rest Timer",
			description: "Time your rest periods",
			href: "#",
			icon: Timer,
			color: "bg-orange-500",
		},
	];

	return (
		<section>
			<h2 className="mb-4 font-medium text-lg dark:text-white">
				Quick Actions
			</h2>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{quickActions.map((action) => (
					<Link
						key={action.name}
						href={action.href}
						className="group relative rounded-lg bg-white p-6 shadow-xs transition-shadow hover:shadow-md dark:bg-gray-800"
					>
						<div>
							<span
								className={`inline-flex rounded-lg p-3 ${action.color} text-white`}
							>
								<action.icon className="h-6 w-6" aria-hidden="true" />
							</span>
						</div>
						<div className="mt-4">
							<h3 className="font-medium text-lg dark:text-white">
								{action.name}
							</h3>
							<p className="mt-2 text-gray-500 text-sm dark:text-gray-400">
								{action.description}
							</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};
