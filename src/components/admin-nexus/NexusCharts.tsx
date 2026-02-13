"use client";

import { RevenueTrend } from "@/services/payment-maintenance";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

interface NexusChartsProps {
    revenueData: RevenueTrend[];
}

export default function NexusCharts({ revenueData }: NexusChartsProps) {
    // Process data for charts - aggregating by date for the area chart
    const dailyRevenue = revenueData.reduce((acc, curr) => {
        const existing = acc.find(item => item.date === curr.date);
        if (existing) {
            existing.amount += curr.amount;
        } else {
            acc.push({ ...curr });
        }
        return acc;
    }, [] as RevenueTrend[]).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Trend Area Chart */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 shadow-xl">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Revenue Trajectory
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyRevenue}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="#666"
                                fontSize={10}
                                tickFormatter={(val) => new Date(val).getDate().toString()}
                            />
                            <YAxis
                                stroke="#666"
                                fontSize={10}
                                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff', fontSize: '12px' }}
                                labelStyle={{ color: '#888', fontSize: '10px', marginBottom: '4px' }}
                                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                            />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="#10B981"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Category Distribution Bar Chart */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 shadow-xl">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Stream Distribution
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData.slice(0, 7)}> {/* Just showing recent sample for categories */}
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="category" stroke="#666" fontSize={10} />
                            <YAxis stroke="#666" fontSize={10} tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
