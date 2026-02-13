"use client";

import { Suspense, useState, useEffect } from "react";
import { Cpu, ShieldCheck, Zap, ArrowRight, Cog, Wrench, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

import { VisualsService, VisualSettings } from "@/services/visuals";
import { usePageSEO } from "@/hooks/use-seo";

// CYBER-LAB COMPONENTS
import RepairBayHero from "@/components/services/RepairBayHero";
import DiagnosticsTerminal from "@/components/services/DiagnosticsTerminal";
import LiveOpsStrip from "@/components/services/LiveOpsStrip";

export default function ServicesPage() {
    usePageSEO('services');
    const [visualSettings, setVisualSettings] = useState<VisualSettings | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const handleTitleClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount === 5) {
            setIsAdmin(!isAdmin);
            setClickCount(0);
        }
    };

    useEffect(() => {
        const load = async () => {
            const settings = await VisualsService.getSettings();
            setVisualSettings(settings);
        };
        load();
    }, []);

    const services = [
        {
            id: "hardware",
            title: "Hardware Repair",
            defaultDesc: "Fixing HDMI ports, overheating issues, disc drive failures, and motherboard repairs.",
            icon: <Cpu size={40} className="text-[#A855F7]" />,
            defaultPrice: "Starting at ₹2,499",
            color: "#A855F7"
        },
        {
            id: "controller",
            title: "Controller Specialty",
            defaultDesc: "Stick drift fix, button replacement, battery upgrades, and shell customization for Pro gear.",
            icon: <Gamepad2 size={40} className="text-[#8B5CF6]" />,
            defaultPrice: "Starting at ₹999",
            color: "#8B5CF6"
        },
        {
            id: "cleaning",
            title: "Internal Optimization",
            defaultDesc: "Complete internal dust removal, thermal paste replacement, and fan optimization for silent operation.",
            icon: <Zap size={40} className="text-[#39ff14]" />,
            defaultPrice: "₹1,499",
            color: "#39ff14"
        },
        {
            id: "software",
            title: "System Recovery",
            defaultDesc: "Fixing bricked consoles, update loops, storage upgrades (SSD installation), and data recovery.",
            icon: <Cog size={40} className="text-white" />,
            defaultPrice: "Starting at ₹1,299",
            color: "#FFFFFF"
        },
    ];

    return (
        <div className="min-h-screen relative bg-[#050505] overflow-x-hidden">
            {isAdmin && (
                <div className="fixed top-24 right-4 z-[100] bg-red-600 text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest text-xs animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                    Master Control Active
                </div>
            )}

            {/* SECTION 1: 3D HERO */}
            <section className="relative w-full overflow-hidden bg-black pb-32">
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />

                <div className="relative pt-32 text-center z-20 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Technicians Online</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        onClick={handleTitleClick}
                        className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 uppercase italic tracking-tighter leading-none pointer-events-auto cursor-default"
                    >
                        HARDWARE<br /><span className="text-[#A855F7]">LAB_01</span>
                    </motion.h1>
                </div>

                <Suspense fallback={<div className="h-[60vh] w-full flex items-center justify-center text-gray-800 font-mono">INITIALIZING 3D ENGINE...</div>}>
                    <RepairBayHero />
                </Suspense>

                {/* Foreground Overlay Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />
            </section>

            {/* SECTION 2: DIAGNOSTICS TERMINAL */}
            <section className="relative z-30 px-4">
                <DiagnosticsTerminal />
            </section>

            {/* SECTION 3: SERVICE GRID */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">
                        ADVANCED PROTOCOLS
                    </h2>
                    <div className="h-1 w-20 bg-[#39ff14] mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            key={service.id}
                            className="group bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 hover:border-[#A855F7]/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.1)] flex flex-col relative overflow-hidden"
                        >
                            {/* Abstract Glow Background */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#A855F7]/5 rounded-full blur-[80px] group-hover:bg-[#A855F7]/10 transition-all" />

                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div className="p-5 bg-white/5 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                    {service.icon}
                                </div>
                                <div className="text-right flex flex-col items-end gap-2">
                                    <p className="text-[10px] text-gray-600 font-mono uppercase font-black tracking-widest mb-1">Service Tier</p>
                                    <p className="text-[#A855F7] font-mono text-xs uppercase font-bold tracking-widest italic opacity-0 group-hover:opacity-100 transition-opacity">Active</p>
                                </div>
                            </div>

                            <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-[#A855F7] transition-colors">{service.title}</h3>
                            <p className="text-gray-500 text-base mb-10 flex-grow font-light leading-relaxed max-w-sm">{service.defaultDesc}</p>

                            <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5 relative z-10">
                                <span className="text-2xl font-black text-white font-display uppercase tracking-widest italic">{service.defaultPrice}</span>
                                <button className="flex items-center gap-3 bg-white/5 hover:bg-[#A855F7] hover:text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all text-xs group/btn shadow-inner">
                                    BOOK NOW <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 relative overflow-hidden rounded-[2.5rem]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/20 via-[#8B5CF6]/10 to-[#39ff14]/10 opacity-40 blur-3xl" />
                    <div className="relative bg-[#0a0a0a] border border-white/10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left shadow-2xl">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none font-display">
                                NEED A CUSTOM <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#FFFFFF]">SYSTEM FIX?</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-light tracking-wide font-mono">
                                Not sure what's wrong? Our technicians provide zero-cost diagnostics for all hardware brought into the lab.
                            </p>
                        </div>
                        <button className="whitespace-nowrap bg-[#A855F7] text-white font-black px-12 py-6 rounded-none skew-x-[-15deg] hover:scale-105 transition-all shadow-[0_0_30px_rgba(168,85,247,0.5)] uppercase tracking-[0.2em] font-display">
                            <span className="skew-x-[15deg]">Initiate Repair</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* LIVE OPS TICKER */}
            <div className="fixed bottom-0 left-0 right-0 z-50">
                <LiveOpsStrip />
            </div>

            {/* Footer Trust Section */}
            <div className="bg-black/80 border-t border-white/5 py-20 px-4 pb-32">
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                    {[
                        { icon: ShieldCheck, color: "text-[#8B5CF6]", text: "90-Day Coverage" },
                        { icon: Wrench, color: "text-[#A855F7]", text: "Oem Components Only" },
                        { icon: Zap, color: "text-[#39ff14]", text: "Rapid Restoration" },
                        { icon: Cog, color: "text-[#F59E0B]", text: "Certified Lab Techs" }
                    ].map((item, i) => (
                        <div key={i}>
                            <item.icon size={32} className={`mx-auto mb-4 ${item.color} opacity-50`} />
                            <p className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

