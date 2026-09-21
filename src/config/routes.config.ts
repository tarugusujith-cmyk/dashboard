import Icons from "@/components/icons";
import React from "react";

type IconComponent = (props: {
    isActive: boolean;
    size?: number;
}) => React.ReactElement;

const sidebarIcons = Icons.layout?.sidebar();

export interface RouteConfig {
    path: string;
    label: string;
    icon: IconComponent;
    description?: string;
    enabled?: boolean;
    badge?: string;
    children?: RouteConfig[];
}

export interface RoutesConfig {
    main: RouteConfig[];
    settings: RouteConfig[];
    public: RouteConfig[];
}

export const routesConfig: RoutesConfig = {
    main: [
        {
            path: "/dashboard/overview",
            label: "Overview",
            icon: sidebarIcons?.HomeIcon,
            description: "Overview of your banking activities",
            enabled: true,
        },
        {
            path: "/dashboard/transactions",
            label: "Transactions",
            icon: sidebarIcons?.TransactionsIcon,
            description: "View all your transactions",
            enabled: true,
        },
        {
            path: "/dashboard/accounts",
            label: "Accounts",
            icon: sidebarIcons?.AccountsIcon,
            description: "Manage your accounts",
            enabled: true,
        },
        {
            path: "/dashboard/investments",
            label: "Investments",
            icon: sidebarIcons?.InvestmentsIcon,
            description: "Track your investments",
            enabled: true,
        },
        {
            path: "/dashboard/credit-cards",
            label: "Credit Cards",
            icon: sidebarIcons?.CreditCardsIcon,
            description: "Manage your credit cards",
            enabled: true,
        },
        {
            path: "/dashboard/loans",
            label: "Loans",
            icon: sidebarIcons?.LoanIcon,
            description: "View and manage loans",
            enabled: true,
        },
        {
            path: "/dashboard/services",
            label: "Services",
            icon: sidebarIcons?.ServicesIcon,
            description: "Banking services",
            enabled: true,
        },
        {
            path: "/dashboard/privileges",
            label: "My Privileges",
            icon: sidebarIcons?.PrivilegesIcon,
            description: "Your special privileges",
            enabled: true,
        },
    ],
    settings: [
        {
            path: "/dashboard/settings",
            label: "Setting",
            icon: sidebarIcons?.SettingsIcon,
            description: "Account settings",
            enabled: true,
        },
    ],
    public: [],
};

// Helper functions
export const getAllRoutes = (): RouteConfig[] => {
    return [...routesConfig.main, ...routesConfig.settings];
};

export const getEnabledRoutes = (): RouteConfig[] => {
    return getAllRoutes().filter((route) => route.enabled !== false);
};

export const getRouteByPath = (path: string): RouteConfig | undefined => {
    return getAllRoutes().find((route) => route.path === path);
};

export const getMainRoutes = (): RouteConfig[] => {
    return routesConfig.main.filter((route) => route.enabled !== false);
};

export const getSettingsRoutes = (): RouteConfig[] => {
    return routesConfig.settings.filter((route) => route.enabled !== false);
};
