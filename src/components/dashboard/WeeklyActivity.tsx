import { WeeklyData } from "@/types";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface WeeklyActivityProps {
    data: WeeklyData[];
}

const WeeklyActivity: React.FC<WeeklyActivityProps> = ({ data }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
                Weekly Activity
            </h2>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} barGap={8}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--color-border-200)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--color-muted-foreground-500)", fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--color-muted-foreground-500)", fontSize: 12 }}
                    />
                    <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid var(--color-border-200)",
                            borderRadius: "8px",
                            fontSize: "12px",
                        }}
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: "20px" }}
                        iconType="circle"
                        formatter={(value) => (
                            <span
                                style={{ color: "var(--color-muted-foreground-500)", fontSize: "13px" }}
                            >
                                {value}
                            </span>
                        )}
                    />
                    <Bar
                        dataKey="deposit"
                        fill="var(--color-secondary-500)"
                        radius={[10, 10, 10, 10]}
                        barSize={15}
                    />
                    <Bar
                        dataKey="withdraw"
                        fill="var(--color-accent-500)"
                        radius={[10, 10, 10, 10]}
                        barSize={15}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeeklyActivity;
