"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, User, Mail, ShieldCheck, Gamepad2, History, AlertCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { useVisuals } from "@/context/visuals-context";
import { getUserRentals } from "@/services/rentals";
import { getUserServiceBookings } from "@/services/service-booking";
import KYCForm from "@/components/KYCForm";
import { format } from "date-fns";
import NeuralRoadmap from "@/components/profile/NeuralRoadmap";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [rentals, setRentals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [serviceBookings, setServiceBookings] = useState<any[]>([]);
    const [showKYC, setShowKYC] = useState(false);

    const router = useRouter();
    const { settings } = useVisuals();

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const currentUser = {
                    ...firebaseUser,
                    id: firebaseUser.uid,
                    user_metadata: {
                        full_name: firebaseUser.displayName,
                        avatar_url: firebaseUser.photoURL
                    }
                };
                setUser(currentUser);

                // Fetch real mission records
                try {
                    setProfile({ kyc_status: 'APPROVED', neural_sync_xp: 750 }); // Mocked for now
                    const [rentalData, serviceData] = await Promise.all([
                        getUserRentals(firebaseUser.uid),
                        getUserServiceBookings(firebaseUser.uid)
                    ]);
                    setRentals(rentalData);
                    setServiceBookings(serviceData);
                } catch (e) {
                    console.error("Failed to load records", e);
                }
                setLoading(false);
            } else {
                // Check Demo Session
                const demoUser = localStorage.getItem('DEMO_USER_SESSION');
                if (demoUser) {
                    const parsed = JSON.parse(demoUser);
                    setUser(parsed);
                    setProfile({ kyc_status: 'APPROVED', neural_sync_xp: 750 });

                    // Fetch demo mission records
                    try {
                        const [rentalData, serviceData] = await Promise.all([
                            getUserRentals('demo-user-123'),
                            getUserServiceBookings('demo-user-123')
                        ]);
                        setRentals(rentalData);
                        setServiceBookings(serviceData);
                    } catch (e) {
                        setRentals([]);
                        setServiceBookings([]);
                    }

                    setLoading(false);
                } else {
                    router.push("/login");
                }
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleSignOut = async () => {
        setLoading(true);
        try {
            if (auth) {
                await firebaseSignOut(auth);
            }
            localStorage.removeItem('DEMO_USER_SESSION');
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="animate-spin text-[#A855F7]" size={40} />
            </div>
        );
    }

    const KycStatusBadge = () => {
        const status = profile?.kyc_status || 'NOT_SUBMITTED';
        switch (status) {
            case 'APPROVED':
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Verified Operative</span>
                    </div>
                );
            case 'PENDING':
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                        <Loader2 size={14} className="text-yellow-500 animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500">Verification Pending</span>
                    </div>
                );
            case 'REJECTED':
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                        <AlertCircle size={14} className="text-red-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Verification Failed</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-500/10 border border-gray-500/20 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-gray-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Unverified</span>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] font-display">
            <PageHero
                title="OPERATIVE PROFILE"
                subtitle="Authorized Clearance & Records"
                images={settings?.pageBackgrounds?.profile || []}
                height="100vh"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-32">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0A0A0A] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
                    >
                        {/* Header/Identity Strip */}
                        <div className="p-8 md:p-12 border-b border-white/5 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-white/[0.02] to-transparent">
                            <div className="w-32 h-32 rounded-3xl bg-[#0A0A0A] border-4 border-[#1A1A1A] overflow-hidden shadow-2xl shrink-0">
                                {user?.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                                        <User size={48} className="text-gray-700" />
                                    </div>
                                )}
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">
                                    {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                                </h1>
                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                                    <KycStatusBadge />
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">System Online</span>
                                    </div>
                                </div>
                            </div>

                            {/* KYC Action Button */}
                            {(!profile?.kyc_status || profile.kyc_status === 'NOT_SUBMITTED' || profile.kyc_status === 'REJECTED') && !showKYC && (
                                <div className="ml-auto">
                                    <button
                                        onClick={() => setShowKYC(true)}
                                        className="px-6 py-3 bg-[#A855F7] hover:bg-[#9333EA] border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center gap-2"
                                    >
                                        <ShieldCheck size={16} />
                                        Complete Verification
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* KYC Form Section (Expandable) */}
                        <AnimatePresence>
                            {showKYC && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-b border-white/5 bg-white/[0.02]"
                                >
                                    <div className="p-8 md:p-12 relative">
                                        <button
                                            onClick={() => setShowKYC(false)}
                                            className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
                                        >
                                            Close
                                        </button>
                                        <div className="max-w-2xl mx-auto">
                                            <div className="mb-8 text-center">
                                                <h3 className="text-xl font-black text-white uppercase italic tracking-widest mb-2">Identity Verification</h3>
                                                <p className="text-gray-400 text-xs">Complete protocols to access restricted gear.</p>
                                            </div>
                                            <KYCForm onSuccess={() => {
                                                setShowKYC(false);
                                                setProfile({ ...profile, kyc_status: 'PENDING' });
                                                alert("KYC Submitted Successfully!");
                                            }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Content */}
                        <div className="p-8 md:p-12 space-y-12">
                            {/* Neural Sync Level */}
                            <div className="space-y-4">
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#A855F7]">Neural Sync Roadmap</h2>
                                <NeuralRoadmap xp={profile?.neural_sync_xp || 0} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Account Details */}
                                <div className="space-y-6">
                                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#A855F7] mb-4">Account Intelligence</h2>

                                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Mail size={18} className="text-gray-500" />
                                                <div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-600">Email Link</div>
                                                    <div className="text-sm text-white font-medium">{user?.email}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <ShieldCheck size={18} className="text-gray-500" />
                                                <div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-600">Status</div>
                                                    <div className="text-sm text-green-500 font-bold uppercase tracking-wider">Active</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all group"
                                    >
                                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                                        <span>Terminate Session</span>
                                    </button>
                                </div>

                                {/* Activity */}
                                <div className="space-y-12">
                                    {/* Active Deployments */}
                                    <div className="space-y-6">
                                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#A855F7] flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
                                            Active Deployments
                                        </h2>

                                        {rentals.filter(r => ['active', 'overdue', 'shipped'].includes(r.status)).length === 0 ? (
                                            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                                                No active missions in sector.
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {rentals.filter(r => ['active', 'overdue', 'shipped'].includes(r.status)).map((rental) => (
                                                    <div key={rental.id} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 hover:border-[#A855F7]/30 transition-all group relative overflow-hidden">
                                                        {rental.status === 'overdue' && (
                                                            <div className="absolute top-0 right-0 p-2 bg-red-500/10 border-l border-b border-red-500/20 rounded-bl-xl">
                                                                <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter">SIGNAL_LOST</span>
                                                            </div>
                                                        )}
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-xl bg-black border border-white/10 overflow-hidden">
                                                                    <img
                                                                        src={rental.product?.image || (rental.product?.images && rental.product.images[0]) || "/images/products/ps5.png"}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <h3 className="text-sm font-bold text-white group-hover:text-[#A855F7] transition-colors">{rental.product?.name}</h3>
                                                                    <p className="text-[10px] text-gray-500 font-mono">
                                                                        ID: {rental.id.slice(0, 8)} • Ends {format(new Date(rental.end_date), 'MMM dd')}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border ${rental.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                                rental.status === 'overdue' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                                }`}>
                                                                {rental.status}
                                                            </span>
                                                        </div>

                                                        {/* Assigned Unit Details */}
                                                        <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex justify-between items-center group-hover:bg-[#A855F7]/5 transition-all">
                                                            <div>
                                                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">Hardware ID</p>
                                                                <div className="flex items-center gap-2">
                                                                    <div className={`w-1.5 h-1.5 rounded-full ${rental.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                                                                    <span className="text-xs text-white font-mono">{rental.console?.name || "TACTICAL_HARDWARE"} (SN: {rental.console?.serial_number || "X-000"})</span>
                                                                </div>
                                                            </div>
                                                            <Link href="/track">
                                                                <button className="text-[9px] text-[#A855F7] hover:text-white font-black uppercase tracking-widest underline decoration-[#A855F7]/30 flex items-center gap-1">
                                                                    Live Trace <ChevronRight size={10} />
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Mission History */}
                                    <div className="space-y-6">
                                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-2">
                                            <History size={16} />
                                            Mission Archive
                                        </h2>

                                        {rentals.filter(r => ['completed', 'cancelled'].includes(r.status)).length === 0 ? (
                                            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center text-gray-700 text-[10px] uppercase font-bold tracking-widest italic">
                                                Archive registers are empty.
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {rentals.filter(r => ['completed', 'cancelled'].includes(r.status)).map((rental) => (
                                                    <div key={rental.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center justify-between group hover:bg-white/[0.08] transition-all">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-lg bg-black border border-white/10 overflow-hidden opacity-50 contrast-125 grayscale group-hover:grayscale-0 transition-all">
                                                                <img
                                                                    src={rental.product?.image || (rental.product?.images && rental.product.images[0]) || "/images/products/ps5.png"}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-[11px] font-bold text-gray-400 group-hover:text-white transition-colors">{rental.product?.name}</h4>
                                                                <p className="text-[9px] text-gray-600 font-mono">
                                                                    {format(new Date(rental.start_date), 'MMM dd')} - {format(new Date(rental.end_date), 'MMM dd')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-[10px] font-bold text-gray-400">₹{rental.total_price.toLocaleString()}</div>
                                                            <span className="text-[8px] font-black uppercase tracking-tighter text-gray-600">{rental.status}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Service Protocols */}
                                    <div className="space-y-6">
                                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#06B6D4] flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
                                            Service Protocols
                                        </h2>

                                        {serviceBookings.length === 0 ? (
                                            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                                                No service history in database.
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {serviceBookings.map((svc) => (
                                                    <div key={svc.id} className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-[#06B6D4]/30 transition-all">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center">
                                                                <AlertCircle size={18} className="text-[#06B6D4]" />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-[11px] font-bold text-white group-hover:text-[#06B6D4] transition-colors">{svc.service_type}</h4>
                                                                <p className="text-[9px] text-gray-500 font-mono">
                                                                    {svc.console_model} • {format(new Date(svc.created_at), 'MMM dd, yyyy')}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded border ${svc.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                                svc.status === 'Cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                                    'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                                            }`}>
                                                            {svc.status}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
