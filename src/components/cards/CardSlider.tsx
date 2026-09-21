import { useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Card as CardType } from "@/types";
import Card from "./Card";
import { Link } from "react-router-dom";
import AddCardDialog from "@/components/dashboard/AddCardDialog";

interface CardSliderProps {
    cards: CardType[];
    title?: string;
    showSeeAll?: boolean;
    maxCards?: number;
    showAddCard?: boolean;
}

const CardSlider: React.FC<CardSliderProps> = ({
    cards = [],
    title,
    showSeeAll = false,
    maxCards,
    showAddCard = false,
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const displayCards = maxCards ? cards.slice(0, maxCards) : cards;
    const cardsPerView = 3;
    const totalSlides = Math.ceil(displayCards.length / cardsPerView);
    const canScrollLeft = currentIndex > 0;
    const canScrollRight = currentIndex < totalSlides - 1;

    const scrollToIndex = (index: number) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.scrollWidth / displayCards.length;
            const scrollAmount = cardWidth * cardsPerView * index;
            container.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            });
            setCurrentIndex(index);
        }
    };

    const handlePrevious = () => {
        if (canScrollLeft) {
            scrollToIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (canScrollRight) {
            scrollToIndex(currentIndex + 1);
        }
    };

    return (
        <div>
            {title && (
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-semibold text-foreground">
                        {title}
                    </h2>
                    <div className="flex items-center gap-3">
                        {showAddCard && <AddCardDialog />}
                        {showSeeAll && (
                            <Link
                                to="/dashboard/credit-cards"
                                className="text-foreground font-semibold text-sm hover:text-secondary transition-colors flex items-center gap-1"
                            >
                                See All
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </div>
            )}

            <div className="relative group">
                {/* Left Arrow - Desktop only */}
                {displayCards.length > cardsPerView && canScrollLeft && (
                    <button
                        onClick={handlePrevious}
                        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Previous cards"
                    >
                        <ChevronLeft className="w-6 h-6 text-foreground" />
                    </button>
                )}

                {/* Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 md:gap-6 overflow-x-auto md:overflow-x-hidden scroll-smooth snap-x snap-mandatory md:snap-none scrollbar-hide"
                >
                    {displayCards.map((card, index) => (
                        <div
                            key={card.id}
                            className={`shrink-0 w-[75%] sm:w-[70%] md:w-[calc(50%-12px)] ${displayCards.length < 3 ? "lg:w-[calc(50%-12px)]" : "lg:w-[calc(33.333%-16px)]"} snap-start`}
                        >
                            <Card card={card} index={index} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow - Desktop only */}
                {displayCards.length > cardsPerView && canScrollRight && (
                    <button
                        onClick={handleNext}
                        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
                        aria-label="Next cards"
                    >
                        <ChevronRight className="w-6 h-6 text-foreground" />
                    </button>
                )}

                {/* Slide Indicators - Desktop only */}
                {displayCards.length > cardsPerView && (
                    <div className="hidden lg:flex justify-center gap-2 mt-6">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToIndex(index)}
                                className={`h-2 rounded-full transition-all ${
                                    index === currentIndex
                                        ? "w-8 bg-primary"
                                        : "w-2 bg-gray-300 dark:bg-slate-600 hover:bg-gray-400"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardSlider;
