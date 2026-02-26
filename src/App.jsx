import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingLayout from './layouts/LandingLayout';
import HospitalLayout from './layouts/HospitalLayout';
import DonorLayout from './layouts/DonorLayout';
import ScrollToTop from './components/ui/ScrollToTop';

// Landing
import LandingPage from './pages/LandingPage';
import DonationGuide from './pages/DonationGuide';
import SafetyProtocols from './pages/SafetyProtocols';
import HealthDataProtection from './pages/HealthDataProtection';
import HospitalsDirectory from './pages/HospitalsDirectory';

// Hospital Pages
import HospitalDashboard from './pages/HospitalDashboard';
import EmergencyRequest from './pages/EmergencyRequest';
import StockAnalytics from './pages/StockAnalytics';
import DeliveryTracking from './pages/DeliveryTracking';
import SecureHandoff from './pages/SecureHandoff';
import HospitalLogin from './pages/HospitalLogin';
import HospitalRegister from './pages/HospitalRegister';

// Donor Pages
import DonorDashboard from './pages/DonorDashboard';
import DonorRewards from './pages/DonorRewards';
import DonorEligibility from './pages/DonorEligibility';
import DonorHistory from './pages/DonorHistory';
import DonorRequests from './pages/DonorRequests';

// Auth Contexts
import { AuthProvider } from './context/AuthContext';
import { HospitalAuthProvider } from './context/HospitalAuthContext';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <HospitalAuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* ── Landing Portal ── */}
            <Route path="/" element={<LandingLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="donation-guide" element={<DonationGuide />} />
              <Route path="safety-protocols" element={<SafetyProtocols />} />
              <Route path="health-data-protection" element={<HealthDataProtection />} />
              <Route path="hospitals" element={<HospitalsDirectory />} />
            </Route>

            {/* ── Hospital Auth (standalone, no sidebar) ── */}
            <Route path="/hospital/login" element={<HospitalLogin />} />
            <Route path="/hospital/register" element={<HospitalRegister />} />

            {/* ── Hospital Portal (with sidebar) ── */}
            <Route path="/hospital" element={<HospitalLayout />}>
              <Route index element={<HospitalDashboard />} />
              <Route path="inventory" element={<HospitalDashboard />} />
              <Route path="request" element={<EmergencyRequest />} />
              <Route path="analytics" element={<StockAnalytics />} />
              <Route path="tracking" element={<DeliveryTracking />} />
              <Route path="handoff" element={<SecureHandoff />} />
              <Route path="nearby" element={<div className="p-12 text-center text-slate-400 font-bold">Nearby Hospitals Page</div>} />
              <Route path="alerts" element={<div className="p-12 text-center text-slate-400 font-bold">Emergency Alerts Page</div>} />
              <Route path="reports" element={<div className="p-12 text-center text-slate-400 font-bold">Reports Page</div>} />
            </Route>

            {/* ── Donor Portal ── */}
            <Route path="/donor" element={<DonorLayout />}>
              <Route index element={<Navigate to="/donor/dashboard" replace />} />
              <Route path="dashboard" element={<DonorDashboard />} />
              <Route path="rewards" element={<DonorRewards />} />
              <Route path="eligibility" element={<DonorEligibility />} />
              <Route path="history" element={<DonorHistory />} />
              <Route path="requests" element={<DonorRequests />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </HospitalAuthProvider>
    </AuthProvider>
  );
}

export default App;
