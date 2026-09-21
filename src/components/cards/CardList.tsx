import { CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/types";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const CardList = ({ cards }: { cards: Card[] }) => {
    return (
        <motion.div
            className="bg-white dark:bg-slate-800 rounded-3xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold text-foreground mb-5">
                Card List
            </h2>

            <motion.div
                className="space-y-4"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:items-center lg:flex lg:flex-row lg:items-center lg:justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        variants={item}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="flex items-center gap-4 min-w-0">
                            <div
                                className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center ${
                                    card.bank === "DBL Bank"
                                        ? "bg-blue-100"
                                        : card.bank === "BRC Bank"
                                          ? "bg-pink-100"
                                          : "bg-yellow-100"
                                }`}
                            >
                                <CreditCard
                                    className={`w-6 h-6 ${
                                        card.bank === "DBL Bank"
                                            ? "text-blue-600"
                                            : card.bank === "BRC Bank"
                                              ? "text-pink-600"
                                              : "text-yellow-600"
                                    }`}
                                />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground mb-1">
                                    Card Type
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {card.type}
                                </p>
                            </div>
                        </div>

                        <div className="text-left min-w-0">
                            <p className="text-sm font-medium text-foreground mb-1">
                                Bank
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                {card.bank}
                            </p>
                        </div>

                        <div className="text-left min-w-0">
                            <p className="text-sm font-medium text-foreground mb-1">
                                Card Number
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                {card.cardNumber}
                            </p>
                        </div>

                        <div className="text-left min-w-0">
                            <p className="text-sm font-medium text-foreground mb-1">
                                Name on Card
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                {card.holder}
                            </p>
                        </div>

                        <motion.button
                            className="text-secondary text-sm font-semibold hover:underline text-left sm:text-right lg:text-left"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Details
                        </motion.button>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default CardList;
