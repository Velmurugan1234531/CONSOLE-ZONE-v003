"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, DollarSign, Wrench, AlertTriangle, ShieldCheck } from "lucide-react";
import NexusHeader from "@/components/admin-nexus/NexusHeader";
import NexusCharts from "@/components/admin-nexus/NexusCharts";
import { getPaymentStats, getRevenueTrend, PaymentStats, RevenueTrend } from "@/services/payment-maintenance";
import { getMaintenanceDashboardStats } from "@/services/maintenance"; // Assuming this exists from previous context
import PageHero from "@/components/layout/PageHero";

export default function AdminNexusPage() {
    const [stats, setStats] = useState<PaymentStats | null>(null);
    const [revenueData, setRevenueData] = useState<RevenueTrend[]>([]);
    const [maintenanceStats, setMaintenanceStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [paymentStats, trendData, maintStats] = await Promise.all([
                    getPaymentStats(),
                    getRevenueTrend(),
                    getMaintenanceDashboardStats()
                ]);

                setStats(paymentStats);
                setRevenueData(trendData);
                setMaintenanceStats(maintStats);
            } catch (e) {
                console.error("Nexus Uplink Failed:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="text-[#A855F7] animate-pulse font-black text-xl tracking-[0.3em]">
                    INITIALIZING NEXUS UPLINK...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] font-display">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
                <NexusHeader />

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Total Revenue */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0A0A0A] border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-[#A855F7]/50 transition-all"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <DollarSign size={64} />
                        </div>
                        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Total Revenue</h3>
                        <div className="text-3xl font-black text-white">₹{(stats?.totalRevenue || 0).toLocaleString()}</div>
                        <div className="text-emerald-500 text-xs font-bold mt-2 flex items-center gap-1">
                            <Activity size={12} />
                            +12.5% vs last month
                        </div>
                    </motion.div>

                    {/* Pending Payments */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#0A0A0A] border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-yellow-500/50 transition-all"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <AlertTriangle size={64} />
                        </div>
                        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Pending Inflow</h3>
                        <div className="text-3xl font-black text-white">₹{(stats?.pendingPayments || 0).toLocaleString()}</div>
                        <div className="text-yellow-500 text-xs font-bold mt-2 flex items-center gap-1">
                            {((stats?.pendingPayments || 0) / (stats?.totalRevenue || 1) * 100).toFixed(1)}% of total volume
                        </div>
                    </motion.div>

                    {/* Maintenance Alert */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#0A0A0A] border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-red-500/50 transition-all"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Wrench size={64} />
                        </div>
                        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Critical Maintenance</h3>
                        <div className="text-3xl font-black text-white">{(maintenanceStats?.overdue || 0) + (maintenanceStats?.inRepair || 0)} Units</div>
                        <div className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1">
                            {maintenanceStats?.overdue || 0} Overdue • {maintenanceStats?.inRepair || 0} In-Repair
                        </div>
                    </motion.div>

                    {/* System Health */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#0A0A0A] border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-blue-500/50 transition-all"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ShieldCheck size={64} />
                        </div>
                        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">System Health</h3>
                        <div className="text-3xl font-black text-white">{maintenanceStats?.healthScore || 98}%</div>
                        <div className="text-blue-500 text-xs font-bold mt-2 flex items-center gap-1">
                            Operational Efficiency
                        </div>
                    </motion.div>
                </div>

                {/* Charts Section */}
                <NexusCharts revenueData={revenueData} />

                {/* Recent Logs / Activity Feed Placeholder */}
                <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">Recent System Events</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <div>
                                        <div className="text-xs text-white font-bold">System Optimization Protocol Completed</div>
                                        <div className="text-[10px] text-gray-500 font-mono">Server Node Alpha • 2m ago</div>
                                    </div>
                                </div>
                                <div className="text-[10px] font-mono text-[#A855F7]">LOG_ID_00{892 + i}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
