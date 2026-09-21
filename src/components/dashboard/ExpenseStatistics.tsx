import { ExpenseData } from "@/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ExpenseStatisticsProps {
    data: ExpenseData[];
}

const ExpenseStatistics: React.FC<ExpenseStatisticsProps> = ({ data = [] }) => {
    const defaultColors = ["#fc7900", "#ffbb38", "#fa00ff", "#1814f3"];

    const renderCustomLabel = (props: any) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, value, name } =
            props;
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.62;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        // Scale text down for narrower slices so labels never spill
        // outside their own wedge into a neighboring color.
        const percentFontSize = value >= 25 ? 17 : value >= 18 ? 15 : 12;
        const nameFontSize = value >= 25 ? 13 : value >= 18 ? 12 : 10;

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                className="font-semibold"
                style={{ pointerEvents: "none" }}
            >
                <tspan
                    x={x}
                    dy="-0.4em"
                    fontSize={percentFontSize}
                    fontWeight="bold"
                >
                    {value}%
                </tspan>
                <tspan x={x} dy="1.3em" fontSize={nameFontSize} fontWeight="500">
                    {name}
                </tspan>
            </text>
        );
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
                Expense Statistics
            </h2>

            <div className="w-full h-64 sm:h-72 lg:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomLabel}
                            outerRadius="80%"
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {data?.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        entry.color ||
                                        defaultColors[
                                            index % defaultColors.length
                                        ]
                                    }
                                    stroke="var(--color-card)"
                                    strokeWidth={3}
                                />
                            ))}
                        </Pie>
                       <Tooltip
    contentStyle={{
        backgroundColor: "white",
        border: "1px solid var(--color-border-200)",
        borderRadius: "8px",
        fontSize: "12px",
    }}
/>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                {data.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                        <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{
                                backgroundColor:
                                    entry.color ||
                                    defaultColors[index % defaultColors.length],
                            }}
                        />
                        <span className="text-xs text-muted-foreground truncate">
                            {entry.name}{" "}
                            <span className="text-foreground font-medium">
                                {entry.value}%
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseStatistics;
