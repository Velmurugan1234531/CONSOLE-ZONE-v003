"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, AlertTriangle, CheckCircle, ArrowRight, Loader2 } from "lucide-react";

interface Symptom {
    id: string;
    label: string;
    icon: React.ReactNode;
    basePrice: number;
    severity: "low" | "medium" | "high";
}

const SYSTEMS = [
    { id: "ps5", label: "PlayStation 5", code: "SONY-PS5-01" },
    { id: "xbox", label: "Xbox Series X", code: "MS-XSX-99" },
    { id: "ps4", label: "PlayStation 4", code: "SONY-PS4-PRO" },
];

const SYMPTOMS: Symptom[] = [
    { id: "hdmi", label: "HDMI / No Display", icon: <Zap size={18} />, basePrice: 2499, severity: "medium" },
    { id: "overheat", label: "Loud Fan / Overheating", icon: <AlertTriangle size={18} />, basePrice: 1499, severity: "medium" },
    { id: "drive", label: "Disc Drive Failure", icon: <Cpu size={18} />, basePrice: 2999, severity: "high" },
    { id: "software", label: "System Error Loop", icon: <AlertTriangle size={18} />, basePrice: 1299, severity: "low" },
    { id: "power", label: "No Power / Dead", icon: <Zap size={18} />, basePrice: 3499, severity: "high" },
];

export default function DiagnosticsTerminal() {
    const [step, setStep] = useState<"system" | "symptom" | "analyzing" | "result">("system");
    const [system, setSystem] = useState<any>(null);
    const [symptom, setSymptom] = useState<Symptom | null>(null);
    const [logs, setLogs] = useState<string[]>([]);

    // Auto-scroll logs
    const logsEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    const runAnalysis = () => {
        setStep("analyzing");
        setLogs([]);

        const sequence = [
            "INITIALIZING DIAGNOSTIC BRIDGE...",
            `TARGET SYSTEM: ${system.code}`,
            "CHECKING POWER RAILS... [OK]",
            "SCANNING THERMAL SENSORS... [NOMINAL]",
            `ISOLATING FAULT: ${symptom?.label.toUpperCase()}`,
            "CALCULATING REPAIR VECTORS...",
            "ESTIMATING COMPONENT COST...",
            "GENERATING TACTICAL REPORT..."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                setLogs(prev => [...prev, sequence[i]]);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setStep("result"), 800);
            }
        }, 600);
    };

    const reset = () => {
        setStep("system");
        setSystem(null);
        setSymptom(null);
        setLogs([]);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 relative z-20 -mt-32 mb-24">
            <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                {/* Header */}
                <div className="bg-[#111] px-4 py-2 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 ml-2">CZ-DIAGNOSTICS-V7.0</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#A855F7] animate-pulse">
                        {step === "analyzing" ? "SYSTEM ACTIVE" : "READY"}
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6 md:p-10 min-h-[400px] flex flex-col font-mono">
                    <AnimatePresence mode="wait">

                        {/* STEP 1: SELECT SYSTEM */}
                        {step === "system" && (
                            <motion.div
                                key="system"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1 flex flex-col justify-center"
                            >
                                <h3 className="text-[#A855F7] text-sm font-bold mb-6 typewriter">
                                    &gt; SELECT TARGET HARDWARE_
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {SYSTEMS.map(sys => (
                                        <button
                                            key={sys.id}
                                            onClick={() => { setSystem(sys); setStep("symptom"); }}
                                            className="group relative bg-white/5 border border-white/10 hover:border-[#A855F7] p-6 rounded-xl text-left transition-all hover:bg-[#A855F7]/10"
                                        >
                                            <div className="text-2xl font-black text-white mb-2">{sys.label}</div>
                                            <div className="text-[10px] text-gray-500 group-hover:text-[#A855F7]">{sys.code}</div>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ArrowRight className="text-[#A855F7]" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: SELECT SYMPTOM */}
                        {step === "symptom" && (
                            <motion.div
                                key="symptom"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1"
                            >
                                <div className="flex items-center gap-2 mb-6 text-xs text-gray-500">
                                    <button onClick={() => setStep("system")} className="hover:text-white hover:underline">&lt; BACK</button>
                                    <span>/</span>
                                    <span className="text-[#A855F7]">{system.label}</span>
                                </div>

                                <h3 className="text-[#A855F7] text-sm font-bold mb-6 typewriter">
                                    &gt; IDENTIFY PRIMARY FAULT_
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {SYMPTOMS.map(sym => (
                                        <button
                                            key={sym.id}
                                            onClick={() => { setSymptom(sym); runAnalysis(); }}
                                            className="group flex items-center gap-4 bg-white/5 border border-white/10 hover:border-red-500/50 p-4 rounded-xl text-left transition-all hover:bg-red-500/5"
                                        >
                                            <div className={`p-2 rounded bg-black border border-white/10 ${sym.severity === 'high' ? 'text-red-500' :
                                                sym.severity === 'medium' ? 'text-orange-500' : 'text-yellow-500'
                                                }`}>
                                                {sym.icon}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-200 group-hover:text-white">{sym.label}</div>
                                                <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{
                                                    color: sym.severity === 'high' ? '#ef4444' :
                                                        sym.severity === 'medium' ? '#f97316' : '#eab308'
                                                }}>
                                                    SEVERITY: {sym.severity}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: ANALYZING */}
                        {step === "analyzing" && (
                            <motion.div
                                key="analyzing"
                                className="flex-1 font-mono text-xs overflow-hidden"
                            >
                                <div className="h-full flex flex-col">
                                    <div className="flex-1 space-y-1 mb-4">
                                        {logs.map((log, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-green-400"
                                            >
                                                <span className="opacity-50 mr-2">{new Date().toLocaleTimeString()}</span>
                                                {log}
                                            </motion.div>
                                        ))}
                                        <div ref={logsEndRef} />
                                    </div>
                                    <div className="h-1 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[#A855F7]"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 4.8, ease: "linear" }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: RESULT */}
                        {step === "result" && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-6">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">
                                    REPAIR PLAN GENERATED
                                </h3>
                                <p className="text-gray-400 text-sm mb-8">
                                    We can fix your <span className="text-white">{system.label}</span> with <span className="text-white">{symptom?.label}</span> issues.
                                </p>

                                <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-sm mx-auto mb-8">
                                    <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                                        <span>Estimated Cost</span>
                                        <span>Time Estimate</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
                                        <div className="text-3xl font-black text-[#A855F7]">₹{symptom?.basePrice}</div>
                                        <div className="text-white font-bold">24-48 HRS</div>
                                    </div>
                                    <button
                                        className="w-full py-3 bg-[#A855F7] hover:bg-[#9333EA] text-white font-black uppercase tracking-widest rounded-lg transition-all"
                                        onClick={() => window.open('https://wa.me/918122841273?text=I%20need%20a%20repair%20quote%20for%20my%20' + system.label, '_blank')}
                                    >
                                        BOOK REPAIR SLOT
                                    </button>
                                </div>

                                <button onClick={reset} className="text-xs text-gray-500 hover:text-white underline uppercase tracking-widest">
                                    RUN NEW DIAGNOSTIC
                                </button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* Decorative Grid Lines */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20"
                    style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                />
            </div>
        </div>
    );
}
