import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { OverviewView } from './components/OverviewView';
import { CaseWorkspaceView } from './components/CaseWorkspaceView';
import { ServiceDirectoryView } from './components/ServiceDirectoryView';
import { KnowledgeSourcesView } from './components/KnowledgeSourcesView';
import { EvaluationLabView } from './components/EvaluationLabView';
import { SettingsView } from './components/SettingsView';

export function App() {
  const [currentView, setCurrentView] = useState('overview');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [workspaceInitialQuery, setWorkspaceInitialQuery] = useState('');
  const [directoryDomain, setDirectoryDomain] = useState('all');

  const handleGlobalSearch = (query: string) => {
    setWorkspaceInitialQuery(query);
    setCurrentView('workspace');
  };

  const handleNavigateToWorkspace = (initialQuery?: string) => {
    if (initialQuery) {
      setWorkspaceInitialQuery(initialQuery);
    }
    setCurrentView('workspace');
  };

  const handleNavigateToDirectory = (domain?: string) => {
    if (domain) {
      setDirectoryDomain(domain);
    } else {
      setDirectoryDomain('all');
    }
    setCurrentView('directory');
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F5] font-sans text-[#111827]">
      {/* 1. Left Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={(view) => setCurrentView(view)}
      />

      {/* 2. Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <TopHeader
          onSearch={handleGlobalSearch}
          selectedLanguage={selectedLanguage}
          onLanguageChange={(lang) => setSelectedLanguage(lang)}
        />

        {/* Dynamic Main View */}
        <main className="flex-1 pb-12">
          {currentView === 'overview' && (
            <OverviewView
              onNavigateToWorkspace={handleNavigateToWorkspace}
              onNavigateToDirectory={handleNavigateToDirectory}
              onNavigateToKnowledge={() => setCurrentView('knowledge')}
              onNavigateToEvaluation={() => setCurrentView('evaluation')}
              selectedLanguage={selectedLanguage}
            />
          )}

          {currentView === 'workspace' && (
            <CaseWorkspaceView
              initialQuery={workspaceInitialQuery}
              selectedLanguage={selectedLanguage}
            />
          )}

          {currentView === 'directory' && (
            <ServiceDirectoryView
              initialDomain={directoryDomain}
              onNavigateToWorkspace={handleNavigateToWorkspace}
            />
          )}

          {currentView === 'knowledge' && (
            <KnowledgeSourcesView />
          )}

          {currentView === 'evaluation' && (
            <EvaluationLabView />
          )}

          {currentView === 'settings' && (
            <SettingsView
              selectedLanguage={selectedLanguage}
              onLanguageChange={(lang) => setSelectedLanguage(lang)}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
