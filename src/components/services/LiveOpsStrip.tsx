"use client";

import { motion } from "framer-motion";
import { Wrench, CheckCircle2 } from "lucide-react";

const RECENT_ACTIVITY = [
    { type: "repair", item: "PS5 HDMI Port Replacement", loc: "Chennai", time: "2m ago" },
    { type: "repair", item: "Xbox Series X Fan Cleaning", loc: "Bangalore", time: "12m ago" },
    { type: "check", item: "DualSense Drift Fix", loc: "Mumbai", time: "24m ago" },
    { type: "repair", item: "PS4 Thermal Paste Application", loc: "Chennai", time: "45m ago" },
    { type: "check", item: "Steam Deck SSD Upgrade (1TB)", loc: "Delhi", time: "1h ago" },
    { type: "repair", item: "Nintendo Switch Screen Repair", loc: "Pune", time: "1h ago" },
];

export default function LiveOpsStrip() {
    return (
        <div className="w-full bg-black/80 border-y border-white/5 backdrop-blur-sm py-3 overflow-hidden flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 border-r border-white/10 shrink-0">
                <div className="relative w-2 h-2">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
                    <div className="relative w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-500 whitespace-nowrap">
                    LIVE OPS:
                </span>
            </div>

            <div className="flex items-center overflow-hidden flex-1 mask-linear-fade">
                <motion.div
                    className="flex items-center gap-8 whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                >
                    {[...RECENT_ACTIVITY, ...RECENT_ACTIVITY].map((act, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                            {act.type === 'repair' ? <Wrench size={12} className="text-[#A855F7]" /> : <CheckCircle2 size={12} className="text-green-500" />}
                            <span className="text-white font-bold">{act.item}</span>
                            <span className="opacity-50">[{act.loc}]</span>
                            <span className="text-[10px] bg-white/5 px-1 rounded">{act.time}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
