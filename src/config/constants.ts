export const API_ENDPOINTS = {
    dashboard: "/api/dashboard",
    cards: "/api/cards",
    investments: "/api/investments",
    transactions: "/api/transactions",
    accounts: "/api/accounts",
    loans: "/api/loans",
    services: "/api/services",
    settings: "/api/settings",
    privileges: "/api/privileges",
} as const;

export const APP_CONSTANTS = {
    defaultLocale: "en",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    itemsPerPage: 10,
    maxFileSize: 5 * 1024 * 1024,
} as const;

export const STORAGE_KEYS = {
    theme: "bankdash_theme",
    language: "bankdash_language",
    token: "bankdash_token",
    user: "bankdash_user",
} as const;

export const ANIMATION = {
    fast: 200,
    normal: 300,
    slow: 500,
} as const;

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

export const STATUS = {
    idle: "idle",
    loading: "loading",
    success: "success",
    error: "error",
} as const;

export const TRANSACTION_TYPES = {
    income: "income",
    expense: "expense",
    transfer: "transfer",
} as const;

export const CARD_TYPES = {
    primary: "primary",
    secondary: "secondary",
    white: "white",
} as const;

export const ACCOUNT_TYPES = {
    checking: "checking",
    savings: "savings",
    income: "income",
    expense: "expense",
} as const;
