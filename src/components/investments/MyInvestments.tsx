interface Investment {
    id: string | number;
    name: string;
    category: string;
    icon?: string;
    color?: string;
    investmentValue: number;
    returnValue: number;
}

interface MyInvestmentsProps {
    investments: Investment[];
}

const MyInvestments = ({ investments }: MyInvestmentsProps) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-5">
                My Investment
            </h2>

            <div className="space-y-4">
                {investments.map((investment) => (
                    <div
                        key={investment.id}
                        className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        <div className="min-w-0 flex items-center gap-3 sm:gap-4">
                            <div
                                className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl flex items-center justify-center text-2xl ${
                                    investment.name === "Apple"
                                        ? "bg-pink-100"
                                        : investment.name === "Samsung"
                                          ? "bg-blue-100"
                                          : "bg-yellow-100"
                                }`}
                            >
                                {investment.icon === "apple"
                                    ? ""
                                    : investment.icon === "samsung"
                                      ? "S"
                                      : investment.icon === "tesla"
                                        ? "T"
                                        : "📊"}
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-foreground mb-1 break-words">
                                    {investment.name}
                                </p>
                                <p className="text-xs text-muted-foreground break-words">
                                    {investment.category}
                                </p>
                            </div>
                        </div>

                        <div className="text-right whitespace-nowrap">
                            <p className="font-semibold text-foreground mb-1">
                                ${investment.investmentValue.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Investment Value
                            </p>
                        </div>

                        <div className="col-span-2 sm:col-span-1 text-right whitespace-nowrap">
                            <p
                                className={`font-semibold mb-1 ${
                                    investment.returnValue > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {investment.returnValue > 0 ? "+" : ""}
                                {investment.returnValue}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Return Value
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyInvestments;
