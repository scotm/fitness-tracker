"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Slider } from "~/components/ui/slider";
import { Label } from "~/components/ui/label";
import {
	Play,
	Pause,
	RotateCcw,
	Timer as TimerIcon,
	Volume2,
	VolumeX,
} from "lucide-react";

export default function RestTimer() {
	const [time, setTime] = useState(60); // Default 60 seconds
	const [customTime, setCustomTime] = useState(60);
	const [isRunning, setIsRunning] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// Initialize audio
	useEffect(() => {
		audioRef.current = new Audio("/timer-end.mp3");
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	// Timer logic
	useEffect(() => {
		if (isRunning) {
			intervalRef.current = setInterval(() => {
				setTime((prevTime) => {
					if (prevTime <= 1) {
						clearInterval(intervalRef.current as NodeJS.Timeout);
						setIsRunning(false);
						if (!isMuted && audioRef.current) {
							audioRef.current
								.play()
								.catch((err) => console.error("Failed to play sound:", err));
						}
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		} else if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isRunning, isMuted]);

	// Format time as mm:ss
	const formatTime = (timeInSeconds: number) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	// Timer controls
	const startTimer = () => setIsRunning(true);
	const pauseTimer = () => setIsRunning(false);
	const resetTimer = () => {
		setIsRunning(false);
		setTime(customTime);
	};

	// Preset times
	const presets = [30, 60, 90, 120, 180];

	// Update timer with custom value
	const handleCustomTimeChange = (value: number) => {
		if (!isRunning) {
			setCustomTime(value);
			setTime(value);
		}
	};

	// Handle slider change
	const handleSliderChange = (value: number[]) => {
		handleCustomTimeChange(value[0] ?? 0);
	};

	// Toggle sound
	const toggleMute = () => setIsMuted(!isMuted);

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="flex items-center">
					<TimerIcon className="h-5 w-5 mr-2" />
					Rest Timer
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-center">
					<div className="text-5xl font-mono font-semibold">
						{formatTime(time)}
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="timer-slider">Set Timer Duration</Label>
					<Slider
						id="timer-slider"
						value={[customTime]}
						onValueChange={handleSliderChange}
						min={5}
						max={300}
						step={5}
						disabled={isRunning}
					/>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>0:05</span>
						<span>5:00</span>
					</div>
				</div>

				<div className="flex items-center space-x-2">
					<Input
						type="number"
						min={5}
						max={300}
						value={customTime}
						onChange={(e) => handleCustomTimeChange(Number(e.target.value))}
						disabled={isRunning}
						className="w-20"
					/>
					<span className="text-sm ml-1">seconds</span>
				</div>

				<div className="flex gap-2 flex-wrap">
					{presets.map((preset) => (
						<Button
							key={preset}
							variant="outline"
							size="sm"
							onClick={() => handleCustomTimeChange(preset)}
							disabled={isRunning}
							className="flex-1 min-w-[60px]"
						>
							{formatTime(preset)}
						</Button>
					))}
				</div>

				<div className="flex space-x-2 mt-4">
					{isRunning ? (
						<Button
							variant="outline"
							size="icon"
							onClick={pauseTimer}
							className="flex-1"
						>
							<Pause className="h-4 w-4 mr-2" />
							Pause
						</Button>
					) : (
						<Button
							variant="default"
							size="icon"
							onClick={startTimer}
							className="flex-1"
						>
							<Play className="h-4 w-4 mr-2" />
							Start
						</Button>
					)}
					<Button variant="outline" size="icon" onClick={resetTimer}>
						<RotateCcw className="h-4 w-4" />
					</Button>
					<Button variant="outline" size="icon" onClick={toggleMute}>
						{isMuted ? (
							<VolumeX className="h-4 w-4" />
						) : (
							<Volume2 className="h-4 w-4" />
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
