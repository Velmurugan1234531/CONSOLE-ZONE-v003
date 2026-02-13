import { createClient } from "@/utils/supabase/client";
import { Rental } from "@/types";

export const getRentalRequests = async (showAll = false) => {
    const supabase = createClient();
    let query = supabase
        .from('rentals')
        .select(`
            *,
            user:users(full_name, email, phone, avatar_url),
            product:products(name, images)
        `);

    if (!showAll) {
        query = query.eq('status', 'Pending');
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        console.warn("Using mock rentals (Supabase unconfigured)");
        const mockData = [
            {
                id: 'demo-pending-1',
                status: 'Pending',
                total_price: 2499,
                start_date: new Date().toISOString(),
                end_date: new Date(Date.now() + 86400000 * 3).toISOString(),
                product: { name: 'PS5 Digital Mission Control', images: [] },
                user: { full_name: 'Alex "Nexus" Chen', email: 'alex@neuro.zone' },
                duration_plan: '3 Days'
            },
            {
                id: 'demo-active-1',
                status: 'active',
                total_price: 4999,
                start_date: new Date(Date.now() - 86400000 * 2).toISOString(), // Started 2 days ago
                end_date: new Date(Date.now() + 86400000 * 5).toISOString(),   // 5 days left
                product: { name: 'Xbox Series X "Black-Site"', images: [] },
                user: { full_name: 'Sarah Cyber', email: 'sarah@matrix.net' },
                duration_plan: 'Weekly'
            }
        ];
        return showAll ? mockData : mockData.filter(r => r.status === 'Pending');
    }
    return data || [];
};

export const approveRental = async (id: string) => {
    const supabase = createClient();
    if (id.startsWith('demo-')) {
        console.log(`[DEMO] Approved rental ${id}`);
        return;
    }
    const { error } = await supabase
        .from('rentals')
        .update({ status: 'active' })
        .eq('id', id);

    if (error) throw error;
};

export const rejectRental = async (id: string) => {
    const supabase = createClient();
    if (id.startsWith('demo-')) {
        console.log(`[DEMO] Rejected rental ${id}`);
        return;
    }
    const { error } = await supabase
        .from('rentals')
        .update({ status: 'cancelled' })
        .eq('id', id);

    if (error) throw error;
};
