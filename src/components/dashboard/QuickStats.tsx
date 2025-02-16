import { Trophy, Timer, Plus, History } from "lucide-react";
import React from "react";

export const QuickStats = () => {
	return (
		<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
				<div className="p-5">
					<div className="flex items-center">
						<div className="shrink-0">
							<Trophy className="h-6 w-6 text-yellow-400" />
						</div>
						<div className="ml-5 w-0 flex-1">
							<dl>
								<dt className="truncate font-medium text-gray-500 text-sm dark:text-gray-400">
									Personal Records
								</dt>
								<dd className="font-medium text-gray-900 text-lg dark:text-white">
									12
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>

			<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
				<div className="p-5">
					<div className="flex items-center">
						<div className="shrink-0">
							<History className="h-6 w-6 text-blue-400" />
						</div>
						<div className="ml-5 w-0 flex-1">
							<dl>
								<dt className="truncate font-medium text-gray-500 text-sm dark:text-gray-400">
									Workouts Completed
								</dt>
								<dd className="font-medium text-gray-900 text-lg dark:text-white">
									48
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>

			<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
				<div className="p-5">
					<div className="flex items-center">
						<div className="shrink-0">
							<Timer className="h-6 w-6 text-green-400" />
						</div>
						<div className="ml-5 w-0 flex-1">
							<dl>
								<dt className="truncate font-medium text-gray-500 text-sm dark:text-gray-400">
									Total Time
								</dt>
								<dd className="font-medium text-gray-900 text-lg dark:text-white">
									72h
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>

			<div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
				<div className="p-5">
					<div className="flex items-center">
						<div className="shrink-0">
							<Plus className="h-6 w-6 text-purple-400" />
						</div>
						<div className="ml-5 w-0 flex-1">
							<dl>
								<dt className="truncate font-medium text-gray-500 text-sm dark:text-gray-400">
									Active Streak
								</dt>
								<dd className="font-medium text-gray-900 text-lg dark:text-white">
									5 days
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
