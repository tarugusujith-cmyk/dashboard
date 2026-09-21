export interface Transaction {
    id: string;
    type: "income" | "expense";
    method: "card" | "paypal" | "money";
    title: string;
    date: string;
    amount: number;
    icon: string;
}

export interface BalanceData {
    month: string;
    balance: number;
    [key: string]: string | number;
}

export interface Contact {
    id: string;
    name: string;
    role: string;
    avatar?: string;
}

export interface ExpenseData {
    name: string;
    value: number;
    color: string;
    [key: string]: any;
}

export interface WeeklyData {
    day: string;
    deposit: number;
    withdraw: number;
    [key: string]: string | number;
}
