import CreditCardDisplay from "@/components/cards/CreditCardDisplay";
import CardExpenseStats from "@/components/cards/CardExpenseStats";
import CardList from "@/components/cards/CardList";
import AddNewCard from "@/components/cards/AddNewCard";
import CardSettings from "@/components/cards/CardSettings";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useCardsStore } from "@/store/cardsStore";
import { creditCardsData } from "@/data/mockData";

export default function CreditCardsPage() {
    usePageTitle("Credit Cards");
    const cards = useCardsStore((state) => state.cards);
    const hasHydrated = useCardsStore((state) => state._hasHydrated);

    if (!hasHydrated) {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold text-foreground mb-5">
                        My Cards
                    </h2>
                    <div className="text-muted-foreground">
                        Loading cards...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-5">
                    My Cards
                </h2>
                <CreditCardDisplay cards={cards} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CardExpenseStats data={creditCardsData.expenseStats} />
                <CardList cards={cards} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AddNewCard />
                <CardSettings />
            </div>
        </div>
    );
}
