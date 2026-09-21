import { Download } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useTransactionsStore } from "@/store/transactionsStore";
import { useCardsStore } from "@/store/cardsStore";

export default function TransactionsPage() {
    usePageTitle("Transactions");
    const transactions = useTransactionsStore((state) => state.transactions);
    const cards = useCardsStore((state) => state.cards);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-foreground">
                All Transactions
            </h1>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-slate-700">
                                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                                    Description
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                                    Transaction ID
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                                    Type
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                                    Card
                                </th>
                                <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">
                                    Date
                                </th>
                                <th className="text-right py-4 px-4 text-sm font-medium text-muted-foreground">
                                    Amount
                                </th>
                                <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground">
                                    Receipt
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => {
                                const primaryCard = cards.find(c => c.type === 'primary') || cards[0];
                                const cardNumber = primaryCard ? `**** ${primaryCard.cardNumber.slice(-4)}` : '**** 1234';

                                return (
                                    <tr
                                        key={transaction.id}
                                        className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-4 text-sm text-foreground">
                                            {transaction.title}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-foreground">
                                            #{transaction.id}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-foreground capitalize">
                                            {transaction.method}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-foreground">
                                            {cardNumber}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-muted-foreground">
                                            {transaction.date}
                                        </td>
                                        <td
                                            className={`py-4 px-4 text-sm font-semibold text-right ${
                                                transaction.amount > 0
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {transaction.amount > 0 ? "+" : ""}$
                                            {Math.abs(transaction.amount).toLocaleString()}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <button className="text-primary hover:text-primary/80">
                                                <Download className="w-5 h-5 mx-auto" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
