import NexusSidebar from "@/components/admin-nexus/NexusSidebar";
import NexusHeader from "@/components/admin-nexus/NexusHeader";

export default function NexusLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#030712] text-white selection:bg-indigo-500/30">
            <NexusSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <NexusHeader />
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {/* Background Noise/Grid */}
                    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    <div className="relative z-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
