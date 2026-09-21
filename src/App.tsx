import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import OverviewPage from "@/pages/OverviewPage";
import TransactionsPage from "@/pages/TransactionsPage";
import AccountsPage from "@/pages/AccountsPage";
import CreditCardsPage from "@/pages/CreditCardsPage";
import InvestmentsPage from "@/pages/InvestmentsPage";
import LoansPage from "@/pages/LoansPage";
import ServicesPage from "@/pages/ServicesPage";
import PrivilegesPage from "@/pages/PrivilegesPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Root redirects straight into the dashboard, mirroring the
          original Next.js `app/page.tsx` redirect. */}
      <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard/overview" replace />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="accounts" element={<AccountsPage />} />
        <Route path="credit-cards" element={<CreditCardsPage />} />
        <Route path="investments" element={<InvestmentsPage />} />
        <Route path="loans" element={<LoansPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="privileges" element={<PrivilegesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
