import { createClient } from "@/utils/supabase/client";
import { ServiceBooking } from "@/types";

export const createServiceBooking = async (bookingData: Partial<ServiceBooking>) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('service_bookings')
        .insert([bookingData])
        .select()
        .single();

    if (error) {
        console.error("Error creating booking:", error);
        throw error;
    }

    return data;
};

export const getUserServiceBookings = async (userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('service_bookings')
        .select('*, service:repair_services(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching user bookings:", error);
        return [];
    }

    return data;
};
