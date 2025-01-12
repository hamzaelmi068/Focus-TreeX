import React from "react";
import { Timer } from "../UI Components/Timer";
import { StreakCounter } from "../components/StreakCounter";
import { FocusTimeChart } from "../components/FocusTimeChart";
import { Tree } from "../components/Tree";
import { RewardPanel } from "../components/RewardPanel";
import { ThemeToggle } from "../components/ThemeToggle";

export default function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-950 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800">Focus Tree</h1>
          <Timer />
          <StreakCounter />
          <FocusTimeChart />
          <Tree />
          <RewardPanel />
        </div>
      </main>
    </div>
  );
}
