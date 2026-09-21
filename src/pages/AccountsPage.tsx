import { useState, useEffect } from "react";
import { getAccounts } from "@/mock/api";
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GridSkeleton } from "@/components/ui/Skeleton";
import { usePageTitle } from "@/hooks/usePageTitle";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import Card from "@/components/cards/Card";
import DebitCreditOverview from "@/components/accounts/DebitCreditOverview";
import InvoicesSent from "@/components/accounts/InvoicesSent";
import { useTransactionsStore } from "@/store/transactionsStore";
import { useCardsStore } from "@/store/cardsStore";
import { useActivityStore } from "@/store/activityStore";

interface Account {
    id: string;
    name: string;
    balance: number;
    type: string;
    accountNumber: string;
}

export default function AccountsPage() {
    usePageTitle("Accounts");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Account[]>([]);

    const transactions = useTransactionsStore((state) => state.transactions);
    const cards = useCardsStore((state) => state.cards);
    const weeklyActivity = useActivityStore((state) => state.weeklyActivity);
    const primaryCard = cards.find((c) => c.type === "primary") || cards[0];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getAccounts();
            setData(result);
            setLoading(false);
        };
        fetchData();
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case "checking":
                return <Wallet className="w-8 h-8" />;
            case "income":
                return <TrendingUp className="w-8 h-8" />;
            case "expense":
                return <TrendingDown className="w-8 h-8" />;
            case "savings":
                return <PiggyBank className="w-8 h-8" />;
            default:
                return <Wallet className="w-8 h-8" />;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case "checking":
                return "bg-blue-100 text-blue-600";
            case "income":
                return "bg-green-100 text-green-600";
            case "expense":
                return "bg-red-100 text-red-600";
            case "savings":
                return "bg-purple-100 text-purple-600";
            default:
                return "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300";
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-foreground">Accounts</h1>
                <GridSkeleton items={4} columns={4} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-foreground">Accounts</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.map((account) => (
                    <div
                        key={account.id}
                        className="bg-white dark:bg-slate-800 rounded-3xl p-6 hover:shadow-lg transition-shadow"
                    >
                        <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${getColor(account.type)}`}
                        >
                            {getIcon(account.type)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                            {account.name}
                        </p>
                        <p className="text-3xl font-semibold text-foreground mb-4">
                            ${account.balance.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {account.accountNumber}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentTransactions transactions={transactions.slice(0, 5)} />
                </div>
                <div>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-semibold text-foreground">
                            My Card
                        </h2>
                        <Link
                            to="/dashboard/credit-cards"
                            className="text-foreground font-semibold text-sm hover:text-secondary transition-colors flex items-center gap-1"
                        >
                            See All
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                    {primaryCard && <Card card={primaryCard} />}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <DebitCreditOverview data={weeklyActivity} />
                </div>
                <div>
                    <InvoicesSent />
                </div>
            </div>
        </div>
    );
}
