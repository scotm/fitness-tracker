// import ExercisesSection from "@/components/ExercisesSection";
// import { getCurrentUser } from "@/lib/auth/session";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { QuickActions } from "~/components/dashboard/QuickActions";
import { QuickStats } from "~/components/dashboard/QuickStats";
import { RecentWorkouts } from "~/components/dashboard/RecentWorkouts";
import { Button } from "~/components/ui/button";
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

	const user = session.user;

	return (
		<main className="mx-auto max-w-7xl space-y-6">
			<header>
				<h1 className="font-bold text-2xl tracking-tight dark:text-white">
					Welcome back, {user.name}
				</h1>
				<p className="text-gray-500 dark:text-gray-400">
					Here's what's happening with your fitness journey.
				</p>
			</header>

			{/* Quick Stats */}
			<Link href="/dashboard/workouts">
				<button className="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white">
					Go to Workouts
				</button>
			</Link>
			<Link href="/dashboard/workouts">
				<Button>Go to Workouts</Button>
			</Link>
			<QuickStats />

			{/* Quick Actions */}
			<QuickActions />

			{/* Exercise Library */}
			{/* <section>
				<ExercisesSection />
			</section> */}

			{/* Recent Workouts */}
			<RecentWorkouts />
		</main>
	);
}
