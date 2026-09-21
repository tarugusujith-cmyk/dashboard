import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    variant?: "default" | "card" | "text" | "circle" | "button";
    width?: string | number;
    height?: string | number;
    count?: number;
}

export function Skeleton({
    className,
    variant = "default",
    width,
    height,
    count = 1,
}: SkeletonProps) {
    const baseClasses = "animate-pulse bg-gray-200 dark:bg-slate-600 rounded";

    const variantClasses = {
        default: "rounded-lg",
        card: "rounded-3xl",
        text: "rounded h-4",
        circle: "rounded-full",
        button: "rounded-xl",
    };

    const variantClass = variantClasses[variant] || variantClasses.default;

    const style = {
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
    };

    if (count > 1) {
        return (
            <>
                {Array.from({ length: count }).map((_, index) => (
                    <div
                        key={index}
                        className={cn(baseClasses, variantClass, className)}
                        style={style}
                    />
                ))}
            </>
        );
    }

    return (
        <div
            className={cn(baseClasses, variantClass, className)}
            style={style}
        />
    );
}

export function CardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("bg-white dark:bg-slate-800 rounded-3xl p-6 space-y-4", className)}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton height={100} className="mt-4" />
        </div>
    );
}

export function TableSkeleton({
    rows = 5,
    columns = 4,
}: {
    rows?: number;
    columns?: number;
}) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6">
            <Skeleton variant="text" width="30%" className="mb-6" />
            <div className="space-y-4">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-4 items-center">
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <Skeleton
                                key={colIndex}
                                variant="text"
                                className="flex-1"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function GridSkeleton({
    items = 4,
    columns = 4,
}: {
    items?: number;
    columns?: number;
}) {
    const gridClass =
        {
            1: "grid-cols-1",
            2: "grid-cols-1 md:grid-cols-2",
            3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        }[columns] || "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

    return (
        <div className={`grid ${gridClass} gap-6`}>
            {Array.from({ length: items }).map((_, index) => (
                <CardSkeleton key={index} />
            ))}
        </div>
    );
}

export function ChartSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("bg-white dark:bg-slate-800 rounded-3xl p-6", className)}>
            <Skeleton variant="text" width="40%" className="mb-4" />
            <Skeleton height={300} />
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            {/* Cards Section */}
            <div>
                <Skeleton variant="text" width="150px" className="mb-4 h-6" />
                <GridSkeleton items={3} columns={3} />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartSkeleton />
                <ChartSkeleton />
            </div>

            {/* Table Section */}
            <TableSkeleton rows={5} />
        </div>
    );
}

export function CreditCardsSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton variant="text" width="150px" className="mb-4 h-6" />
            <GridSkeleton items={3} columns={3} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartSkeleton />
                <CardSkeleton />
            </div>
        </div>
    );
}

export function InvestmentsSkeleton() {
    return (
        <div className="space-y-6">
            <GridSkeleton items={3} columns={3} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartSkeleton />
                <ChartSkeleton />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CardSkeleton />
                <TableSkeleton rows={3} />
            </div>
        </div>
    );
}
