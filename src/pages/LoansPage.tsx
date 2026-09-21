import { useState, useEffect } from "react";
import { getLoans } from "@/mock/api";
import { DollarSign, Calendar, Percent, CreditCard } from "lucide-react";
import { GridSkeleton, CardSkeleton } from "@/components/ui/Skeleton";
import { usePageTitle } from "@/hooks/usePageTitle";

interface Loan {
    id: string;
    type: string;
    amount: number;
    loanId: string;
    leftToRepay: number;
    duration: string;
    interestRate: number;
    installment: number;
}

interface LoansData {
    activeLoans: Loan[];
    totalLoans: number;
    totalRepaid: number;
}

export default function LoansPage() {
    usePageTitle("Loans");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<LoansData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getLoans();
            setData(result as LoansData);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-foreground">Loans</h1>
                <GridSkeleton items={3} columns={3} />
                <CardSkeleton />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-foreground">Loans</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <DollarSign className="w-7 h-7 text-blue-600" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Total Loans</p>
                    <p className="text-2xl font-semibold text-foreground">
                        ${data?.totalLoans.toLocaleString()}
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <DollarSign className="w-7 h-7 text-green-600" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Total Repaid</p>
                    <p className="text-2xl font-semibold text-foreground">
                        ${data?.totalRepaid.toLocaleString()}
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <DollarSign className="w-7 h-7 text-red-600" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                        Total Outstanding
                    </p>
                    <p className="text-2xl font-semibold text-foreground">
                        $
                        {(
                            (data?.totalLoans || 0) - (data?.totalRepaid || 0)
                        ).toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                    Active Loans
                </h2>

                <div className="space-y-4">
                    {data?.activeLoans.map((loan) => (
                        <div
                            key={loan.id}
                            className="border border-gray-200 dark:border-slate-700 rounded-2xl p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-1">
                                        {loan.type}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {loan.loanId}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-semibold text-foreground">
                                        ${loan.amount.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Loan Amount
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Left to Repay
                                        </p>
                                        <p className="text-sm font-semibold text-foreground">
                                            ${loan.leftToRepay.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Duration
                                        </p>
                                        <p className="text-sm font-semibold text-foreground">
                                            {loan.duration}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                        <Percent className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Interest Rate
                                        </p>
                                        <p className="text-sm font-semibold text-foreground">
                                            {loan.interestRate}%
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Installment
                                        </p>
                                        <p className="text-sm font-semibold text-foreground">
                                            ${loan.installment.toLocaleString()}
                                            /mo
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
