import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserCareerProvider } from './context/UserCareerContext';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Pages
import LandingPage from './pages/LandingPage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import DashboardPage from './pages/DashboardPage';
import AssessmentPage from './pages/AssessmentPage';
import RecommendationsPage from './pages/RecommendationsPage';
import SkillGapPage from './pages/SkillGapPage';
import RoadmapPage from './pages/RoadmapPage';
import CoursesCollegesPage from './pages/CoursesCollegesPage';
import JobsInternshipsPage from './pages/JobsInternshipsPage';
import ProgressPage from './pages/ProgressPage';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const { isAuthenticated } = useAuth();

  // Top-level screen state: 'landing' | 'login' | 'signup' | 'dashboard'
  const [screen, setScreen] = useState('landing');

  // Dashboard internal active view: 'overview' | 'assessment' | 'recommendations' | 'skill-gap' | 'roadmap' | 'courses' | 'jobs' | 'progress' | 'profile'
  const [activeDashboardView, setActiveDashboardView] = useState('overview');

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Navigation handlers
  const handleNavigate = (targetScreen, targetView = 'overview') => {
    setScreen(targetScreen);
    if (targetView) {
      setActiveDashboardView(targetView);
    }
  };

  const handleStartAssessment = () => {
    setScreen('dashboard');
    setActiveDashboardView('assessment');
  };

  const handleExploreCareers = () => {
    setScreen('dashboard');
    setActiveDashboardView('recommendations');
  };

  const handleFinishAssessment = () => {
    setScreen('dashboard');
    setActiveDashboardView('recommendations');
  };

  const handleSelectCareerAndRoadmap = () => {
    setScreen('dashboard');
    setActiveDashboardView('skill-gap');
  };

  // Render Screens
  if (screen === 'landing') {
    return (
      <LandingPage
        onStartAssessment={handleStartAssessment}
        onExploreCareers={handleExploreCareers}
        onNavigate={handleNavigate}
      />
    );
  }

  if (screen === 'login') {
    return (
      <LoginPage
        onNavigate={handleNavigate}
        onSuccessRedirect={() => handleNavigate('dashboard', 'overview')}
      />
    );
  }

  if (screen === 'signup') {
    return (
      <RegisterPage
        onNavigate={handleNavigate}
        onSuccessRedirect={() => handleNavigate('dashboard', 'overview')}
      />
    );
  }

  // Dashboard View Container
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar */}
      <Sidebar
        activeView={activeDashboardView}
        setActiveView={setActiveDashboardView}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onGoHome={() => setScreen('landing')}
      />

      {/* Main Content Workspace Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Header
          activeView={activeDashboardView}
          setIsMobileOpen={setIsMobileOpen}
          onNavigateTab={(view) => setActiveDashboardView(view)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeDashboardView === 'overview' && (
            <DashboardPage onNavigateTab={(view) => setActiveDashboardView(view)} />
          )}

          {activeDashboardView === 'assessment' && (
            <AssessmentPage onFinishAssessment={handleFinishAssessment} />
          )}

          {activeDashboardView === 'recommendations' && (
            <RecommendationsPage onSelectCareerAndRoadmap={handleSelectCareerAndRoadmap} />
          )}

          {activeDashboardView === 'skill-gap' && (
            <SkillGapPage onNavigateRoadmap={() => setActiveDashboardView('roadmap')} />
          )}

          {activeDashboardView === 'roadmap' && (
            <RoadmapPage />
          )}

          {activeDashboardView === 'courses' && (
            <CoursesCollegesPage />
          )}

          {activeDashboardView === 'jobs' && (
            <JobsInternshipsPage />
          )}

          {activeDashboardView === 'progress' && (
            <ProgressPage onNavigateTab={(view) => setActiveDashboardView(view)} />
          )}

          {activeDashboardView === 'profile' && (
            <ProfilePage />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <UserCareerProvider>
        <AppContent />
      </UserCareerProvider>
    </AuthProvider>
  );
}
