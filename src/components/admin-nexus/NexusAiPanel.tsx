"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, AlertTriangle, Zap, Lightbulb } from "lucide-react";

export default function NexusAiPanel() {
    return (
        <div className="flex flex-col gap-6">
            {/* Main AI Strategy Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -rotate-45 translate-x-32 -translate-y-32" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                            <Sparkles size={20} className="text-white" />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white italic">Nexus Intelligence Hub</h3>
                    </div>

                    <p className="text-lg font-black text-white leading-tight italic tracking-tighter mb-4">
                        "Operational efficiency is currently tracking at 84%. Reallocating Infrastructure spend to R&D could boost quarterly yield by <span className="text-cyan-300 underline decoration-cyan-300/30 font-black">12.4%</span>."
                    </p>

                    <div className="flex items-center gap-4">
                        <button className="px-5 py-2.5 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                            Enable Auto-Pivot
                        </button>
                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                            <Zap size={12} className="text-yellow-400" />
                            Live Inference Active
                        </span>
                    </div>
                </div>
            </div>

            {/* Insight Stream */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Optimization Stream</h4>

                <div className="space-y-4">
                    <InsightItem
                        icon={TrendingUp}
                        color="indigo"
                        title="Liquidity Surge"
                        desc="Cash reserves show 15% surplus in Cluster X. Recommendation: Allocate to Bond Ladder."
                    />
                    <InsightItem
                        icon={AlertTriangle}
                        color="orange"
                        title="Risk Threshold"
                        desc="Marketing volatility exceeded 3% target in Region 7. Stabilizing..."
                    />
                    <InsightItem
                        icon={Lightbulb}
                        color="cyan"
                        title="Synergy Detect"
                        desc="Cross-client data indicates latent demand for 'Neural VR' services."
                    />
                </div>
            </div>
        </div>
    );
}

function InsightItem({ icon: Icon, color, title, desc }: { icon: any, color: string, title: string, desc: string }) {
    const colors = {
        indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
        cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    };

    return (
        <div className="flex gap-4 group cursor-pointer">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${colors[color as keyof typeof colors]}`}>
                <Icon size={18} />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-indigo-400 transition-colors">{title}</p>
                <p className="text-[9px] font-bold text-gray-500 leading-relaxed mt-1">{desc}</p>
            </div>
        </div>
    );
}
