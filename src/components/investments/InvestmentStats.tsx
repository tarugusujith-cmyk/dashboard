import { DollarSign, TrendingUp, Percent, LucideIcon } from "lucide-react";

interface InvestmentStatsProps {
    stats: {
        totalInvested: number;
        numberOfInvestments: number;
        rateOfReturn: number;
    };
}

interface StatCard {
    icon: LucideIcon;
    title: string;
    value: string;
    color: string;
    iconColor: string;
}

const InvestmentStats = ({ stats }: InvestmentStatsProps) => {
    const statCards: StatCard[] = [
        {
            icon: DollarSign,
            title: "Total Invested Amount",
            value: `$${stats.totalInvested?.toLocaleString()}`,
            color: "bg-cyan-100",
            iconColor: "text-cyan-600",
        },
        {
            icon: TrendingUp,
            title: "Number of Investments",
            value: stats.numberOfInvestments?.toLocaleString(),
            color: "bg-pink-100",
            iconColor: "text-pink-600",
        },
        {
            icon: Percent,
            title: "Rate of Return",
            value: `+${stats.rateOfReturn}%`,
            color: "bg-blue-100",
            iconColor: "text-blue-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statCards.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-3xl p-6 flex items-center gap-4"
                >
                    <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center ${stat.color}`}
                    >
                        <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">
                            {stat.title}
                        </p>
                        <p className="text-2xl font-semibold text-foreground">
                            {stat.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InvestmentStats;
