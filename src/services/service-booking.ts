import { db } from "@/lib/firebase";
import { ServiceBooking } from "@/types";
import { collection, addDoc, Timestamp, query, where, getDocs, orderBy } from "firebase/firestore";

export const createServiceBooking = async (bookingData: Partial<ServiceBooking>) => {
    if (!db) throw new Error("Firebase Firestore not initialized");

    try {
        const payload = {
            ...bookingData,
            created_at: Timestamp.now(), // Use Firestore Timestamp
            status: bookingData.status || 'Pending'
        };

        const docRef = await addDoc(collection(db, "service_bookings"), payload);
        console.log("Booking created with ID:", docRef.id);
        return { id: docRef.id, ...payload };
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

export const getUserServiceBookings = async (userId: string) => {
    // Demo Mode Support
    if (userId === 'demo-user-123') {
        const { DEMO_SERVICE_BOOKINGS } = await import("@/constants/demo-stock");
        return DEMO_SERVICE_BOOKINGS || [];
    }

    if (!db) return [];

    try {
        const q = query(
            collection(db, "service_bookings"),
            where("user_id", "==", userId),
            orderBy("created_at", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        return [];
    }
};
