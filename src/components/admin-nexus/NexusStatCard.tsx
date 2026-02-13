"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    isUp: boolean;
    icon: LucideIcon;
    color: 'indigo' | 'emerald' | 'purple' | 'sky' | 'rose';
}

const colorMap = {
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20 shadow-indigo-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/20",
    sky: "text-sky-400 bg-sky-500/10 border-sky-500/20 shadow-sky-500/20",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-rose-500/20",
};

const borderMap = {
    indigo: "from-indigo-500/50",
    emerald: "from-emerald-500/50",
    purple: "from-purple-500/50",
    sky: "from-sky-500/50",
    rose: "from-rose-500/50",
};

export default function NexusStatCard({ title, value, trend, isUp, icon: Icon, color }: StatCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 overflow-hidden transition-all hover:border-white/10"
        >
            {/* Top Gradient Border Accent */}
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${borderMap[color]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl border ${colorMap[color]} shadow-lg`}>
                    <Icon size={20} />
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-black tracking-widest ${isUp ? 'text-emerald-400 bg-emerald-500/5 border border-emerald-500/10' : 'text-rose-400 bg-rose-500/5 border border-rose-500/10'}`}>
                    {trend}
                    <div className={`w-1 h-1 rounded-full ${isUp ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse`} />
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{title}</p>
                <h3 className="text-2xl font-black text-white italic tracking-tighter">{value}</h3>
            </div>

            {/* Sparkline Visual (Abstraction) */}
            <div className="mt-8 flex items-end gap-1 h-8">
                {[40, 70, 45, 90, 65, 80, 50, 95, 100].map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className={`w-full rounded-t-sm opacity-20 ${isUp ? 'bg-emerald-400' : 'bg-rose-400'}`}
                    />
                ))}
            </div>

            {/* Hover Glow */}
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/5 blur-[50px] group-hover:bg-indigo-500/10 transition-colors rounded-full" />
        </motion.div>
    );
}
