import "~/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "~/components/Layout/Header";
import { ThemeToggle } from "~/components/ThemeToggle";
import { ThemeProvider } from "~/state/ThemeProvider";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Fitness Tracker",
	description:
		"Track your fitness journey with our comprehensive workout tracker",
	keywords: [
		"fitness",
		"workout",
		"exercise",
		"tracking",
		"personal records",
		"progress",
	],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${inter.className}`}>
			<body className="relative min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
				<ThemeProvider>
					<TRPCReactProvider>
						<main className="min-h-screen">
							<Header />
							<ThemeToggle />
							{children}
						</main>
					</TRPCReactProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
