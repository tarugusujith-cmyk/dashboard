import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { getMainRoutes } from "@/config";

export default function NotFoundPage() {
    const mainRoutes = getMainRoutes();

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 text-center">
                    {/* 404 Icon */}
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10 text-primary-500" />
                        </div>
                        <div className="text-6xl font-bold text-primary-500 mb-2">
                            404
                        </div>
                    </div>

                    {/* Error Message */}
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-3">
                        Dashboard Page Not Found
                    </h1>
                    <p className="text-gray-600 dark:text-slate-300 mb-8">
                        The dashboard page you&apos;re looking for doesn&apos;t
                        exist or has been moved.
                    </p>

                    {/* Quick Links */}
                    <div className="mb-8">
                        <h2 className="text-sm font-semibold text-gray-700 dark:text-slate-200 mb-4">
                            Quick Links
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {mainRoutes.slice(0, 4).map((route) => (
                                <Link
                                    key={route.path}
                                    to={route.path}
                                    className="p-3 bg-gray-50 dark:bg-slate-800 hover:bg-primary-50 rounded-lg transition-colors group"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <route.icon
                                            isActive={false}
                                            size={20}
                                        />
                                        <span className="text-xs font-medium text-gray-700 dark:text-slate-200 group-hover:text-primary-600">
                                            {route.label}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Primary Action */}
                    <Link
                        to="/dashboard/overview"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                    >
                        <Home className="w-5 h-5" />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
