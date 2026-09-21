import { useEffect, useRef, useState } from "react";
import { Search, Settings, Bell, Menu, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { getRouteByPath } from "@/config";
import { useSettingsStore } from "@/store/settingsStore";

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
}

const initialNotifications: Notification[] = [
    {
        id: "notif_1",
        title: "Payment Received",
        description: "Emily Wilson sent you $780.",
        time: "5m ago",
        read: false,
    },
    {
        id: "notif_2",
        title: "Card Transaction",
        description: "Spotify Subscription charged $150.",
        time: "2h ago",
        read: false,
    },
    {
        id: "notif_3",
        title: "Security Alert",
        description: "A new device signed in to your account.",
        time: "1d ago",
        read: true,
    },
];

const Header = ({
    sidebarOpen,
    setSidebarOpen,
}: {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const theme = useSettingsStore((state) => state.settings.theme);
    const updateSettings = useSettingsStore((state) => state.updateSettings);

    const [notifications, setNotifications] = useState(initialNotifications);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const unreadCount = notifications.filter((n) => !n.read).length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notificationsRef.current &&
                !notificationsRef.current.contains(event.target as Node)
            ) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const toggleTheme = () => {
        updateSettings({ theme: theme === "dark" ? "light" : "dark" });
    };

    const getPageTitle = () => {
        const route = getRouteByPath(pathname);
        return route?.label || "Dashboard";
    };

    return (
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 md:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        <Menu className="w-5 h-5 text-gray-600 dark:text-slate-300" />
                    </button>
                    <h1 className="text-xl md:text-2xl font-semibold text-foreground">
                        {getPageTitle()}
                    </h1>
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    <div className="hidden md:flex items-center gap-2 bg-muted rounded-full px-4 py-2.5 w-64">
                        <Search className="w-4 h-4 text-text-link" />
                        <input
                            type="text"
                            placeholder="Search for something"
                            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-text-link w-full"
                        />
                    </div>

                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="p-2.5 bg-muted rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-5 h-5 text-muted-foreground" />
                        ) : (
                            <Moon className="w-5 h-5 text-muted-foreground" />
                        )}
                    </button>

                    <button
                        onClick={() => navigate("/dashboard/settings")}
                        aria-label="Open settings"
                        className="p-2.5 bg-muted rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    >
                        <Settings className="w-5 h-5 text-muted-foreground" />
                    </button>

                    <div className="relative" ref={notificationsRef}>
                        <button
                            onClick={() =>
                                setIsNotificationsOpen((prev) => !prev)
                            }
                            aria-label="Notifications"
                            className="p-2.5 bg-muted rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors relative"
                        >
                            <Bell className="w-5 h-5 text-[rgb(var(--color-notification))]" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-[rgb(var(--color-notification))] rounded-full"></span>
                            )}
                        </button>

                        {isNotificationsOpen && (
                            <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg z-50 overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                                    <h3 className="font-semibold text-foreground">
                                        Notifications
                                    </h3>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-xs font-medium text-secondary hover:underline"
                                        >
                                            Mark all as read
                                        </button>
                                    )}
                                </div>

                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <p className="px-4 py-6 text-sm text-muted-foreground text-center">
                                            No notifications yet.
                                        </p>
                                    ) : (
                                        notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`px-4 py-3 border-b border-gray-50 dark:border-slate-800 last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors ${
                                                    !notification.read
                                                        ? "bg-secondary/5"
                                                        : ""
                                                }`}
                                            >
                                                <div className="flex items-start gap-2">
                                                    {!notification.read && (
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[rgb(var(--color-notification))] shrink-0" />
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-foreground">
                                                            {notification.title}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {notification.description}
                                                        </p>
                                                        <p className="text-[11px] text-muted-foreground mt-1">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/settings")}
                        aria-label="Open profile settings"
                        className="rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/40"
                    >
                        <Avatar className="w-10 h-10 cursor-pointer ring-2 ring-offset-2 ring-secondary/20">
                            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                            <AvatarFallback>EC</AvatarFallback>
                        </Avatar>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
