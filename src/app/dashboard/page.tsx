"use client"
import Dashboard from "@/Components/Dahboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated");

        if (authStatus !== "true") {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div>
                <Dashboard />
        </div>
    );
};

export default page;
