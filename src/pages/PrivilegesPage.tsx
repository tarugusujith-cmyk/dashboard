import { useState, useEffect } from "react";
import { getPrivileges } from "@/mock/api";
import { Award, Gift, Star, Zap } from "lucide-react";
import { GridSkeleton } from "@/components/ui/Skeleton";
import { usePageTitle } from "@/hooks/usePageTitle";

interface Privilege {
    id: string;
    name: string;
    description: string;
    icon: string;
    status: "active" | "inactive" | "coming-soon";
    benefits: string[];
}

export default function PrivilegesPage() {
    usePageTitle("My Privileges");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Privilege[]>([]);
    const [selectedPrivilege, setSelectedPrivilege] = useState<Privilege | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getPrivileges();
            setData(result as Privilege[]);
            setLoading(false);
        };
        fetchData();
    }, []);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "award":
                return <Award className="w-12 h-12" />;
            case "gift":
                return <Gift className="w-12 h-12" />;
            case "star":
                return <Star className="w-12 h-12" />;
            case "zap":
                return <Zap className="w-12 h-12" />;
            default:
                return <Award className="w-12 h-12" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-600";
            case "inactive":
                return "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300";
            case "coming-soon":
                return "bg-blue-100 text-blue-600";
            default:
                return "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "active":
                return "Active";
            case "inactive":
                return "Inactive";
            case "coming-soon":
                return "Coming Soon";
            default:
                return "Unknown";
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-foreground">
                    My Privileges
                </h1>
                <GridSkeleton items={4} columns={2} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-foreground mb-2">
                    My Privileges
                </h1>
                <p className="text-muted-foreground">
                    Exclusive benefits and rewards for valued customers
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.map((privilege) => (
                    <div
                        key={privilege.id}
                        className="bg-white dark:bg-slate-800 rounded-3xl p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                                {getIcon(privilege.icon)}
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(privilege.status)}`}
                            >
                                {getStatusText(privilege.status)}
                            </span>
                        </div>

                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            {privilege.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            {privilege.description}
                        </p>

                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-foreground">
                                Benefits:
                            </p>
                            <ul className="space-y-1">
                                {privilege.benefits.map((benefit, index) => (
                                    <li
                                        key={index}
                                        className="text-sm text-muted-foreground flex items-start gap-2"
                                    >
                                        <span className="text-primary mt-1">
                                            •
                                        </span>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {privilege.status === "active" && (
                            <button
                                type="button"
                                onClick={() => setSelectedPrivilege(privilege)}
                                className="mt-4 w-full py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                            >
                                View Details
                            </button>
                        )}
                        {privilege.status === "inactive" && (
                            <button className="mt-4 w-full py-2 bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-slate-300 rounded-xl hover:bg-gray-300 transition-colors">
                                Activate
                            </button>
                        )}
                        {privilege.status === "coming-soon" && (
                            <button
                                disabled
                                className="mt-4 w-full py-2 bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500 rounded-xl cursor-not-allowed"
                            >
                                Coming Soon
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {selectedPrivilege && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="privilege-details-title"
                    onClick={() => setSelectedPrivilege(null)}
                >
                    <div
                        className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2
                                    id="privilege-details-title"
                                    className="text-xl font-semibold text-foreground"
                                >
                                    {selectedPrivilege.name}
                                </h2>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {selectedPrivilege.description}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedPrivilege(null)}
                                aria-label="Close privilege details"
                                className="w-9 h-9 rounded-full bg-muted text-muted-foreground hover:bg-gray-200 dark:hover:bg-slate-700"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mt-6">
                            <p className="text-sm font-semibold text-foreground">
                                Benefits
                            </p>
                            <ul className="mt-3 space-y-2">
                                {selectedPrivilege.benefits.map((benefit, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                    >
                                        <span className="text-primary mt-1">•</span>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            type="button"
                            onClick={() => setSelectedPrivilege(null)}
                            className="mt-6 w-full py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
