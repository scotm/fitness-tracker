import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function CTASection() {
	return (
		<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
			<h1 className="mt-10 font-bold text-4xl text-gray-900 tracking-tight sm:text-6xl dark:text-white">
				Track Your Fitness Journey
			</h1>
			<p className="mt-6 text-gray-600 text-lg leading-8 dark:text-gray-400">
				Take control of your fitness journey with our comprehensive workout
				tracking platform. Log workouts, track progress, and achieve your
				fitness goals.
			</p>
			<div className="mt-10 flex items-center gap-x-8">
				<Link
					href="/auth/register"
					className="rounded-md bg-blue-600 px-3.5 py-2.5 font-semibold text-sm text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
				>
					Get started
				</Link>
				<Link
					href="/api/auth/signin"
					className="flex items-center gap-x-4 font-semibold text-gray-900 text-sm leading-6 dark:text-white"
				>
					Log in <ArrowRight className="h-4 w-4" />
				</Link>
			</div>
		</div>
	);
}
