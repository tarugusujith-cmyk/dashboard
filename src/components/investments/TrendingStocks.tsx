interface Stock {
    sl: number;
    name: string;
    price: number;
    returnValue: number;
}

interface TrendingStocksProps {
    stocks: Stock[];
}

const TrendingStocks = ({ stocks }: TrendingStocksProps) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-5">
                Trending Stock
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-slate-700">
                            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                                SL No
                            </th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                                Name
                            </th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                                Price
                            </th>
                            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                                Change%
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => (
                            <tr
                                key={stock.sl}
                                className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-4 px-2 text-sm text-foreground">
                                    {stock.sl}.
                                </td>
                                <td className="py-4 px-2 text-sm font-medium text-foreground">
                                    {stock.name}
                                </td>
                                <td className="py-4 px-2 text-sm text-foreground">
                                    ${stock.price}
                                </td>
                                <td className="py-4 px-2">
                                    <span
                                        className={`text-sm font-semibold ${
                                            stock.returnValue > 0
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {stock.returnValue > 0 ? "+" : ""}
                                        {stock.returnValue}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrendingStocks;
