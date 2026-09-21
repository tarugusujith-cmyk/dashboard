import { useState, useRef } from "react";
import { Send, ChevronRight, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useContactsStore } from "@/store/contactsStore";
import { useCardsStore } from "@/store/cardsStore";
import { useTransferMoney } from "@/store/transferStore";

const QuickTransfer: React.FC = () => {
    const contacts = useContactsStore((state) => state.contacts);
    const cards = useCardsStore((state) => state.cards);
    const { transferMoney } = useTransferMoney();

    const [amount, setAmount] = useState("525.50");
    const [selectedContact, setSelectedContact] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft =
                scrollContainerRef.current.scrollLeft +
                (direction === "right" ? scrollAmount : -scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            });
        }
    };

    const handleSend = () => {
        if (!selectedContact) {
            toast({
                title: "No Contact Selected",
                description: "Please select a contact to transfer money to.",
                variant: "destructive",
            });
            return;
        }

        const transferAmount = parseFloat(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            toast({
                title: "Invalid Amount",
                description: "Please enter a valid amount.",
                variant: "destructive",
            });
            return;
        }

        const primaryCard = cards.find((c) => c.type === "primary") || cards[0];
        if (!primaryCard) {
            toast({
                title: "No Card Available",
                description: "You need a card to transfer money.",
                variant: "destructive",
            });
            return;
        }

        const success = transferMoney(
            primaryCard.id,
            selectedContact,
            transferAmount
        );

        if (success) {
            const contact = contacts.find((c) => c.id === selectedContact);
            toast({
                title: "Transfer Successful! 🎉",
                description: `$${transferAmount.toFixed(2)} sent to ${contact?.name}`,
            });
            setAmount("0.00");
            setSelectedContact(null);
        } else {
            toast({
                title: "Transfer Failed",
                description: "Insufficient balance or invalid transfer.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
                Quick Transfer
            </h2>

            <div className="relative flex items-center gap-2 mb-6">
                <button
                    onClick={() => scroll("left")}
                    className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center hover:shadow-lg transition-shadow shrink-0 z-10"
                >
                    <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex items-center gap-4 overflow-x-auto scrollbar-hide scroll-smooth flex-1"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {contacts?.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => setSelectedContact(contact.id)}
                            className={`flex flex-col items-center gap-2 cursor-pointer transition-all shrink-0 ${
                                selectedContact === contact.id
                                    ? "opacity-100 scale-105"
                                    : "opacity-70 hover:opacity-100"
                            }`}
                        >
                            <Avatar
                                className={`w-16 h-16 ${
                                    selectedContact === contact.id
                                        ? "ring-2 ring-primary-500 ring-offset-2"
                                        : ""
                                }`}
                            >
                                <AvatarImage src={contact.avatar} />
                                <AvatarFallback>
                                    {contact.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <p className="text-sm font-medium text-foreground whitespace-nowrap">
                                    {contact.name}
                                </p>
                                <p className="text-xs text-muted-foreground whitespace-nowrap">
                                    {contact.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center hover:shadow-lg transition-shadow shrink-0 z-10"
                >
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm">Write Amount</span>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-32 bg-muted rounded-full px-4 py-2 text-foreground font-medium text-center outline-none"
                    />
                    <Button
                        onClick={handleSend}
                        className="bg-secondary text-white hover:bg-secondary/90 rounded-full px-6 gap-2"
                    >
                        Send
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuickTransfer;
