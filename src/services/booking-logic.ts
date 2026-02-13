import { createClient } from "@/utils/supabase/server";

export interface BookingRequest {
    category: string;
    startTime: Date;
    endTime: Date;
}

export const BookingLogic = {
    /**
     * The "Tetris Brain" - Auto-Assignment Algorithm
     * Finds an available console of the given category for the specified time range.
     * Returns the console_id if found, or null if no slot is available.
     */
    async findAvailableConsole(category: string, startTime: Date, endTime: Date): Promise<number | null> {
        const supabase = await createClient();

        // 1. Get all active consoles of the requested category
        const { data: consoles, error: consoleError } = await supabase
            .from('consoles')
            .select('console_id')
            .eq('category', category)
            .eq('status', 'ACTIVE');

        if (consoleError || !consoles || consoles.length === 0) {
            console.error(`Error fetching consoles: ${consoleError?.message || consoleError}`);
            return null;
        }

        // 2. Iterate through each console to check for overlaps
        for (const consoleItem of consoles) {
            const { count, error: overlapError } = await supabase
                .from('rentals')
                .select('*', { count: 'exact', head: true })
                .eq('console_id', consoleItem.console_id)
                .neq('status', 'cancelled')
                .neq('status', 'completed')
                .lt('start_date', endTime.toISOString())
                .gt('end_date', startTime.toISOString());

            if (overlapError) {
                console.error(`Error checking overlap for console ${consoleItem.console_id}: ${overlapError.message || overlapError}`);
                continue;
            }

            // If count is 0, this console has no overlapping bookings
            if (count === 0) {
                return consoleItem.console_id;
            }
        }

        return null; // No available console found
    },

    /**
     * Get availability for a whole month (Calendar View)
     * Returns: { date: '2026-02-01', status: 'AVAILABLE' | 'FULL' }[]
     */
    async getAvailabilityForMonth(category: string, year: number, month: number) {
        const supabase = await createClient();

        // 1. Get total active consoles count
        const { count: totalConsoles, error: countError } = await supabase
            .from('consoles')
            .select('*', { count: 'exact', head: true })
            .eq('category', category)
            .eq('status', 'ACTIVE');

        if (countError || totalConsoles === null) return [];

        // 2. Get all bookings for this month
        const startDate = new Date(year, month - 1, 1).toISOString();
        const endDate = new Date(year, month, 0).toISOString(); // Last day of month

        const { data: bookings } = await supabase
            .from('rentals')
            .select('start_date, end_date')
            .neq('status', 'cancelled')
            .neq('status', 'completed')
            // Bookings that overlap with this month
            .lt('start_date', endDate)
            .gt('end_date', startDate);

        // 3. Calculate daily status
        const daysInMonth = new Date(year, month, 0).getDate();
        const results = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const currentDayStart = new Date(year, month - 1, day);
            const currentDayEnd = new Date(year, month - 1, day, 23, 59, 59);

            // Count overlaps for this day
            // Simplified: If total distinct bookings on this day >= totalConsoles, it's FULL.
            // But real logic is: At any POINT in the day, do we have 0 slots?
            // "Rolling Booking" makes this complex.
            // Approximation: If simultaneous bookings > totalConsoles.
            // For now: Check if we have (Total Consoles - Booked Consoles) > 0.

            // Simplified check: How many consoles are booked for the FULL duration of this day?
            // Or just check if *any* console is free.

            // Let's use a simpler heuristic for the Calendar View:
            // If (bookings overlapping this day) >= totalConsoles, mark as WARNING/FULL.

            let bookedCount = 0;
            if (bookings) {
                // Filter bookings that overlap with this specific day
                const dayBookings = bookings.filter((b: any) => {
                    const bStart = new Date(b.start_date);
                    const bEnd = new Date(b.end_date);
                    return bStart < currentDayEnd && bEnd > currentDayStart;
                });

                // Count unique bookings? No, concurrent bookings.
                // Worst-case concurrency check is O(N^2) or sorting.
                // Minimal check: Max Overlap
                bookedCount = dayBookings.length; // Very rough
            }

            const status = bookedCount >= totalConsoles ? 'FULL' : 'AVAILABLE';

            results.push({
                date: currentDayStart.toISOString().split('T')[0],
                status
            });
        }

        return results;
    },

    /**
     * Validate current user constraints for booking
     */
    async validateUserConstraints(userId: string) {
        // Bypass for demo users or if Supabase is missing
        const isDemo = userId.startsWith('demo-') || userId === 'demo-user-123';
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const isConfigured = !!supabaseUrl && supabaseUrl.startsWith('http');

        if (!isConfigured || isDemo) {
            console.warn(`[BOOKING] Bypassing validation for ${isDemo ? 'DEMO user' : 'UNCONFIGURED Supabase'}`);
            return {
                isVerified: true, // Allow booking in demo mode
                canPickup: true,
                isFirstTime: false
            };
        }

        const supabase = await createClient();
        const { data: user, error } = await supabase
            .from('users')
            .select('kyc_status, total_bookings')
            .eq('id', userId)
            .maybeSingle();

        if (error) {
            console.error(`User validation DB error for ${userId}: ${error.message}`);
            throw new Error("User validation failed due to system error");
        }

        if (!user) {
            console.warn(`User ${userId} not found in Supabase. Treating as unverified.`);
            return {
                isVerified: false,
                canPickup: false,
                isFirstTime: true
            };
        }

        return {
            isVerified: user.kyc_status === 'APPROVED',
            canPickup: (user.total_bookings || 0) > 0 && user.kyc_status === 'APPROVED',
            isFirstTime: (user.total_bookings || 0) === 0
        };
    },

    /**
     * Mock Console Search for Demo Mode
     */
    async mockFindAvailableConsole(category: string): Promise<number> {
        // Return a fixed ID for demo consoles
        return category.toLowerCase().includes('ps5') ? 101 : 102;
    }
};
