import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import CTASection from "~/components/homepage/CTASection";
import { HomepageFeatures } from "~/components/homepage/HomepageFeatures";
import heroImage from "~/images/conor-tutoring.webp";
// import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { HydrateClient, api } from "~/trpc/server";

export default async function Home() {
	const session = await auth();

	if (session) {
		redirect("/dashboard");
	}

	return (
		<HydrateClient>
			<main className="bg-white dark:bg-gray-900">
				{/* Hero Section */}
				<div className="relative isolate overflow-hidden">
					<div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
						<CTASection />
						<div className="hidden lg:ml-10 lg:block lg:flex-shrink-0">
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
				<div className="mx-auto max-w-7xl border-gray-200 border-t px-6 lg:px-8 dark:border-gray-800">
					<div className="mx-auto max-w-2xl lg:text-center">
						<h2 className="font-semibold text-base text-blue-600 leading-7 dark:text-blue-400">
							Everything you need
						</h2>
						<p className="mt-2 font-bold text-3xl text-gray-900 tracking-tight sm:text-4xl dark:text-white">
							Powerful features for serious athletes
						</p>
						<p className="mt-6 text-gray-600 text-lg leading-8 dark:text-gray-400">
							Our comprehensive fitness tracking platform provides all the tools
							you need to track, analyze, and improve your workouts.
						</p>
					</div>
					<HomepageFeatures />
				</div>

				{/* CTA Section */}
				<div className="mt-32 sm:mt-40">
					<div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:px-16">
						<h2 className="mx-auto max-w-2xl font-bold text-3xl text-white tracking-tight sm:text-4xl">
							Start your fitness journey today
						</h2>
						<p className="mx-auto mt-6 max-w-xl text-gray-300 text-lg leading-8">
							Join thousands of athletes who are already tracking their progress
							and achieving their fitness goals.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link
								href="/auth/register"
								className="rounded-md bg-white px-3.5 py-2.5 font-semibold text-gray-900 text-sm shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
							>
								Get started
							</Link>
							<Link
								href="/api/auth/signin"
								className="font-semibold text-sm text-white leading-6"
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
