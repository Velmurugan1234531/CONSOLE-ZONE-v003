"use client";

import { motion } from "framer-motion";
import { UserPlus, ShoppingCart, ShieldAlert, Cpu, Globe } from "lucide-react";

const events = [
    { title: "New Asset Acquisition", time: "2 MINS AGO", desc: "Purchase of PS5 Spiderman Unit confirmed by Operative X-99.", icon: ShoppingCart, color: "indigo" },
    { title: "Infrastructure Alert", time: "14 MINS AGO", desc: "Server sync lag detected in Sector 7 during bulk data transfer.", icon: ShieldAlert, color: "rose" },
    { title: "Client Link Established", time: "45 MINS AGO", desc: "High-net-worth operative 'D-Vector' sync'd with Neural Roadmap.", icon: UserPlus, color: "emerald" },
    { title: "Firmware Rollout", time: "2 HOURS AGO", desc: "V2.4.9 stability patch deployed to all local admin terminal nodes.", icon: Cpu, color: "sky" },
    { title: "Global Sync Complete", time: "3 HOURS AGO", desc: "Alpha Nexus Corp regional data verified and encrypted.", icon: Globe, color: "purple" },
];

export default function NexusTimeline() {
    return (
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 group">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-8">Synchronized Activity</h3>

            <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-4 top-2 bottom-2 w-[1px] bg-white/10" />

                {events.map((event, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-6 relative"
                    >
                        <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border z-10 
                            ${event.color === 'indigo' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                                event.color === 'rose' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' :
                                    event.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                        event.color === 'sky' ? 'bg-sky-500/10 border-sky-500/20 text-sky-400' :
                                            'bg-purple-500/10 border-purple-500/20 text-purple-400'}`}
                        >
                            <event.icon size={16} />
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">{event.title}</h4>
                                <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest whitespace-nowrap">{event.time}</span>
                            </div>
                            <p className="text-[9px] font-bold text-gray-500 leading-relaxed tracking-tight max-w-sm">{event.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full mt-8 py-3 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                Access Audit Logs
            </button>
        </div>
    );
}
