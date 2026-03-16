import React from 'react';
import Icon from '@/components/ui/icon';

const menuItems = [
  { icon: '📋', label: 'Мой тариф', sub: 'Всё включено XL · 590 ₽/мес' },
  { icon: '💳', label: 'Способ оплаты', sub: 'Visa •••• 4242' },
  { icon: '🔔', label: 'Уведомления', sub: 'Включены' },
  { icon: '🛡️', label: 'Безопасность', sub: 'PIN, Touch ID' },
  { icon: '📞', label: 'Поддержка', sub: '8-800-700-06-11 · бесплатно' },
];

export default function ProfileScreen() {
  return (
    <div className="flex flex-col pb-8">
      {/* Шапка профиля */}
      <div className="bg-beeline-black px-5 pt-10 pb-8 rounded-b-3xl mb-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-beeline-yellow flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-black text-beeline-black">АИ</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Иванов Алексей</h2>
            <p className="text-sm text-gray-400">+7 (916) 123-45-67</p>
            <div className="mt-1 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-beeline-yellow animate-dot-pulse" />
              <span className="text-xs text-beeline-yellow font-medium">Активен</span>
            </div>
          </div>
        </div>

        {/* Бонусные баллы */}
        <div className="mt-6 bg-white/10 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Бонусные баллы</p>
            <p className="text-2xl font-black text-beeline-yellow">1 248</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-0.5">Статус</p>
            <div className="flex items-center gap-1">
              <span className="text-yellow-300">✦</span>
              <p className="text-sm font-bold text-white">Билайн PRO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Меню */}
      <div className="px-5 flex flex-col gap-2">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-3 bg-beeline-gray rounded-2xl px-4 py-3.5 text-left hover:bg-gray-100 transition-all active:scale-98"
          >
            <span className="text-xl w-8 text-center">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-beeline-black">{item.label}</p>
              <p className="text-xs text-beeline-muted truncate">{item.sub}</p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-beeline-muted flex-shrink-0" />
          </button>
        ))}
      </div>

      {/* Версия */}
      <div className="px-5 mt-8 flex items-center justify-between">
        <p className="text-xs text-beeline-muted">Версия приложения</p>
        <p className="text-xs text-beeline-muted">6.4.1 (2026)</p>
      </div>

      {/* Выход */}
      <div className="px-5 mt-4">
        <button className="w-full bg-white border border-gray-200 text-beeline-muted font-semibold py-4 rounded-2xl text-sm hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
