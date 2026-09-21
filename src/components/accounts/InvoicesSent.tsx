import { ShoppingBag, User, Gamepad2 } from "lucide-react";

interface Invoice {
    id: string;
    name: string;
    timeAgo: string;
    amount: number;
    icon: "apple" | "person" | "game";
}

const invoices: Invoice[] = [
    { id: "inv_1", name: "Apple Store", timeAgo: "5h ago", amount: 450, icon: "apple" },
    { id: "inv_2", name: "Michael", timeAgo: "2 days ago", amount: 160, icon: "person" },
    { id: "inv_3", name: "Playstation", timeAgo: "5 days ago", amount: 1085, icon: "game" },
    { id: "inv_4", name: "William", timeAgo: "10 days ago", amount: 90, icon: "person" },
];

const iconMap = {
    apple: ShoppingBag,
    person: User,
    game: Gamepad2,
};

const InvoicesSent: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 h-full">
            <h2 className="text-xl font-semibold text-foreground mb-5">
                Invoices Sent
            </h2>

            <div className="space-y-4">
                {invoices.map((invoice) => {
                    const Icon = iconMap[invoice.icon];
                    return (
                        <div
                            key={invoice.id}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {invoice.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {invoice.timeAgo}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm font-semibold text-foreground">
                                ${invoice.amount.toLocaleString()}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InvoicesSent;
