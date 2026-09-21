import { useState, useEffect } from "react";
import { getInvestments } from "@/mock/api";
import InvestmentStats from "@/components/investments/InvestmentStats";
import YearlyInvestment from "@/components/investments/YearlyInvestment";
import MonthlyRevenue from "@/components/investments/MonthlyRevenue";
import MyInvestments from "@/components/investments/MyInvestments";
import TrendingStocks from "@/components/investments/TrendingStocks";
import { InvestmentsSkeleton } from "@/components/ui/Skeleton";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function InvestmentsPage() {
    usePageTitle("Investments");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getInvestments();
            setData(result);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <InvestmentsSkeleton />;
    }

    return (
        <div className="space-y-6">
            <InvestmentStats stats={data?.stats || {}} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <YearlyInvestment data={data?.yearlyData || []} />
                <MonthlyRevenue data={data?.monthlyRevenue || []} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MyInvestments investments={data?.myInvestments || []} />
                <TrendingStocks stocks={data?.trendingStocks || []} />
            </div>
        </div>
    );
}
