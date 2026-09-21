import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { WeeklyData } from "@/types";

interface DebitCreditOverviewProps {
    data: WeeklyData[];
}

const DebitCreditOverview: React.FC<DebitCreditOverviewProps> = ({
    data,
}) => {
    const totalDebited = data.reduce((sum, d) => sum + d.withdraw, 0);
    const totalCredited = data.reduce((sum, d) => sum + d.deposit, 0);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">
                        Debit & Credit Overview
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">
                            ${totalDebited.toLocaleString()}
                        </span>{" "}
                        Debited &{" "}
                        <span className="font-semibold text-foreground">
                            ${totalCredited.toLocaleString()}
                        </span>{" "}
                        Credited in this Week
                    </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[var(--color-secondary-500)]" />
                        <span className="text-muted-foreground">Debit</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[var(--color-warning-500)]" />
                        <span className="text-muted-foreground">Credit</span>
                    </div>
                </div>
            </div>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={6}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--color-border-200)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "var(--color-muted-foreground-500)",
                                fontSize: 12,
                            }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "var(--color-muted-foreground-500)",
                                fontSize: 12,
                            }}
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
                        <Bar
                            dataKey="withdraw"
                            name="Debit"
                            fill="var(--color-secondary-500)"
                            radius={[6, 6, 0, 0]}
                            barSize={14}
                        />
                        <Bar
                            dataKey="deposit"
                            name="Credit"
                            fill="var(--color-warning-500)"
                            radius={[6, 6, 0, 0]}
                            barSize={14}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DebitCreditOverview;
