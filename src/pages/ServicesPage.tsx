import { useState, useEffect } from "react";
import { getServices } from "@/mock/api";
import { Shield, ShoppingBag, Lock } from "lucide-react";
import { GridSkeleton } from "@/components/ui/Skeleton";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useToast } from "@/hooks/use-toast";

interface Service {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
}

export default function ServicesPage() {
    usePageTitle("Services");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Service[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getServices();
            setData(result);
            setLoading(false);
        };
        fetchData();
    }, []);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "shield":
                return <Shield className="w-12 h-12" />;
            case "shopping":
                return <ShoppingBag className="w-12 h-12" />;
            case "safety":
                return <Lock className="w-12 h-12" />;
            default:
                return <Shield className="w-12 h-12" />;
        }
    };

    const handleBankServiceClick = (serviceName: string, action: string) => {
        toast({
            title: `${action} request received`,
            description: `We've started your ${serviceName.toLowerCase()} request. Our team will follow up shortly.`,
        });
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-foreground">Services</h1>
                <GridSkeleton items={3} columns={3} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-foreground">Services</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.map((service) => (
                    <div
                        key={service.id}
                        onClick={() =>
                            toast({
                                title: service.name,
                                description: service.description,
                            })
                        }
                        className="bg-white dark:bg-slate-800 rounded-3xl p-8 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <div
                            className={`w-20 h-20 rounded-full flex items-center justify-center mb-6`}
                            style={{ backgroundColor: service.color }}
                        >
                            <div className="text-primary">
                                {getIcon(service.icon)}
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            {service.name}
                        </h3>
                        <p className="text-muted-foreground">{service.description}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                    Bank Services
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-2xl">
                        <div>
                            <h4 className="font-semibold text-foreground mb-1">
                                Business Loans
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Get financing for your business
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                handleBankServiceClick(
                                    "Business Loans",
                                    "Apply"
                                )
                            }
                            className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                        >
                            Apply
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-2xl">
                        <div>
                            <h4 className="font-semibold text-foreground mb-1">
                                Checking Account
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Open a new checking account
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                handleBankServiceClick(
                                    "Checking Account",
                                    "Open"
                                )
                            }
                            className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                        >
                            Open
                        </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-2xl">
                        <div>
                            <h4 className="font-semibold text-foreground mb-1">
                                Savings Account
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Start saving with high interest rates
                            </p>
                        </div>
                        <button
                            onClick={() =>
                                handleBankServiceClick(
                                    "Savings Account",
                                    "Open"
                                )
                            }
                            className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                        >
                            Open
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
