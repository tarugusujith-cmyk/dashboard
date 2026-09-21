import { useCardsStore } from "./cardsStore";
import { useTransactionsStore } from "./transactionsStore";
import { useContactsStore } from "./contactsStore";
import { useActivityStore } from "./activityStore";

export const useTransferMoney = () => {
    const updateCardBalance = useCardsStore((state) => state.updateCardBalance);
    const getCardById = useCardsStore((state) => state.getCardById);
    const addTransaction = useTransactionsStore(
        (state) => state.addTransaction
    );
    const getContactById = useContactsStore((state) => state.getContactById);
    const addToWeeklyWithdraw = useActivityStore(
        (state) => state.addToWeeklyWithdraw
    );
    const updateBalance = useActivityStore((state) => state.updateBalance);

    const transferMoney = (
        fromCardId: string,
        toContactId: string,
        amount: number
    ): boolean => {
        const card = getCardById(fromCardId);
        const contact = getContactById(toContactId);

        if (!card || !contact || card.balance < amount) {
            return false;
        }

        updateCardBalance(fromCardId, -amount);

        updateBalance(-amount);

        addTransaction({
            type: "expense",
            method: "money",
            title: `Transfer to ${contact.name}`,
            amount: -amount,
            icon: "money",
        });

        addToWeeklyWithdraw(amount);

        return true;
    };

    return { transferMoney };
};
