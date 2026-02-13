"use client";

import { motion } from "framer-motion";
import { Briefcase, Coins, Home, TrendingUp, Cpu } from "lucide-react";

const assets = [
    { name: "Equity", value: 45, color: "bg-indigo-500", icon: Briefcase },
    { name: "Crypto Assets", value: 12, color: "bg-purple-500", icon: Coins },
    { name: "Real Estate", value: 25, color: "bg-cyan-500", icon: Home },
    { name: "Fixed Income", value: 10, color: "bg-emerald-500", icon: TrendingUp },
    { name: "Venture Capital", value: 8, color: "bg-rose-500", icon: Cpu },
];

export default function NexusAllocation() {
    return (
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 group h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Investment Allocation</h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Diversification across capital sectors</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-indigo-400 italic font-black text-xs">
                    DV
                </div>
            </div>

            <div className="space-y-8">
                {assets.map((asset, idx) => (
                    <div key={asset.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-lg ${asset.color.replace('bg-', 'bg-')}/10 border ${asset.color.replace('bg-', 'border-')}/20 flex items-center justify-center`}>
                                    <asset.icon size={14} className={asset.color.replace('bg-', 'text-')} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{asset.name}</span>
                            </div>
                            <span className="text-[11px] font-black text-white font-mono">{asset.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${asset.value}%` }}
                                transition={{ delay: idx * 0.1, duration: 1, ease: "easeOut" }}
                                className={`h-full ${asset.color} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center animate-pulse">
                    <TrendingUp size={16} className="text-white" />
                </div>
                <div>
                    <p className="text-[9px] font-black text-white uppercase tracking-widest tracking-tighter italic">Alpha Portfolio Rating: 9.4/10</p>
                    <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Optimized for high-yield market stability.</p>
                </div>
            </div>
        </div>
    );
}
