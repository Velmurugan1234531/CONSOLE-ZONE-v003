"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Moon, Sun, ChevronDown, Clock, ShieldCheck, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NexusHeader() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState("Alpha Nexus Corp");

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="h-20 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Left: Search & Company */}
            <div className="flex items-center gap-8">
                {/* Company Switcher */}
                <div className="relative group">
                    <button className="flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all">
                        <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                            <Globe size={14} className="text-indigo-400" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-white/70">{selectedCompany}</span>
                        <ChevronDown size={14} className="text-gray-500 group-hover:rotate-180 transition-transform" />
                    </button>
                </div>

                {/* Search */}
                <div className="relative w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="SEARCH CORE REGISTERS..."
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-2.5 pl-12 pr-4 text-xs font-bold text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all uppercase tracking-widest"
                    />
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-6">
                {/* Clock */}
                <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
                    <Clock size={16} className="text-indigo-400" />
                    <span className="text-xs font-mono font-bold text-indigo-200 tracking-tighter">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all relative"
                    >
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#030712] flex items-center justify-center text-[8px] font-black text-white">4</span>
                    </button>

                    <AnimatePresence>
                        {isNotificationOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="absolute right-0 mt-4 w-80 bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Security Alerts</h4>
                                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Mark All Read</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                                        <p className="text-[10px] text-red-200 font-bold mb-1">FRAUD DETECTION ALERT</p>
                                        <p className="text-[9px] text-red-300 opacity-70">Suspicious transaction in Cluster X99-Alpha.</p>
                                    </div>
                                    <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-xl">
                                        <p className="text-[10px] text-green-200 font-bold mb-1">SYSTEM SYNC COMPLETE</p>
                                        <p className="text-[9px] text-green-300 opacity-70">All regional nodes operating at 99.8%.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-4 pl-6 border-l border-white/5">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-black text-white uppercase italic tracking-tighter">OPERATIVE ZERO</p>
                        <p className="text-[8px] font-black text-indigo-500 uppercase tracking-[0.2em] leading-none mt-1">SUPER ADMIN</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
                        <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center overflow-hidden">
                            <ShieldCheck size={20} className="text-indigo-400" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
