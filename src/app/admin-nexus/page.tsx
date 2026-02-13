"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    Activity,
    ShieldAlert,
    Zap,
    Download,
    Filter,
    Plus,
    BarChart,
    Users
} from "lucide-react";
import NexusStatCard from "@/components/admin-nexus/NexusStatCard";
import { RevenueChart, PerformanceBreakdown } from "@/components/admin-nexus/NexusCharts";
import NexusTable from "@/components/admin-nexus/NexusTable";
import NexusAiPanel from "@/components/admin-nexus/NexusAiPanel";
import NexusAllocation from "@/components/admin-nexus/NexusAllocation";
import NexusTimeline from "@/components/admin-nexus/NexusTimeline";

export default function AdminNexusDashboard() {
    return (
        <div className="space-y-8">
            {/* Page Title & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                        OPERATIONAL<span className="text-indigo-500">DASHBOARD</span>
                        <div className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black non-italic tracking-[0.2em] text-indigo-400">V2.4.9</div>
                    </h1>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Real-time financial telemetry & asset overwatch.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all">
                        <Filter size={14} />
                        Mission Parameters
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                        <Download size={14} />
                        Export Intel
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-white/[0.03] border border-white/5 rounded-xl text-indigo-400 hover:text-white hover:bg-white/[0.05] transition-all">
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            {/* SECTION A: Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NexusStatCard
                    title="Gross Revenue"
                    value="₹48,920,400"
                    trend="+12.4%"
                    isUp={true}
                    icon={DollarSign}
                    color="indigo"
                />
                <NexusStatCard
                    title="Net Profit"
                    value="₹12,450,200"
                    trend="+8.2%"
                    isUp={true}
                    icon={TrendingUp}
                    color="emerald"
                />
                <NexusStatCard
                    title="Operational Cost"
                    value="₹36,470,200"
                    trend="+2.1%"
                    isUp={false}
                    icon={Activity}
                    color="purple"
                />
                <NexusStatCard
                    title="Active Operatives"
                    value="1,248"
                    trend="+5.4%"
                    isUp={true}
                    icon={Users}
                    color="sky"
                />
            </div>

            {/* SECTION E & F: Intelligence & Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <NexusAiPanel />
                        <NexusAllocation />
                    </div>
                </div>
                <div>
                    <NexusTimeline />
                </div>
            </div>

            {/* SECTION B & C: Analytics & Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>
                <div>
                    <PerformanceBreakdown />
                </div>
            </div>

            {/* SECTION D: Recent Transactions Table */}
            <div className="relative">
                <NexusTable />
            </div>
        </div>
    );
}
