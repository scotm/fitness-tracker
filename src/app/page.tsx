import Link from "next/link";
import { redirect } from "next/navigation";
import {
	ArrowRight,
	Calendar,
	Dumbbell,
	LineChart,
	Timer,
	Trophy,
} from "lucide-react";
import Image from "next/image";
import heroImage from "~/images/conor-tutoring.webp";
// import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { HydrateClient, api } from "~/trpc/server";

export default async function Home() {
	const session = await auth();

	if (session) {
		redirect("/dashboard");
	}

	const features = [
		{
			name: "Exercise Library",
			description:
				"Access a comprehensive database of exercises with detailed instructions and form guides.",
			icon: Dumbbell,
		},
		{
			name: "Workout Tracking",
			description:
				"Log your workouts, track sets, reps, and weights with an intuitive interface.",
			icon: Calendar,
		},
		{
			name: "Progress Analytics",
			description:
				"Visualize your progress with detailed charts and performance metrics.",
			icon: LineChart,
		},
		{
			name: "Rest Timer",
			description:
				"Built-in rest timer to optimize your workout intervals and recovery.",
			icon: Timer,
		},
		{
			name: "Personal Records",
			description:
				"Track and celebrate your personal bests across all exercises.",
			icon: Trophy,
		},
	];

	return (
		<HydrateClient>
			<main className="bg-white">
				{/* Hero Section */}
				<div className="relative isolate overflow-hidden">
					<div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
						<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
							<h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Track Your Fitness Journey
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600">
								Take control of your fitness journey with our comprehensive
								workout tracking platform. Log workouts, track progress, and
								achieve your fitness goals.
							</p>
							<div className="mt-10 flex items-center gap-x-6">
								<Link
									href="/auth/register"
									className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
								>
									Get started
								</Link>
								<Link
									href="/auth/login"
									className="text-sm font-semibold leading-6 text-gray-900"
								>
									Log in{" "}
									<span aria-hidden="true">
										<ArrowRight />
									</span>
								</Link>
							</div>
						</div>
						<div className="hidden lg:block lg:ml-10 lg:flex-shrink-0">
							<Image
								src={heroImage}
								alt="Fitness hero"
								className="rounded-md shadow-lg"
								width={500}
								height={500}
							/>
						</div>
					</div>
				</div>

				{/* Features Section */}
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						<h2 className="text-base font-semibold leading-7 text-blue-600">
							Everything you need
						</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Powerful features for serious athletes
						</p>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Our comprehensive fitness tracking platform provides all the tools
							you need to track, analyze, and improve your workouts.
						</p>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
						<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
							{features.map((feature) => (
								<div key={feature.name} className="flex flex-col">
									<dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
										<feature.icon
											className="h-5 w-5 flex-none text-blue-600"
											aria-hidden="true"
										/>
										{feature.name}
									</dt>
									<dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
										<p className="flex-auto">{feature.description}</p>
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>

				{/* CTA Section */}
				<div className="mt-32 sm:mt-40">
					<div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:px-16">
						<h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
							Start your fitness journey today
						</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
							Join thousands of athletes who are already tracking their progress
							and achieving their fitness goals.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link
								href="/auth/register"
								className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
							>
								Get started
							</Link>
							<Link
								href="/auth/login"
								className="text-sm font-semibold leading-6 text-white"
							>
								Log in <span aria-hidden="true">→</span>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</HydrateClient>
	);
}
