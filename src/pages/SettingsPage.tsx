import { useState } from "react";
import { User, Moon, Sun } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useSettingsStore } from "@/store/settingsStore";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
    usePageTitle("Settings");
    const settings = useSettingsStore((state) => state.settings);
    const updateSettings = useSettingsStore((state) => state.updateSettings);
    const { toast } = useToast();

    const [activeTab, setActiveTab] = useState<
        "profile" | "preferences" | "security"
    >("profile");
    const [formData, setFormData] = useState(settings);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked =
            type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : undefined;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSettings(formData);
        toast({
            title: "Settings Saved! ✅",
            description: "Your settings have been updated successfully.",
        });
    };

    const handlePasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!passwordData.currentPassword || !passwordData.newPassword) {
            toast({
                title: "Missing information",
                description: "Please fill in all password fields.",
                variant: "destructive",
            });
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "New password and confirmation must match.",
                variant: "destructive",
            });
            return;
        }

        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

        toast({
            title: "Password updated ✅",
            description: "Your password has been changed successfully.",
        });
    };

    const handleTwoFactorToggle = () => {
        const updated = {
            ...formData,
            twoFactorAuth: !formData.twoFactorAuth,
        };
        setFormData(updated);
        updateSettings(updated);
        toast({
            title: updated.twoFactorAuth
                ? "Two-Factor Authentication enabled"
                : "Two-Factor Authentication disabled",
            description: updated.twoFactorAuth
                ? "Your account now requires a second verification step."
                : "Your account no longer requires a second verification step.",
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-foreground">Settings</h1>

            <div className="flex gap-4 border-b border-gray-200 dark:border-slate-700">
                <button
                    onClick={() => setActiveTab("profile")}
                    className={`pb-4 px-4 font-medium transition-colors ${
                        activeTab === "profile"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground"
                    }`}
                >
                    Edit Profile
                </button>
                <button
                    onClick={() => setActiveTab("preferences")}
                    className={`pb-4 px-4 font-medium transition-colors ${
                        activeTab === "preferences"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground"
                    }`}
                >
                    Preferences
                </button>
                <button
                    onClick={() => setActiveTab("security")}
                    className={`pb-4 px-4 font-medium transition-colors ${
                        activeTab === "security"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground"
                    }`}
                >
                    Security
                </button>
            </div>

            {activeTab === "profile" && (
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <User className="w-12 h-12 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground mb-1">
                                {formData.profileName}
                            </h2>
                            <p className="text-muted-foreground">
                                {formData.email}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="profileName"
                                    value={formData.profileName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === "preferences" && (
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8">
                    <h2 className="text-xl font-semibold text-foreground mb-6">
                        Preferences
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Theme
                            </label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updated = {
                                            ...formData,
                                            theme: "light" as const,
                                        };
                                        setFormData(updated);
                                        updateSettings(updated);
                                    }}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                                        formData.theme === "light"
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-gray-200 dark:border-slate-700 text-muted-foreground"
                                    }`}
                                >
                                    <Sun className="w-4 h-4" />
                                    Light
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updated = {
                                            ...formData,
                                            theme: "dark" as const,
                                        };
                                        setFormData(updated);
                                        updateSettings(updated);
                                    }}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                                        formData.theme === "dark"
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-gray-200 dark:border-slate-700 text-muted-foreground"
                                    }`}
                                >
                                    <Moon className="w-4 h-4" />
                                    Dark
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Currency
                            </label>
                            <select
                                name="currency"
                                value={formData.currency}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="USD">USD - US Dollar</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="GBP">GBP - British Pound</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Language
                            </label>
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-xl">
                            <div>
                                <h4 className="font-semibold text-foreground mb-1">
                                    Notifications
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Receive email notifications
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                name="notifications"
                                checked={formData.notifications}
                                onChange={handleInputChange}
                                className="w-5 h-5"
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-xl">
                            <div>
                                <h4 className="font-semibold text-foreground mb-1">
                                    Two-Factor Authentication
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Enable 2FA for extra security
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                name="twoFactorAuth"
                                checked={formData.twoFactorAuth}
                                onChange={handleInputChange}
                                className="w-5 h-5"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                            >
                                Save Preferences
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "security" && (
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground mb-6">
                            Change Password
                        </h2>
                        <form
                            onSubmit={handlePasswordSubmit}
                            className="space-y-6 max-w-xl"
                        >
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter current password"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm new password"
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="border-t border-gray-200 dark:border-slate-700 pt-8">
                        <h2 className="text-xl font-semibold text-foreground mb-6">
                            Account Security
                        </h2>
                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-700 rounded-xl">
                            <div>
                                <h4 className="font-semibold text-foreground mb-1">
                                    Two-Factor Authentication
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {formData.twoFactorAuth
                                        ? "Enabled — your account requires a verification code at login."
                                        : "Add an extra layer of security to your account."}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleTwoFactorToggle}
                                role="switch"
                                aria-checked={formData.twoFactorAuth}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    formData.twoFactorAuth
                                        ? "bg-primary"
                                        : "bg-gray-300 dark:bg-slate-600"
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        formData.twoFactorAuth
                                            ? "translate-x-6"
                                            : "translate-x-1"
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
