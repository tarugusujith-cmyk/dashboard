import React from "react";
import { Card } from "@/types";
import CardSlider from "./CardSlider";

interface CreditCardDisplayProps {
    cards: Card[];
}

const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({ cards = [] }) => {
    return <CardSlider cards={cards} />;
};

export default CreditCardDisplay;
