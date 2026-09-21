import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface ExpenseData {
    name: string;
    value: number;
    color: string;
    [key: string]: string | number;
}

const CardExpenseStats = ({ data }: { data: ExpenseData[] }) => {
    return (
        <motion.div
            className="bg-white dark:bg-slate-800 rounded-3xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold text-foreground mb-6">
                Card Expense Statistics
            </h2>

            <div className="w-full h-48 sm:h-52">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="55%"
                            outerRadius="80%"
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <p className="text-sm font-medium text-foreground">
                            {item.name}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default CardExpenseStats;
