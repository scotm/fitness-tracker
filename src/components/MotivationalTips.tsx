import type React from "react";

const MotivationalTips: React.FC = () => {
	return (
		<section>
			<h2 className="font-bold text-xl tracking-tight dark:text-white">
				Motivational Tips
			</h2>
			<p className="text-gray-500 dark:text-gray-400">
				Stay motivated with these tips.
			</p>
			<ul className="list-disc list-inside">
				<li>Set realistic goals.</li>
				<li>Stay consistent.</li>
				<li>Listen to your body.</li>
				<li>Stay hydrated.</li>
				<li>Eat well.</li>
			</ul>
		</section>
	);
};

export default MotivationalTips;
