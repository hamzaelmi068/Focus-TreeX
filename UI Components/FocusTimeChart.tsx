import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type TimeRange = 'daily' | 'weekly' | 'monthly';

interface FocusSession {
  date: string;
  minutes: number;
}

// Sample data - replace with actual data from store
const generateSampleData = (range: TimeRange): FocusSession[] => {
  const now = new Date();
  const data: FocusSession[] = [];
  
  switch (range) {
    case 'daily':
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          minutes: Math.floor(Math.random() * 120) + 30, // Random minutes between 30-150
        });
      }
      break;
    case 'weekly':
      // Last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - (i * 7));
        data.push({
          date: `Week ${4-i}`,
          minutes: Math.floor(Math.random() * 500) + 200,
        });
      }
      break;
    case 'monthly':
      // Last 6 months
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short' }),
          minutes: Math.floor(Math.random() * 2000) + 500,
        });
      }
      break;
  }
  
  return data;
};

export function FocusTimeChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const data = generateSampleData(timeRange);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Focus Time</span>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => value && setTimeRange(value as TimeRange)}
            className="border rounded-lg"
          >
            <ToggleGroupItem value="daily" aria-label="Daily view">
              Daily
            </ToggleGroupItem>
            <ToggleGroupItem value="weekly" aria-label="Weekly view">
              Weekly
            </ToggleGroupItem>
            <ToggleGroupItem value="monthly" aria-label="Monthly view">
              Monthly
            </ToggleGroupItem>
          </ToggleGroup>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}m`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="font-medium">Time:</span>
                          <span className="font-medium">{payload[0].value}m</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="minutes"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
                className="fill-primary-500"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
