import React from "react";
import { useSession } from "next-auth/react";

export const HeaderAuth = () => {
	const { data: session } = useSession();

	return (
		<div className="hidden lg:flex lg:flex-1 lg:justify-end">
			<a
				href={`/api/auth/${session ? "signout" : "signin"}`}
				className="font-semibold text-gray-900 text-sm/6 dark:text-white"
			>
				{session ? "Log out" : "Log in"}
			</a>
		</div>
	);
};
