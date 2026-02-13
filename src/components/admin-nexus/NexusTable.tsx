"use client";

import { motion } from "framer-motion";
import { ExternalLink, CreditCard, Wallet, Banknote, ShieldCheck, AlertCircle, Zap } from "lucide-react";

const transactions = [
    { id: "TX-9021", client: "Alex 'Nexus' Chen", service: "Neural Sync Pack", method: "Crypto", status: "completed", amount: "₹4,200", date: "FEB 13, 17:30" },
    { id: "TX-9022", client: "Sarah V-01", service: "Hardware Upgrade", method: "Bank Transfer", status: "pending", amount: "₹12,500", date: "FEB 13, 16:15" },
    { id: "TX-9023", client: "D-Vector Corp", service: "Bulk Deployment", method: "Credit Line", status: "completed", amount: "₹85,000", date: "FEB 13, 15:45" },
    { id: "TX-9024", client: "Michael Storm", service: "Maintenance Protocol", method: "UPI", status: "failed", amount: "₹3,150", date: "FEB 13, 14:20" },
    { id: "TX-9025", client: "Lena Quartz", service: "Asset Rental", method: "Wallet", status: "completed", amount: "₹1,800", date: "FEB 13, 12:00" },
];

const statusStyles = {
    completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    pending: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    failed: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export default function NexusTable() {
    return (
        <div className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Recent Telemetry Entries</h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Real-time ledger synchronization</p>
                </div>
                <button className="px-4 py-2 border border-white/5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all">
                    View Full Ledger
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="text-left pb-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 px-4">Identifier</th>
                            <th className="text-left pb-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 px-4">Operator</th>
                            <th className="text-left pb-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 px-4">Manifest</th>
                            <th className="text-left pb-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 px-4">Interface</th>
                            <th className="text-left pb-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 px-4">Status</th>
                            <th className="text-right pb-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 px-4">Magnitude</th>
                            <th className="text-right pb-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 px-4">Sync Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                        {transactions.map((tx, idx) => (
                            <motion.tr
                                key={tx.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group/row hover:bg-white/[0.01] transition-colors"
                            >
                                <td className="py-4 px-4 text-[11px] font-black text-indigo-400 font-mono tracking-tighter">{tx.id}</td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                                            <span className="text-[9px] font-black text-gray-400">{tx.client[0]}</span>
                                        </div>
                                        <span className="text-[11px] font-bold text-white tracking-tight">{tx.client}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-[11px] font-medium text-gray-400">{tx.service}</td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <MethodIcon method={tx.method} />
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{tx.method}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${statusStyles[tx.status as keyof typeof statusStyles]}`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-right text-[12px] font-black text-white italic tracking-tighter">{tx.amount}</td>
                                <td className="py-4 px-4 text-right text-[9px] font-bold text-gray-600 uppercase tracking-widest">{tx.date}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function MethodIcon({ method }: { method: string }) {
    if (method === 'Crypto') return <Zap size={12} className="text-purple-400" />;
    if (method === 'UPI') return <ShieldCheck size={12} className="text-emerald-400" />;
    return <CreditCard size={12} className="text-blue-400" />;
}
