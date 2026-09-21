import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Card } from "@/types";

interface CardsState {
    cards: Card[];
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
    addCard: (card: Omit<Card, "id">) => void;
    removeCard: (cardId: string) => void;
    updateCard: (cardId: string, updates: Partial<Card>) => void;
    updateCardBalance: (cardId: string, amount: number) => void;
    getCardById: (cardId: string) => Card | undefined;
}

export const useCardsStore = create<CardsState>()(
    persist(
        (set, get) => ({
            _hasHydrated: false,
            setHasHydrated: (state) => {
                set({
                    _hasHydrated: state,
                });
            },
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

            updateCardBalance: (cardId, amount) =>
                set((state) => ({
                    cards: state.cards.map((card) =>
                        card.id === cardId
                            ? { ...card, balance: card.balance + amount }
                            : card
                    ),
                })),

            getCardById: (cardId) => {
                return get().cards.find((card) => card.id === cardId);
            },
        }),
        {
            name: "cards-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
