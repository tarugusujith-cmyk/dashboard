import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction } from "@/types";

interface TransactionsState {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void;
    getRecentTransactions: (limit?: number) => Transaction[];
}

export const useTransactionsStore = create<TransactionsState>()(
    persist(
        (set, get) => ({
            transactions: [
                {
                    id: "tx_1",
                    type: "expense",
                    method: "card",
                    title: "Deposit from my Card",
                    date: "28 January 2021",
                    amount: -850,
                    icon: "deposit",
                },
                {
                    id: "tx_2",
                    type: "income",
                    method: "paypal",
                    title: "Deposit Paypal",
                    date: "25 January 2021",
                    amount: 2500,
                    icon: "paypal",
                },
                {
                    id: "tx_3",
                    type: "income",
                    method: "money",
                    title: "Jemi Wilson",
                    date: "21 January 2021",
                    amount: 5400,
                    icon: "money",
                },
            ],

            addTransaction: (transaction) =>
                set((state) => ({
                    transactions: [
                        {
                            ...transaction,
                            id: `tx_${Date.now()}`,
                            date: new Date().toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }),
                        },
                        ...state.transactions,
                    ],
                })),

            getRecentTransactions: (limit = 10) => {
                return get().transactions.slice(0, limit);
            },
        }),
        {
            name: "transactions-storage",
        }
    )
);
