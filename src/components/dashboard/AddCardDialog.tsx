import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useCardsStore } from "@/store/cardsStore";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function AddCardDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const addCard = useCardsStore((state) => state.addCard);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        type: "primary" as "primary" | "secondary" | "white",
        balance: 0,
        holderName: "",
        validThru: "",
        cardNumber: "",
        bank: "",
        holder: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "balance" ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.holderName || !formData.bank || !formData.cardNumber) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        addCard({
            ...formData,
            holder: formData.holderName,
        });
        toast({
            title: "Card Added Successfully! 🎉",
            description: `${formData.bank} card has been added to your account.`,
        });

        setFormData({
            type: "primary",
            balance: 0,
            holderName: "",
            validThru: "",
            cardNumber: "",
            bank: "",
            holder: "",
        });
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
                <Plus className="w-5 h-5" />
                Add New Card
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-50"
                        />

                        {/* Dialog */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold text-foreground">
                                        Add New Card
                                    </h2>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Card Type *
                                            </label>
                                            <select
                                                name="type"
                                                value={formData.type}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                            >
                                                <option value="primary">
                                                    Primary (Blue)
                                                </option>
                                                <option value="secondary">
                                                    Secondary (Black)
                                                </option>
                                                <option value="white">
                                                    White
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Initial Balance *
                                            </label>
                                            <input
                                                type="number"
                                                name="balance"
                                                value={formData.balance}
                                                onChange={handleInputChange}
                                                placeholder="0.00"
                                                step="0.01"
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Card Holder Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="holderName"
                                                value={formData.holderName}
                                                onChange={handleInputChange}
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Bank Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="bank"
                                                value={formData.bank}
                                                onChange={handleInputChange}
                                                placeholder="DBL Bank"
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Card Number *
                                            </label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                placeholder="3778 **** **** 1234"
                                                maxLength={19}
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                Valid Thru
                                            </label>
                                            <input
                                                type="text"
                                                name="validThru"
                                                value={formData.validThru}
                                                onChange={handleInputChange}
                                                placeholder="12/25"
                                                maxLength={5}
                                                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                            className="px-6 py-3 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                                        >
                                            Add Card
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
