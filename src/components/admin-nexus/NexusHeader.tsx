import Link from "next/link";
import { ChevronRight, Home, LayoutDashboard, ShieldCheck } from "lucide-react";

export default function NexusHeader() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="space-y-1">
                <nav className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
                    <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1">
                        <Home size={10} />
                        Command
                    </Link>
                    <ChevronRight size={10} />
                    <span className="text-[#A855F7] flex items-center gap-1">
                        <LayoutDashboard size={10} />
                        Nexus Control
                    </span>
                </nav>
                <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                    Administration Nexus
                </h1>
                <p className="text-gray-400 text-xs font-mono">
                    System Override & Financial Overwatch
                </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-[#A855F7]/10 border border-[#A855F7]/20 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
                <span className="text-[10px] font-black text-[#A855F7] uppercase tracking-widest">
                    Secure Connection Active
                </span>
                <ShieldCheck size={12} className="text-[#A855F7]" />
            </div>
        </div>
    );
}
