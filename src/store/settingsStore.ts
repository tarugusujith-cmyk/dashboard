import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

export interface UserSettings {
    theme: Theme;
    currency: string;
    language: string;
    notifications: boolean;
    twoFactorAuth: boolean;
    profileName: string;
    email: string;
    dateOfBirth: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

interface SettingsState {
    settings: UserSettings;
    updateSettings: (settings: Partial<UserSettings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            settings: {
                theme: "light",
                currency: "USD",
                language: "English",
                notifications: true,
                twoFactorAuth: false,
                profileName: "Eddy Cusuma",
                email: "eddy.cusuma@example.com",
                dateOfBirth: "1990-01-25",
                address: "123 Main Street",
                city: "San Jose",
                postalCode: "45962",
                country: "USA",
            },

            updateSettings: (newSettings) =>
                set((state) => ({
                    settings: { ...state.settings, ...newSettings },
                })),
        }),
        {
            name: "settings-storage",
        }
    )
);
