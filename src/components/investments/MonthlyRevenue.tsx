import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface MonthlyRevenueData {
    month: string;
    revenue: number;
    [key: string]: string | number;
}

interface MonthlyRevenueProps {
    data: MonthlyRevenueData[];
}

const MonthlyRevenue = ({ data }: MonthlyRevenueProps) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
                Monthly Revenue
            </h2>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--color-border-200)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--color-muted-foreground-500)", fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--color-muted-foreground-500)", fontSize: 12 }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid var(--color-border-200)",
                            borderRadius: "8px",
                            fontSize: "12px",
                        }}
                        formatter={(value) =>
    `$${typeof value === "number" ? value.toLocaleString() : "0"}`
}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-accent-500)"
                        strokeWidth={3}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyRevenue;
