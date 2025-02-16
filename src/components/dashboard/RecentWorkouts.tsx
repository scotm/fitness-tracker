import Link from "next/link";
import React from "react";

export const RecentWorkouts = () => {
	return (
		<section>
			<div className="mb-4 flex items-center justify-between">
				<h2 className="font-medium text-lg dark:text-white">Recent Workouts</h2>
				<Link
					href="/dashboard/workouts"
					className="font-medium text-blue-600 text-sm hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
				>
					View all
				</Link>
			</div>
			<div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
				<div className="p-6 text-center text-gray-500 dark:text-gray-400">
					No recent workouts. Start your fitness journey today!
				</div>
			</div>
		</section>
	);
};
