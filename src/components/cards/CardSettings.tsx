import { useToast } from "@/hooks/use-toast";
import { CreditCard, Lock, Smartphone, Apple, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
};

const CardSettings = () => {
    const { toast } = useToast();

    const settings = [
        {
            icon: CreditCard,
            title: "Block Card",
            description: "Instantly block your card",
            color: "bg-yellow-100",
            iconColor: "text-yellow-600",
        },
        {
            icon: Lock,
            title: "Change Pin Code",
            description: "Choose another pin code",
            color: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            icon: Smartphone,
            title: "Add to Google Pay",
            description: "Withdraw without any card",
            color: "bg-pink-100",
            iconColor: "text-pink-600",
        },
        {
            icon: Apple,
            title: "Add to Apple Pay",
            description: "Withdraw without any card",
            color: "bg-cyan-100",
            iconColor: "text-cyan-600",
        },
        {
            icon: ShoppingBag,
            title: "Add to Apple Store",
            description: "Withdraw without any card",
            color: "bg-cyan-100",
            iconColor: "text-cyan-600",
        },
    ];

    const handleClick = () => {
        toast({
            title: "🚧 This feature isn't implemented yet!",
        });
    };

    return (
        <motion.div
            className="bg-white dark:bg-slate-800 rounded-3xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold text-foreground mb-5">
                Card Setting
            </h2>

            <motion.div
                className="space-y-3"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {settings.map((setting, index) => (
                    <motion.div
                        key={index}
                        onClick={() => handleClick()}
                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
                        variants={item}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center ${setting.color}`}
                        >
                            <setting.icon
                                className={`w-6 h-6 ${setting.iconColor}`}
                            />
                        </div>
                        <div>
                            <p className="font-medium text-foreground">
                                {setting.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {setting.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default CardSettings;
