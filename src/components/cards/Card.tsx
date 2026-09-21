import { motion } from "framer-motion";
import { Card as CardType } from "@/types";
import Icons from "../icons";

interface CardProps {
    card: CardType;
    index?: number;
}

const cardStyles = {
    primary: "bg-linear-to-br from-primary to-secondary",
    secondary: "bg-linear-to-br from-gray-700 to-black",
    white: "bg-linear-to-br from-white to-gray-400 border border-gray-200 dark:border-slate-700",
};

const Card: React.FC<CardProps> = ({ card, index = 0 }) => {
    const cardStyle = cardStyles[card.type] || cardStyles.white;
    const isWhiteCard = card.type === "white";
    const dashboardIcons = Icons.dashboard();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-3xl p-6 h-[235px] overflow-hidden ${cardStyle}`}
        >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p
                                className={`text-xs mb-1 ${
                                    isWhiteCard
                                        ? "text-gray-500 dark:text-slate-400"
                                        : "text-white/70"
                                }`}
                            >
                                Balance
                            </p>
                            <p
                                className={`text-xl font-semibold ${
                                    isWhiteCard
                                        ? "text-foreground"
                                        : "text-white"
                                }`}
                            >
                                ${card.balance.toLocaleString()}
                            </p>
                        </div>
                        {dashboardIcons.SimCardIcon}
                    </div>

                    <div className="flex gap-16 mb-6">
                        <div>
                            <p
                                className={`text-[10px] mb-1 uppercase ${
                                    isWhiteCard
                                        ? "text-gray-400 dark:text-slate-500"
                                        : "text-white/50"
                                }`}
                            >
                                CARD HOLDER
                            </p>
                            <p
                                className={`text-sm font-semibold ${
                                    isWhiteCard
                                        ? "text-foreground"
                                        : "text-white"
                                }`}
                            >
                                {card.holderName}
                            </p>
                        </div>
                        <div>
                            <p
                                className={`text-[10px] mb-1 uppercase ${
                                    isWhiteCard
                                        ? "text-gray-400 dark:text-slate-500"
                                        : "text-white/50"
                                }`}
                            >
                                VALID THRU
                            </p>
                            <p
                                className={`text-sm font-semibold ${
                                    isWhiteCard
                                        ? "text-foreground"
                                        : "text-white"
                                }`}
                            >
                                {card.validThru}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className={`flex items-center justify-between pt-4 border-t ${
                        isWhiteCard ? "border-gray-200 dark:border-slate-700" : "border-white/20"
                    }`}
                >
                    <p
                        className={`text-lg font-semibold tracking-wider ${
                            isWhiteCard ? "text-foreground" : "text-white"
                        }`}
                    >
                        {card.cardNumber}
                    </p>
                    <div className="flex gap-1">
                        <div
                            className={`w-7 h-7 rounded-full ${
                                isWhiteCard ? "bg-gray-300 dark:bg-slate-600" : "bg-white/30"
                            }`}
                        ></div>
                        <div
                            className={`w-7 h-7 rounded-full ${
                                isWhiteCard ? "bg-gray-300 dark:bg-slate-600" : "bg-white/30"
                            } -ml-3`}
                        ></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Card;
