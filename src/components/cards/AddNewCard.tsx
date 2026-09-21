import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCardsStore } from "@/store/cardsStore";

const AddNewCard = () => {
    const { toast } = useToast();
    const addCard = useCardsStore((state) => state.addCard);

    const [formData, setFormData] = useState({
        type: "primary" as "primary" | "secondary" | "white",
        holderName: "",
        cardNumber: "",
        validThru: "",
        bank: "",
        balance: 0,
    });

    const handleInputChange = (field: string, value: string) => {
        let formattedValue = value;

        if (field === "holderName") {
            formattedValue = value
                .split(" ")
                .map(
                    (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                )
                .join(" ");
        }

        if (field === "cardNumber") {
            const cleanValue = value.replace(/\s/g, "");
            if (/^\d*$/.test(cleanValue) && cleanValue.length <= 16) {
                formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, "$1 ");
            } else {
                return;
            }
        }

        if (field === "validThru") {
            const cleanValue = value.replace(/\D/g, "");
            if (cleanValue.length <= 4) {
                if (cleanValue.length >= 2) {
                    formattedValue =
                        cleanValue.slice(0, 2) + "/" + cleanValue.slice(2);
                } else {
                    formattedValue = cleanValue;
                }
            } else {
                return;
            }
        }

        setFormData((prev) => ({
            ...prev,
            [field]: formattedValue,
        }));
    };

    const handleAddCard = () => {
        if (
            !formData.holderName ||
            !formData.cardNumber ||
            !formData.validThru
        ) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const cleanCardNumber = formData.cardNumber.replace(/\s/g, "");
        if (cleanCardNumber.length !== 16 || !/^\d+$/.test(cleanCardNumber)) {
            toast({
                title: "Invalid Card Number",
                description: "Card number must be 16 digits.",
                variant: "destructive",
            });
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(formData.validThru)) {
            toast({
                title: "Invalid Expiration Date",
                description: "Please use MM/YY format (e.g., 12/25).",
                variant: "destructive",
            });
            return;
        }

        const month = parseInt(formData.validThru.slice(0, 2));
        if (month < 1 || month > 12) {
            toast({
                title: "Invalid Month",
                description: "Month must be between 01 and 12.",
                variant: "destructive",
            });
            return;
        }

        addCard({
            type: formData.type,
            balance: formData.balance,
            holderName: formData.holderName,
            validThru: formData.validThru,
            cardNumber: formData.cardNumber,
            bank: formData.bank || "My Bank",
            holder: formData.holderName,
        });

        toast({
            title: "Card Added Successfully! 🎉",
            description: `${formData.holderName}'s card has been added to your account.`,
        });

        setFormData({
            type: "primary",
            holderName: "",
            cardNumber: "",
            validThru: "",
            bank: "",
            balance: 0,
        });
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
                Add New Card
            </h2>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Credit Card generally means a plastic card issued by Scheduled
                Commercial Banks assigned to a Cardholder, with a credit limit,
                that can be used to purchase goods and services on credit or
                obtain cash advances.
            </p>

            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-foreground mb-2 block">
                            Bank Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Chase Bank"
                            value={formData.bank}
                            onChange={(e) =>
                                handleInputChange("bank", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:border-secondary transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-foreground mb-2 block">
                            Name On Card <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.holderName}
                            onChange={(e) =>
                                handleInputChange("holderName", e.target.value)
                            }
                            className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:border-secondary transition-colors"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-foreground mb-2 block">
                            Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) =>
                                handleInputChange("cardNumber", e.target.value)
                            }
                            maxLength={19}
                            className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:border-secondary transition-colors font-mono"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm text-foreground mb-2 block">
                            Expiration Date{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            value={formData.validThru}
                            onChange={(e) =>
                                handleInputChange("validThru", e.target.value)
                            }
                            maxLength={5}
                            className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:border-secondary transition-colors font-mono"
                            required
                        />
                    </div>
                </div>

                <Button
                    onClick={handleAddCard}
                    className="w-full sm:w-auto sm:px-10 bg-secondary text-white hover:bg-secondary/90 rounded-xl py-6 text-base font-semibold"
                >
                    Add Card
                </Button>
            </div>
        </div>
    );
};

export default AddNewCard;
