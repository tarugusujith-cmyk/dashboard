import MyCards from "@/components/dashboard/MyCards";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import WeeklyActivity from "@/components/dashboard/WeeklyActivity";
import ExpenseStatistics from "@/components/dashboard/ExpenseStatistics";
import QuickTransfer from "@/components/dashboard/QuickTransfer";
import BalanceHistory from "@/components/dashboard/BalanceHistory";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCardsStore } from "@/store/cardsStore";
import { useTransactionsStore } from "@/store/transactionsStore";
import { useActivityStore } from "@/store/activityStore";
import { dashboardData } from "@/data/mockData";

export default function OverviewPage() {
    usePageTitle("Dashboard");

    const cards = useCardsStore((state) => state.cards);
    const transactions = useTransactionsStore((state) => state.transactions);
    const weeklyActivity = useActivityStore((state) => state.weeklyActivity);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <MyCards cards={cards} />
                </div>
                <div>
                    <RecentTransactions transactions={transactions} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <WeeklyActivity data={weeklyActivity} />
                </div>
                <div>
                    <ExpenseStatistics data={dashboardData.expenseStats} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuickTransfer />
                <BalanceHistory data={dashboardData.balanceHistory} />
            </div>
        </div>
    );
}
