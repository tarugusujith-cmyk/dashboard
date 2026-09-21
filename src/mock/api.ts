/**
 * This project no longer runs a Next.js server, so the API routes that used
 * to live under `src/app/api/**` are reproduced here as plain async
 * functions. Each one keeps the original response shape and artificial
 * network delay so the rest of the app (loading states, skeletons, etc.)
 * behaves exactly the same as before.
 */
import {
    accountsData,
    investmentsData,
    loansData,
    privilegesData,
    servicesData,
} from "@/data/mockData";

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getStats() {
    await delay();

    return {
        totalBalance: 5756,
        weeklyActivity: [
            { day: "Sat", deposit: 480, withdraw: 220 },
            { day: "Sun", deposit: 340, withdraw: 160 },
            { day: "Mon", deposit: 320, withdraw: 250 },
            { day: "Tue", deposit: 500, withdraw: 300 },
            { day: "Wed", deposit: 260, withdraw: 210 },
            { day: "Thu", deposit: 400, withdraw: 180 },
            { day: "Fri", deposit: 370, withdraw: 240 },
        ],
        expenseBreakdown: [
            { label: "Entertainment", value: 30, color: "#fc7900" },
            { label: "Bill Expense", value: 15, color: "#ffbb38" },
            { label: "Investment", value: 20, color: "#fa00ff" },
            { label: "Others", value: 35, color: "#1814f3" },
        ],
    };
}

export async function getAccounts() {
    await delay();
    return accountsData;
}

export async function getInvestments() {
    await delay();
    return investmentsData;
}

export async function getLoans() {
    await delay();
    return loansData;
}

export async function getPrivileges() {
    await delay();
    return privilegesData;
}

export async function getServices() {
    await delay();
    return servicesData;
}
