export interface Card {
    id: string;
    type: CardType;
    balance: number;
    holderName: string;
    validThru: string;
    cardNumber: string;
    bank: string;
    holder: string;
}

export type CardType = "primary" | "secondary" | "white";

export interface CardExpenseStatsData {
    name: string;
    value: number;
    color: string;
    [key: string]: any;
}
