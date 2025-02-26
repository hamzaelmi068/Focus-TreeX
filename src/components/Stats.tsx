import React from 'react';
import { UserStats } from '../types';
import { Clock, Calendar, Flame, Award, BarChart2 } from 'lucide-react';

interface StatsProps {
  stats: UserStats;
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <StatCard
        icon={<Clock />}
        label="Total Focus Time"
        value={`${Math.round(stats.totalFocusTime / 3600)}h`}
      />
      <StatCard
        icon={<Flame />}
        label="Current Streak"
        value={`${stats.currentStreak} days`}
      />
      <StatCard
        icon={<Award />}
        label="Longest Streak"
        value={`${stats.longestStreak} days`}
      />
      <StatCard
        icon={<BarChart2 />}
        label="Avg. Session"
        value={`${Math.round(stats.averageSessionDuration / 60)}m`}
      />
      <StatCard
        icon={<Calendar />}
        label="Weekly Sessions"
        value={stats.weeklySessionCount.toString()}
      />
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 text-gray-600 mb-2">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}