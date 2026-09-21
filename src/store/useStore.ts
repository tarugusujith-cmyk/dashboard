import { create } from "zustand";
import { persist } from "zustand/middleware";
import { faker } from "@faker-js/faker";
import { Card, Transaction, Contact } from "@/types";

interface UserSettings {
    currency: string;
    language: string;
    notifications: boolean;
    twoFactorAuth: boolean;
    profileName: string;
    email: string;
    dateOfBirth: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

interface AppState {
    cards: Card[];
    addCard: (card: Omit<Card, "id">) => void;
    removeCard: (cardId: string) => void;
    updateCard: (cardId: string, updates: Partial<Card>) => void;

    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void;

    contacts: Contact[];
    addContact: (contact: Omit<Contact, "id">) => void;
    removeContact: (contactId: string) => void;

    totalBalance: number;
    updateBalance: (amount: number) => void;

    transferMoney: (
        fromCardId: string,
        toContactId: string,
        amount: number
    ) => boolean;

    settings: UserSettings;
    updateSettings: (settings: Partial<UserSettings>) => void;

    weeklyActivity: Array<{ day: string; deposit: number; withdraw: number }>;
    updateWeeklyActivity: (
        day: string,
        deposit: number,
        withdraw: number
    ) => void;
}

const generateContacts = (count: number = 8) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `contact_${i + 1}`,
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
        avatar: faker.image.avatar(),
    }));
};

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            cards: [
                {
                    id: "card_1",
                    type: "primary",
                    balance: 5756,
                    holderName: "Eddy Cusuma",
                    validThru: "12/22",
                    cardNumber: "3778 **** **** 1234",
                    bank: "DBL Bank",
                    holder: "Eddy Cusuma",
                },
                {
                    id: "card_2",
                    type: "secondary",
                    balance: 5756,
                    holderName: "Eddy Cusuma",
                    validThru: "12/22",
                    cardNumber: "3778 **** **** 1234",
                    bank: "BRC Bank",
                    holder: "Eddy Cusuma",
                },
                {
                    id: "card_3",
                    type: "white",
                    balance: 5756,
                    holderName: "Eddy Cusuma",
                    validThru: "12/22",
                    cardNumber: "3778 **** **** 1234",
                    bank: "ABM Bank",
                    holder: "Eddy Cusuma",
                },
            ],

            addCard: (card) =>
                set((state) => ({
                    cards: [
                        ...state.cards,
                        {
                            ...card,
                            id: `card_${Date.now()}`,
                        },
                    ],
                })),

            removeCard: (cardId) =>
                set((state) => ({
                    cards: state.cards.filter((card) => card.id !== cardId),
                })),

            updateCard: (cardId, updates) =>
                set((state) => ({
                    cards: state.cards.map((card) =>
                        card.id === cardId ? { ...card, ...updates } : card
                    ),
                })),

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

            contacts: generateContacts(8),

            addContact: (contact) =>
                set((state) => ({
                    contacts: [
                        ...state.contacts,
                        {
                            ...contact,
                            id: `contact_${Date.now()}`,
                        },
                    ],
                })),

            removeContact: (contactId) =>
                set((state) => ({
                    contacts: state.contacts.filter(
                        (contact) => contact.id !== contactId
                    ),
                })),

            totalBalance: 17268,

            updateBalance: (amount) =>
                set((state) => ({
                    totalBalance: state.totalBalance + amount,
                })),

            transferMoney: (fromCardId, toContactId, amount) => {
                const state = get();
                const card = state.cards.find((c) => c.id === fromCardId);
                const contact = state.contacts.find(
                    (c) => c.id === toContactId
                );

                if (!card || !contact || card.balance < amount) {
                    return false;
                }

                set((state) => ({
                    cards: state.cards.map((c) =>
                        c.id === fromCardId
                            ? { ...c, balance: c.balance - amount }
                            : c
                    ),
                    totalBalance: state.totalBalance - amount,
                }));

                state.addTransaction({
                    type: "expense",
                    method: "money",
                    title: `Transfer to ${contact.name}`,
                    amount: -amount,
                    icon: "money",
                });

                const today = new Date()
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .substring(0, 3);
                const currentDay = state.weeklyActivity.find(
                    (d) => d.day === today
                );
                if (currentDay) {
                    set((state) => ({
                        weeklyActivity: state.weeklyActivity.map((d) =>
                            d.day === today
                                ? { ...d, withdraw: d.withdraw + amount }
                                : d
                        ),
                    }));
                }

                return true;
            },

            settings: {
                currency: "USD",
                language: "English",
                notifications: true,
                twoFactorAuth: false,
                profileName: "Eddy Cusuma",
                email: "eddy.cusuma@example.com",
                dateOfBirth: "1990-01-25",
                address: "123 Main Street",
                city: "San Jose",
                postalCode: "45962",
                country: "USA",
            },

            updateSettings: (newSettings) =>
                set((state) => ({
                    settings: { ...state.settings, ...newSettings },
                })),

            weeklyActivity: [
                { day: "Sat", deposit: 480, withdraw: 250 },
                { day: "Sun", deposit: 350, withdraw: 130 },
                { day: "Mon", deposit: 320, withdraw: 350 },
                { day: "Tue", deposit: 480, withdraw: 250 },
                { day: "Wed", deposit: 150, withdraw: 230 },
                { day: "Thu", deposit: 400, withdraw: 280 },
                { day: "Fri", deposit: 380, withdraw: 320 },
            ],

            updateWeeklyActivity: (day, deposit, withdraw) =>
                set((state) => ({
                    weeklyActivity: state.weeklyActivity.map((d) =>
                        d.day === day ? { ...d, deposit, withdraw } : d
                    ),
                })),
        }),
        {
            name: "bankdash-storage",
        }
    )
);
