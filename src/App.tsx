import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { HomeScreen } from './pages/HomeScreen';
import { OpportunitiesScreen } from './pages/OpportunitiesScreen';
import { OpportunityDetailScreen } from './pages/OpportunityDetailScreen';

import { WorkshopDetailScreen } from './pages/WorkshopDetailScreen';
import { ActivityScreen } from './pages/ActivityScreen';
import { CertificatesScreen } from './pages/CertificatesScreen';
import { CertificateDetailScreen } from './pages/CertificateDetailScreen';
import { VerifyCertificateScreen } from './pages/VerifyCertificateScreen';
import { NgoDashboardScreen } from './pages/NgoDashboardScreen';
import { TechTeamAdminScreen } from './pages/TechTeamAdminScreen';
import { AuthScreen } from './pages/AuthScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { LeaderboardScreen } from './pages/LeaderboardScreen';
import { AddOpportunityScreen } from './pages/AddOpportunityScreen';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="opportunities" element={<OpportunitiesScreen />} />
          <Route path="opportunities/new" element={<AddOpportunityScreen />} />
          <Route path="opportunities/:id" element={<OpportunityDetailScreen />} />
          <Route path="ngo/opportunities/new" element={<AddOpportunityScreen />} />
          <Route path="workshops" element={<Navigate to="/opportunities?type=learning" replace />} />
          <Route path="workshops/:id" element={<WorkshopDetailScreen />} />
          <Route path="leaderboard" element={<LeaderboardScreen />} />
          <Route path="activity" element={<ActivityScreen />} />
          <Route path="certificates" element={<CertificatesScreen />} />
          <Route path="certificates/:id" element={<CertificateDetailScreen />} />
          <Route path="verify" element={<VerifyCertificateScreen />} />
          <Route path="ngo/dashboard" element={<NgoDashboardScreen />} />
          <Route path="admin" element={<Navigate to="/admin/ngos" replace />} />
          <Route path="admin/ngos" element={<TechTeamAdminScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="auth" element={<AuthScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
