import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WeeklyData {
    day: string;
    deposit: number;
    withdraw: number;
    [key: string]: string | number;
}

interface ActivityState {
    weeklyActivity: WeeklyData[];
    totalBalance: number;
    updateWeeklyActivity: (day: string, deposit: number, withdraw: number) => void;
    addToWeeklyWithdraw: (amount: number) => void;
    addToWeeklyDeposit: (amount: number) => void;
    updateBalance: (amount: number) => void;
}

export const useActivityStore = create<ActivityState>()(
    persist(
        (set) => ({
            weeklyActivity: [
                { day: "Sat", deposit: 480, withdraw: 250 },
                { day: "Sun", deposit: 350, withdraw: 130 },
                { day: "Mon", deposit: 320, withdraw: 350 },
                { day: "Tue", deposit: 480, withdraw: 250 },
                { day: "Wed", deposit: 150, withdraw: 230 },
                { day: "Thu", deposit: 400, withdraw: 280 },
                { day: "Fri", deposit: 380, withdraw: 320 },
            ],

            totalBalance: 17268,

            updateWeeklyActivity: (day, deposit, withdraw) =>
                set((state) => ({
                    weeklyActivity: state.weeklyActivity.map((d) =>
                        d.day === day ? { ...d, deposit, withdraw } : d
                    ),
                })),

            addToWeeklyWithdraw: (amount) =>
                set((state) => {
                    const today = new Date()
                        .toLocaleDateString("en-US", { weekday: "short" })
                        .substring(0, 3);

                    return {
                        weeklyActivity: state.weeklyActivity.map((d) =>
                            d.day === today
                                ? { ...d, withdraw: d.withdraw + amount }
                                : d
                        ),
                    };
                }),

            addToWeeklyDeposit: (amount) =>
                set((state) => {
                    const today = new Date()
                        .toLocaleDateString("en-US", { weekday: "short" })
                        .substring(0, 3);

                    return {
                        weeklyActivity: state.weeklyActivity.map((d) =>
                            d.day === today
                                ? { ...d, deposit: d.deposit + amount }
                                : d
                        ),
                    };
                }),

            updateBalance: (amount) =>
                set((state) => ({
                    totalBalance: state.totalBalance + amount,
                })),
        }),
        {
            name: "activity-storage",
        }
    )
);
