import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { siteConfig, getAllRoutes } from "@/config";
import { Icons } from "@/components/icons";

const Sidebar = ({
    onClose,
    isMobile = false,
}: {
    onClose: () => void;
    isMobile?: boolean;
}) => {
    const { pathname } = useLocation();
    const navItems = getAllRoutes();

    const isActive = (path: string) => {
        const pathArray = path.split("/");
        const pathnameArray = pathname.split("/");
        return pathnameArray[2] === pathArray[2];
    };

    const handleNavClick = () => {
        if (isMobile) {
            onClose();
        }
    };

    return (
        <motion.aside
            className="w-[280px] h-full bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            <div className="p-6 flex items-center justify-between">
                <Link
                    to="/dashboard/overview"
                    onClick={handleNavClick}
                    aria-label="Go to BankDash dashboard"
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <Icons.layout.logo />
                    <span className="text-xl font-bold text-primary-800">
                        {siteConfig.logo.text}
                    </span>
                </Link>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5 text-gray-500 dark:text-slate-400" />
                    </button>
                )}
            </div>

            <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={handleNavClick}
                        className={`flex items-center gap-3 px-8 py-3 transition-all duration-200 ${
                            isActive(item.path)
                                ? " text-primary border-l-4 border-primary"
                                : "text-text-tertiary hover:bg-gray-50 hover:text-foreground"
                        }`}
                    >
                        <item.icon isActive={isActive(item.path)} size={20} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </motion.aside>
    );
};

export default Sidebar;
