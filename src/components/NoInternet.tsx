"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NoInternet() {
    const router = useRouter();

    useEffect(() => {
        const checkConnection = () => {
            if (navigator.onLine) {
                router.push("/");
            }
        };
        window.addEventListener("online", checkConnection);
        return () => window.removeEventListener("online", checkConnection);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-600">No Internet Connection</h1>
            <p className="text-lg text-gray-700 mt-2">Please check your network and try again.</p>
        </div>
    );
}
