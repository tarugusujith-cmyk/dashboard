export interface SiteConfig {
    name: string;
    shortName: string;
    description: string;
    url: string;
    logo: {
        text: string;
        icon?: string;
    };
    theme: {
        colors: {
            primary: string;
            secondary: string;
            textPrimary: string;
            textSecondary: string;
            background: string;
            white: string;
            success: string;
            error: string;
            warning: string;
        };
        borderRadius: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
    };
    features: {
        enableNotifications: boolean;
        enableDarkMode: boolean;
        enableMultiLanguage: boolean;
    };
}

export const siteConfig: SiteConfig = {
    name: "BankDash",
    shortName: "BankDash.",
    description: "Modern Banking Dashboard Application",
    url: "https://bankdash.app",
    logo: {
        text: "BankDash.",
        icon: "/assets/logo.svg",
    },
    theme: {
        colors: {
            primary: "rgb(var(--color-primary))",
            secondary: "rgb(var(--color-secondary))",
            textPrimary: "rgb(var(--color-foreground))",
            textSecondary: "rgb(var(--color-muted-foreground))",
            background: "rgb(var(--color-background))",
            white: "rgb(255 255 255)",
            success: "rgb(var(--color-accent))",
            error: "rgb(var(--color-destructive))",
            warning: "rgb(var(--color-warning))",
        },
        borderRadius: {
            sm: "0.5rem",
            md: "1rem",
            lg: "1.5rem",
            xl: "2rem",
        },
    },
    features: {
        enableNotifications: true,
        enableDarkMode: false,
        enableMultiLanguage: false,
    },
};
