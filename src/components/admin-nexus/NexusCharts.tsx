"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { motion } from "framer-motion";

const areaData = [
    { name: "JAN", revenue: 4000, expense: 2400 },
    { name: "FEB", revenue: 3000, expense: 1398 },
    { name: "MAR", revenue: 2000, expense: 9800 },
    { name: "APR", revenue: 2780, expense: 3908 },
    { name: "MAY", revenue: 1890, expense: 4800 },
    { name: "JUN", revenue: 2390, expense: 3800 },
    { name: "JUL", revenue: 3490, expense: 4300 },
];

const performanceData = [
    { name: "Marketing", value: 400, color: "#6366f1" },
    { name: "Infrastructure", value: 300, color: "#a855f7" },
    { name: "Payroll", value: 300, color: "#22d3ee" },
    { name: "R&D", value: 200, color: "#10b981" },
];

export function RevenueChart() {
    return (
        <div className="w-full h-full p-8 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] relative group overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Financial Trajectory</h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Revenue vs Operational Expense</p>
                </div>
                <div className="flex gap-2">
                    {['WEEKLY', 'MONTHLY', 'YEARLY'].map((t) => (
                        <button key={t} className={`px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest transition-all ${t === 'MONTHLY' ? 'bg-indigo-500 text-white' : 'bg-white/5 text-gray-500 hover:text-white'}`}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaData}>
                        <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 800 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 800 }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#6366f1"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRev)"
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            fillOpacity={1}
                            fill="url(#colorExp)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function PerformanceBreakdown() {
    return (
        <div className="w-full h-full p-8 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center group overflow-hidden">
            <div className="text-center mb-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">CAPEX Allocation</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Resource Distribution Index</p>
            </div>

            <div className="h-[220px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={performanceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                        >
                            {performanceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ fontSize: '10px', fontWeight: 900 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black text-white italic tracking-tighter">84%</span>
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Efficiency</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                {performanceData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
