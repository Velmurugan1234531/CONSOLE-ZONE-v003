"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    PieChart,
    BarChart3,
    ShoppingBag,
    Users,
    FileText,
    Settings,
    ShieldAlert,
    Bell,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Command
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin-nexus" },
    { name: "Financial Overview", icon: PieChart, path: "/admin-nexus/finance" },
    { name: "Revenue Streams", icon: BarChart3, path: "/admin-nexus/revenue" },
    { name: "Orders", icon: ShoppingBag, path: "/admin-nexus/orders" },
    { name: "Clients", icon: Users, path: "/admin-nexus/clients" },
    { name: "Reports", icon: FileText, path: "/admin-nexus/reports" },
];

const secondaryItems = [
    { name: "System Settings", icon: Settings, path: "/admin-nexus/settings" },
    { name: "Access Control", icon: ShieldAlert, path: "/admin-nexus/access" },
    { name: "Notifications", icon: Bell, path: "/admin-nexus/notifications" },
];

export default function NexusSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 280 }}
            className="h-screen bg-[#030712] border-r border-white/5 flex flex-col relative z-50 shadow-2xl"
        >
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                    <Command size={22} className="text-white" />
                </div>
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-lg font-black tracking-tighter text-white italic"
                    >
                        NEXUS<span className="text-indigo-500">.</span>CORE
                    </motion.span>
                )}
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white border-2 border-[#030712] hover:bg-indigo-400 transition-colors z-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Navigation */}
            <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto no-scrollbar">
                <div className="space-y-1">
                    {!isCollapsed && (
                        <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4">Operations</p>
                    )}
                    {menuItems.map((item) => (
                        <SidebarLink
                            key={item.name}
                            item={item}
                            isActive={pathname === item.path}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </div>

                <div className="space-y-1">
                    {!isCollapsed && (
                        <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4">System</p>
                    )}
                    {secondaryItems.map((item) => (
                        <SidebarLink
                            key={item.name}
                            item={item}
                            isActive={pathname === item.path}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </div>
            </div>

            {/* Logout */}
            <div className="p-4 border-t border-white/5 mb-4">
                <button
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all group overflow-hidden`}
                >
                    <LogOut size={20} className="shrink-0 transition-transform group-hover:-translate-x-1" />
                    {!isCollapsed && <span className="text-sm font-bold uppercase tracking-widest">Terminate Session</span>}
                </button>
            </div>
        </motion.aside>
    );
}

function SidebarLink({ item, isActive, isCollapsed }: { item: any, isActive: boolean, isCollapsed: boolean }) {
    return (
        <Link
            href={item.path}
            className={`
                relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group overflow-hidden
                ${isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}
            `}
        >
            {isActive && (
                <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border-l border-indigo-500"
                />
            )}

            <item.icon
                size={20}
                className={`shrink-0 transition-all ${isActive ? 'text-indigo-500' : 'group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'}`}
            />

            {!isCollapsed && (
                <span className="text-sm font-bold tracking-wide transition-colors whitespace-nowrap">
                    {item.name}
                </span>
            )}

            {isActive && !isCollapsed && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]"
                />
            )}
        </Link>
    );
}
