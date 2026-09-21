import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(
        () => typeof window !== "undefined" && window.innerWidth >= 1024
    );
    const [sidebarOpen, setSidebarOpen] = useState(
        () => typeof window !== "undefined" && window.innerWidth >= 1024
    );

    useEffect(() => {
        const checkScreenSize = () => {
            const large = window.innerWidth >= 1024;
            setIsLargeScreen((prevLarge) => {
                if (prevLarge !== large) {
                    // Crossing the breakpoint: open on desktop, close on mobile.
                    setSidebarOpen(large);
                }
                return large;
            });
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <motion.div
                animate={{
                    x: sidebarOpen ? 0 : -280,
                    opacity: sidebarOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="hidden lg:block"
                style={{ pointerEvents: sidebarOpen ? "auto" : "none" }}
            >
                <Sidebar onClose={() => setSidebarOpen(false)} isMobile={false} />
            </motion.div>

            <motion.div
                className="flex-1 flex flex-col overflow-hidden transition-all duration-200 ease-in-out"
                animate={{
                    marginLeft: isLargeScreen && sidebarOpen ? 0 : isLargeScreen ? -280 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
            >
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </motion.div>

            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden fixed inset-y-0 left-0 z-50"
                    >
                        <Sidebar onClose={() => setSidebarOpen(false)} isMobile={true} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardLayout;
