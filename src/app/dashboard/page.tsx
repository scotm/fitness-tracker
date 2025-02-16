// import ExercisesSection from "@/components/ExercisesSection";
// import { getCurrentUser } from "@/lib/auth/session";
import { History, Plus, Timer, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export const metadata: Metadata = {
	title: "Dashboard | Fitness Tracker",
	description: "Your fitness journey at a glance",
};

export default async function DashboardPage() {
	const session = await auth();

	if (!session) {
		redirect("/api/auth/signin");
	}

	const user = session?.user;

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
		<main className="space-y-6">
			<header>
				<h1 className="text-2xl font-bold tracking-tight">
					Welcome back, {user?.name || "Athlete"}
				</h1>
				<p className="text-gray-500">
					Here&apos;s what&apos;s happening with your fitness journey.
				</p>
			</header>

			{/* Quick Stats */}
			<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<div className="bg-white overflow-hidden rounded-lg shadow">
					<div className="p-5">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<Trophy className="h-6 w-6 text-yellow-400" />
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-gray-500 truncate">
										Personal Records
									</dt>
									<dd className="text-lg font-medium text-gray-900">12</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white overflow-hidden rounded-lg shadow">
					<div className="p-5">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<History className="h-6 w-6 text-blue-400" />
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-gray-500 truncate">
										Workouts Completed
									</dt>
									<dd className="text-lg font-medium text-gray-900">48</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white overflow-hidden rounded-lg shadow">
					<div className="p-5">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<Timer className="h-6 w-6 text-green-400" />
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-gray-500 truncate">
										Total Time
									</dt>
									<dd className="text-lg font-medium text-gray-900">72h</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-white overflow-hidden rounded-lg shadow">
					<div className="p-5">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<Plus className="h-6 w-6 text-purple-400" />
							</div>
							<div className="ml-5 w-0 flex-1">
								<dl>
									<dt className="text-sm font-medium text-gray-500 truncate">
										Active Streak
									</dt>
									<dd className="text-lg font-medium text-gray-900">5 days</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Quick Actions */}
			<section>
				<h2 className="text-lg font-medium mb-4">Quick Actions</h2>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{quickActions.map((action) => (
						<Link
							key={action.name}
							href={action.href}
							className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
						>
							<div>
								<span
									className={`inline-flex p-3 rounded-lg ${action.color} text-white`}
								>
									<action.icon className="h-6 w-6" aria-hidden="true" />
								</span>
							</div>
							<div className="mt-4">
								<h3 className="text-lg font-medium">{action.name}</h3>
								<p className="mt-2 text-sm text-gray-500">
									{action.description}
								</p>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* Exercise Library */}
			{/* <section>
				<ExercisesSection />
			</section> */}

			{/* Recent Workouts */}
			<section>
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-medium">Recent Workouts</h2>
					<Link
						href="/dashboard/workouts"
						className="text-sm font-medium text-blue-600 hover:text-blue-500"
					>
						View all
					</Link>
				</div>
				<div className="bg-white shadow rounded-lg">
					<div className="p-6 text-center text-gray-500">
						No recent workouts. Start your fitness journey today!
					</div>
				</div>
			</section>
		</main>
	);
}
