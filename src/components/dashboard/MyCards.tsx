import { Card } from "@/types";
import CardSlider from "@/components/cards/CardSlider";

interface MyCardsProps {
    cards: Card[];
}

const MyCards: React.FC<MyCardsProps> = ({ cards = [] }) => {
    return (
        <CardSlider
            cards={cards}
            title="My Cards"
            showSeeAll={true}
            showAddCard={true}
            maxCards={2}
        />
    );
};

export default MyCards;
