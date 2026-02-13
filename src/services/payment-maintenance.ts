import { createClient } from "@/utils/supabase/client";

export interface PaymentStats {
    totalRevenue: number;
    pendingPayments: number;
    failedPayments: number;
    activeSubscriptions: number;
}

export interface RevenueTrend {
    date: string;
    amount: number;
    category: 'Rental' | 'Service' | 'Retail';
}

export const getPaymentStats = async (): Promise<PaymentStats> => {
    const supabase = createClient();

    // Mock data for development/fallback
    const MOCK_STATS = {
        totalRevenue: 1250000,
        pendingPayments: 45000,
        failedPayments: 12000,
        activeSubscriptions: 85
    };

    try {
        const { data: sales, error } = await supabase
            .from('sales')
            .select('total_amount, status');

        if (error || !sales) return MOCK_STATS;

        const totalRevenue = sales
            .filter(s => s.status === 'completed')
            .reduce((sum, s) => sum + (Number(s.total_amount) || 0), 0);

        // For other stats we assume mock behavior if DB structure isn't fully there yet for 'subscriptions'
        return {
            ...MOCK_STATS,
            totalRevenue: totalRevenue || MOCK_STATS.totalRevenue
        };
    } catch (e) {
        return MOCK_STATS;
    }
};

export const getRevenueTrend = async (): Promise<RevenueTrend[]> => {
    // Generate 30 days of mock trend data
    const trends: RevenueTrend[] = [];
    const categories: ('Rental' | 'Service' | 'Retail')[] = ['Rental', 'Service', 'Retail'];

    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        // Random daily revenue between 5k and 50k
        const amount = Math.floor(Math.random() * 45000) + 5000;
        const category = categories[Math.floor(Math.random() * categories.length)];

        trends.push({
            date: date.toISOString().split('T')[0],
            amount,
            category
        });
    }

    return trends;
};
