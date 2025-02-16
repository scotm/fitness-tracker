import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { ThemeToggle } from "~/components/theme-toggle";
import type { Metadata } from "next";

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
			<body className="bg-white dark:bg-gray-900 text-black dark:text-white">
				<ThemeProvider>
					<TRPCReactProvider>
						<ThemeToggle />
						{children}
					</TRPCReactProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
