import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import HomeScreen from '@/pages/HomeScreen';
import HistoryScreen from '@/pages/HistoryScreen';
import AnalyticsScreen from '@/pages/AnalyticsScreen';
import ProfileScreen from '@/pages/ProfileScreen';

type Tab = 'home' | 'history' | 'analytics' | 'profile';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'history', label: 'История', icon: 'Clock' },
  { id: 'analytics', label: 'Аналитика', icon: 'BarChart2' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen />;
      case 'history': return <HistoryScreen />;
      case 'analytics': return <AnalyticsScreen />;
      case 'profile': return <ProfileScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-golos p-4">
      {/* Контейнер мобильного телефона */}
      <div
        className="relative bg-white flex flex-col overflow-hidden"
        style={{
          width: '390px',
          minWidth: '320px',
          height: '844px',
          maxHeight: '95vh',
          borderRadius: '44px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
        }}
      >
        {/* Статус бар */}
        <div className="flex items-center justify-between px-8 pt-4 pb-2 flex-shrink-0">
          <span className="text-xs font-semibold text-beeline-black">9:41</span>
          <div className="w-28 h-6 bg-beeline-black rounded-full" />
          <div className="flex items-center gap-1">
            <div className="flex items-end gap-0.5 h-3">
              {[2, 3, 4, 4].map((h, i) => (
                <div key={i} className="w-1 bg-beeline-black rounded-sm" style={{ height: `${h * 3}px` }} />
              ))}
            </div>
            <span className="text-xs font-semibold text-beeline-black ml-1">100%</span>
          </div>
        </div>

        {/* Топ-бар */}
        <div className="flex items-center gap-2 px-5 py-2 border-b border-gray-50 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-beeline-yellow flex items-center justify-center">
              <span className="text-beeline-black font-black text-xs leading-none">B</span>
            </div>
            <span className="text-sm font-bold text-beeline-black tracking-tight">билайн</span>
          </div>
          <div className="flex-1" />
          <div className="w-8 h-8 rounded-full bg-beeline-gray flex items-center justify-center">
            <Icon name="Bell" size={16} className="text-beeline-black" />
          </div>
        </div>

        {/* Контент */}
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '88px' }}>
          <div key={activeTab} style={{ animation: 'fade-up 0.3s ease-out both' }}>
            {renderScreen()}
          </div>
        </div>

        {/* Таббар */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around px-2 pt-3"
          style={{ paddingBottom: '24px', borderRadius: '0 0 44px 44px' }}
        >
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center gap-1 px-3 py-1 rounded-2xl transition-all"
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-beeline-yellow' : 'bg-transparent'
                }`}>
                  <Icon
                    name={tab.icon}
                    size={20}
                    className={isActive ? 'text-beeline-black' : 'text-beeline-muted'}
                  />
                </div>
                <span className={`text-xs font-medium transition-all ${
                  isActive ? 'text-beeline-black font-semibold' : 'text-beeline-muted'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
