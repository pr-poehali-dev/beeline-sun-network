import React, { useState } from 'react';
import StarDiagram from '@/components/StarDiagram';
import Icon from '@/components/ui/icon';

// Полный список опций — соответствует ALL_MINI в StarDiagram
const ALL_OPTIONS = [
  { id: 'secretary', icon: '🤖', label: 'Мобильный секретарь', desc: 'Принимает звонки за вас' },
  { id: 'savings', icon: '📦', label: 'Сохранение остатков', desc: 'Переносит неизрасходованное' },
  { id: 'subscriptions', icon: '🎬', label: 'Подписки', desc: 'Иви, Яндекс, Литрес' },
  { id: 'roaming', icon: '✈️', label: 'Роуминг', desc: 'Звонки за рубежом' },
  { id: 'novpn', icon: '🌐', label: 'Доступ без VPN', desc: 'Зарубежные сервисы' },
  { id: 'family', icon: '👨‍👩‍👧', label: 'Семейный доступ', desc: '3 номера подключено' },
  { id: 'antivirus', icon: '🛡️', label: 'Антивирус', desc: 'Защита устройства' },
  { id: 'calls', icon: '📞', label: 'Безлимит на звонки', desc: 'Все операторы РФ' },
];

const INITIAL_ACTIVE: Record<string, boolean> = {
  secretary: true,
  savings: true,
  subscriptions: false,
  roaming: false,
  novpn: false,
  family: true,
  antivirus: false,
  calls: false,
};

export default function HomeScreen() {
  const [activeOptions, setActiveOptions] = useState<Record<string, boolean>>(INITIAL_ACTIVE);

  const toggleOption = (id: string) => {
    setActiveOptions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeCount = Object.values(activeOptions).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-0">
      {/* Шапка */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1">
        <div>
          <p className="text-xs text-beeline-muted font-medium tracking-wide uppercase">Ваш тариф</p>
          <h2 className="text-lg font-bold text-beeline-black leading-tight">Всё включено XL</h2>
        </div>
        <div className="text-right">
          <p className="text-xs text-beeline-muted">+7 (916) 123-45-67</p>
          <p className="text-xs text-beeline-muted mt-0.5">
            <span className="text-beeline-yellow font-semibold">{activeCount}</span> услуг активно
          </p>
        </div>
      </div>

      {/* Звезда */}
      <div className="flex justify-center items-center px-2 py-1">
        <StarDiagram activeOptions={activeOptions} onToggleMini={toggleOption} />
      </div>

      {/* Подсказка под звездой */}
      <p className="text-center text-xs text-beeline-muted mb-3 px-8">
        Нажмите на точку луча, чтобы включить или отключить услугу
      </p>

      {/* Следующее списание */}
      <div className="mx-5 mb-4 rounded-2xl bg-beeline-gray px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-beeline-muted">Следующее списание</p>
          <p className="text-sm font-semibold text-beeline-black">15 апреля · 590 ₽</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-beeline-muted">
          <span>17 дней</span>
          <Icon name="ChevronRight" size={14} />
        </div>
      </div>

      {/* Список опций */}
      <div className="px-5 mb-2">
        <p className="text-xs text-beeline-muted font-medium uppercase tracking-wide mb-3">Подключённые услуги</p>
        <div className="flex flex-col gap-2">
          {ALL_OPTIONS.map((opt) => {
            const isActive = !!activeOptions[opt.id];
            return (
              <button
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={`w-full flex items-center justify-between rounded-2xl px-4 py-3 text-left transition-all active:scale-98 ${
                  isActive ? 'bg-beeline-black' : 'bg-beeline-gray'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg w-7 text-center">{opt.icon}</span>
                  <div>
                    <p className={`text-sm font-semibold leading-tight ${isActive ? 'text-white' : 'text-beeline-black'}`}>
                      {opt.label}
                    </p>
                    <p className={`text-xs mt-0.5 ${isActive ? 'text-gray-400' : 'text-beeline-muted'}`}>
                      {opt.desc}
                    </p>
                  </div>
                </div>
                {/* Тогл */}
                <div className={`w-10 h-5 rounded-full flex items-center px-0.5 flex-shrink-0 transition-all duration-300 ${
                  isActive ? 'bg-beeline-yellow justify-end' : 'bg-gray-300 justify-start'
                }`}>
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Кнопка */}
      <div className="px-5 pt-3 pb-6">
        <button className="w-full bg-beeline-yellow text-beeline-black font-bold py-4 rounded-2xl text-sm tracking-wide hover:brightness-95 transition-all active:scale-95">
          Управление тарифом
        </button>
      </div>
    </div>
  );
}
