import React, { useState } from 'react';
import StarDiagram from '@/components/StarDiagram';
import Icon from '@/components/ui/icon';

const services = [
  { label: 'Мобильный секретарь', icon: '🤖', active: true, desc: 'Принимает звонки' },
  { label: 'Сохранение остатков', icon: '📦', active: true, desc: 'Переносит на месяц' },
  { label: 'Подписки', icon: '✦', active: false, desc: '3 сервиса' },
  { label: 'Роуминг', icon: '✈️', active: false, desc: 'Не подключён' },
];

export default function HomeScreen() {
  return (
    <div className="flex flex-col gap-0">
      {/* Шапка */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <div>
          <p className="text-xs text-beeline-muted font-medium tracking-wide uppercase">Ваш тариф</p>
          <h2 className="text-lg font-bold text-beeline-black leading-tight">Всё включено XL</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-beeline-yellow flex items-center justify-center">
            <span className="text-beeline-black font-black text-xs">B!</span>
          </div>
        </div>
      </div>

      {/* Номер телефона */}
      <div className="px-5 pb-4">
        <p className="text-sm text-beeline-muted">+7 (916) 123-45-67</p>
      </div>

      {/* Звезда */}
      <div
        className="flex justify-center items-center px-4 py-2"
        style={{ animation: 'fade-up 0.6s ease-out both' }}
      >
        <StarDiagram />
      </div>

      {/* Статус списания */}
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

      {/* Допуслуги */}
      <div className="px-5 mb-2">
        <p className="text-xs text-beeline-muted font-medium uppercase tracking-wide mb-3">Подключённые услуги</p>
        <div className="flex flex-col gap-2">
          {services.map((s) => (
            <div
              key={s.label}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${
                s.active
                  ? 'bg-beeline-black text-white'
                  : 'bg-beeline-gray text-beeline-muted'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{s.icon}</span>
                <div>
                  <p className={`text-sm font-semibold ${s.active ? 'text-white' : 'text-beeline-muted'}`}>
                    {s.label}
                  </p>
                  <p className={`text-xs ${s.active ? 'text-gray-400' : 'text-gray-400'}`}>{s.desc}</p>
                </div>
              </div>
              <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-all ${
                s.active ? 'bg-beeline-yellow justify-end' : 'bg-gray-300 justify-start'
              }`}>
                <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка управления тарифом */}
      <div className="px-5 pt-3 pb-6">
        <button className="w-full bg-beeline-yellow text-beeline-black font-bold py-4 rounded-2xl text-sm tracking-wide hover:brightness-95 transition-all active:scale-95">
          Управление тарифом
        </button>
      </div>
    </div>
  );
}
