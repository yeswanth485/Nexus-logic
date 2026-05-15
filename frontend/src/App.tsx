import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Auth/Signin";
import DemoRequest from "./pages/Auth/DemoRequest";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import OverviewDashboard from "./pages/OverviewDashboard";
import ShipmentTracking from "./pages/ShipmentTracking";
import FleetIntelligence from "./pages/FleetIntelligence";
import RouteOptimization from "./pages/RouteOptimization";
import WarehouseIntelligence from "./pages/WarehouseIntelligence";
import InventoryForecasting from "./pages/InventoryForecasting";
import RiskCenter from "./pages/RiskCenter";
import GovernmentCenter from "./pages/GovernmentCenter";
import Sustainability from "./pages/Sustainability";
import AIInsights from "./pages/AIInsights";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import AdminIntegrations from "./pages/AdminIntegrations";
import Profile from "./pages/Profile";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] text-[var(--text-primary)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-primary)]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/demo" element={<DemoRequest />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<OverviewDashboard />} />
            <Route path="tracking" element={<ShipmentTracking />} />
            <Route path="fleet" element={<FleetIntelligence />} />
            <Route path="routes" element={<RouteOptimization />} />
            <Route path="warehouse" element={<WarehouseIntelligence />} />
            <Route path="inventory" element={<InventoryForecasting />} />
            <Route path="risk" element={<RiskCenter />} />
            <Route path="government" element={<GovernmentCenter />} />
            <Route path="sustainability" element={<Sustainability />} />
            <Route path="ai-insights" element={<AIInsights />} />
            <Route path="reports" element={<ReportsAnalytics />} />
            <Route path="admin" element={<AdminIntegrations />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<div className="p-8 text-center text-[var(--text-muted)]">Page under construction</div>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
