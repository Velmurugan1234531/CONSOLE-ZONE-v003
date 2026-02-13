import { db } from "@/lib/firebase";
import { ServiceBooking } from "@/types";
import { collection, doc, updateDoc, getDocs, orderBy, query, deleteDoc } from "firebase/firestore";

export const getAllServiceBookings = async () => {
    if (!db) return [];

    try {
        const q = query(collection(db, "service_bookings"), orderBy("created_at", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert Firestore Timestamp to Date if needed, or keep as is for serialization
            created_at: doc.data().created_at?.toDate?.().toISOString() || new Date().toISOString()
        })) as ServiceBooking[];
    } catch (error) {
        console.error("Error fetching all bookings:", error);
        return [];
    }
};

export const updateBookingStatus = async (id: string, status: string) => {
    if (!db) return;
    try {
        const ref = doc(db, "service_bookings", id);
        await updateDoc(ref, { status });
    } catch (error) {
        console.error("Error updating booking status:", error);
        throw error;
    }
};

export const deleteBooking = async (id: string) => {
    if (!db) return;
    try {
        await deleteDoc(doc(db, "service_bookings", id));
    } catch (error) {
        console.error("Error deleting booking:", error);
        throw error;
    }
};
