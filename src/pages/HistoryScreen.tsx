import React, { useState } from 'react';
import Icon from '@/components/ui/icon';

const tabs = ['Все', 'Звонки', 'Интернет', 'SMS'];

const history = [
  { type: 'call', icon: '📞', title: 'Исходящий вызов', sub: '+7 (916) 987-65-43', time: '14:23', date: 'Сегодня', value: '5 мин', out: true },
  { type: 'data', icon: '📡', title: 'Передача данных', sub: 'Мобильный интернет', time: '13:11', date: 'Сегодня', value: '−128 МБ', out: true },
  { type: 'sms', icon: '💬', title: 'SMS', sub: '+7 (495) 100-00-00', time: '11:02', date: 'Сегодня', value: '1 SMS', out: true },
  { type: 'call', icon: '📞', title: 'Входящий вызов', sub: '+7 (926) 555-00-11', time: '09:45', date: 'Сегодня', value: '12 мин', out: false },
  { type: 'call', icon: '📞', title: 'Исходящий вызов', sub: '+7 (800) 700-06-11', time: '19:55', date: 'Вчера', value: '3 мин', out: true },
  { type: 'data', icon: '📡', title: 'Передача данных', sub: 'Мобильный интернет', time: '17:30', date: 'Вчера', value: '−512 МБ', out: true },
  { type: 'call', icon: '📞', title: 'Входящий вызов', sub: '+7 (926) 123-00-99', time: '14:12', date: 'Вчера', value: '25 мин', out: false },
  { type: 'sms', icon: '💬', title: 'SMS входящее', sub: 'Sberbank', time: '10:00', date: 'Вчера', value: '1 SMS', out: false },
];

const typeMap: Record<string, string> = { call: 'Звонки', data: 'Интернет', sms: 'SMS' };

export default function HistoryScreen() {
  const [activeTab, setActiveTab] = useState('Все');

  const filtered = activeTab === 'Все'
    ? history
    : history.filter(h => typeMap[h.type] === activeTab);

  const grouped: Record<string, typeof history> = {};
  filtered.forEach(item => {
    if (!grouped[item.date]) grouped[item.date] = [];
    grouped[item.date].push(item);
  });

  return (
    <div className="flex flex-col">
      {/* Шапка */}
      <div className="px-5 pt-5 pb-4">
        <h2 className="text-xl font-bold text-beeline-black">История</h2>
        <p className="text-sm text-beeline-muted mt-0.5">Детализация за март 2026</p>
      </div>

      {/* Табы */}
      <div className="flex gap-2 px-5 mb-5 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-beeline-black text-white'
                : 'bg-beeline-gray text-beeline-muted'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Список */}
      <div className="px-5 flex flex-col gap-6 pb-8">
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <p className="text-xs text-beeline-muted font-medium uppercase tracking-wide mb-3">{date}</p>
            <div className="flex flex-col gap-1">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    item.out ? 'bg-beeline-gray' : 'bg-yellow-50'
                  }`}>
                    <span className="text-base">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-beeline-black truncate">{item.title}</p>
                    <p className="text-xs text-beeline-muted truncate">{item.sub}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-beeline-black">{item.value}</p>
                    <p className="text-xs text-beeline-muted">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
