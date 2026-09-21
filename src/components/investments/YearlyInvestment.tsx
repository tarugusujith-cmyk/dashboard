import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface YearlyInvestmentData {
    year: string;
    investment: number;
    [key: string]: string | number;
}

interface YearlyInvestmentProps {
    data: YearlyInvestmentData[];
}

const YearlyInvestment = ({ data }: YearlyInvestmentProps) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
                Yearly Total Investment
            </h2>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--color-border-200)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="year"
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
                        stroke="var(--color-warning-500)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-warning-500)", r: 5 }}
                        activeDot={{ r: 7 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default YearlyInvestment;
