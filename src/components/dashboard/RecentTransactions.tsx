import { motion } from "framer-motion";
import { Transaction } from "@/types";
import Icons from "@/components/icons";

interface RecentTransactionsProps {
    transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
    transactions = [],
}) => {
    const dashboardIcons = Icons.dashboard();

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "deposit":
                return dashboardIcons.DepositCardIcon;
            case "paypal":
                return dashboardIcons.PayPalIcon;
            case "money":
                return dashboardIcons.MoneyIcon;
            default:
                return null;
        }
    };
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 h-full">
            <h2 className="text-xl font-semibold text-foreground mb-5">
                Recent Transaction
            </h2>

            <div className="space-y-3">
                {transactions?.map((transaction, index) => (
                    <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                                    transaction.method === "card"
                                        ? "bg-yellow-100"
                                        : transaction.method === "paypal"
                                          ? "bg-blue-100"
                                          : "bg-green-100"
                                }`}
                            >
                                {getIcon(transaction.icon)}
                            </div>
                            <div>
                                <p className="font-medium text-foreground text-sm">
                                    {transaction.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {transaction.date}
                                </p>
                            </div>
                        </div>
                        <p
                            className={`font-semibold ${
                                transaction.type === "income"
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {transaction.type === "income" ? "+" : ""}
                            {transaction.amount < 0 ? "-" : ""}$
                            {Math.abs(transaction.amount)}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
