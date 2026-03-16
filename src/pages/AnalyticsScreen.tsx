import React, { useState } from 'react';

const weeks = ['Нед 1', 'Нед 2', 'Нед 3', 'Нед 4'];

const dataUsage = [
  { week: 'Нед 1', gb: 6.2 },
  { week: 'Нед 2', gb: 8.9 },
  { week: 'Нед 3', gb: 5.1 },
  { week: 'Нед 4', gb: 12.4 },
];

const callStats = [
  { week: 'Нед 1', min: 45 },
  { week: 'Нед 2', min: 120 },
  { week: 'Нед 3', min: 80 },
  { week: 'Нед 4', min: 95 },
];

const MAX_GB = 15;
const MAX_MIN = 140;

const categories = [
  { label: 'Видеостриминг', pct: 42, color: '#FFD100' },
  { label: 'Соцсети', pct: 28, color: '#141414' },
  { label: 'Мессенджеры', pct: 18, color: '#AAAAAA' },
  { label: 'Другое', pct: 12, color: '#E8E8E8' },
];

function BarChart({ data, maxVal, unit, color }: { data: { week: string; val: number }[]; maxVal: number; unit: string; color: string }) {
  return (
    <div className="flex items-end gap-3 h-28">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-beeline-black">{d.val}{unit}</span>
          <div className="w-full rounded-t-xl relative overflow-hidden" style={{ height: `${(d.val / maxVal) * 88}px`, background: color }} />
          <span className="text-xs text-beeline-muted">{d.week}</span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsScreen() {
  const [tab, setTab] = useState<'data' | 'calls'>('data');

  const barData = tab === 'data'
    ? dataUsage.map(d => ({ week: d.week, val: d.gb }))
    : callStats.map(d => ({ week: d.week, val: d.min }));

  const maxVal = tab === 'data' ? MAX_GB : MAX_MIN;
  const unit = tab === 'data' ? ' ГБ' : ' м';

  return (
    <div className="flex flex-col pb-8">
      {/* Шапка */}
      <div className="px-5 pt-5 pb-4">
        <h2 className="text-xl font-bold text-beeline-black">Аналитика</h2>
        <p className="text-sm text-beeline-muted mt-0.5">Март 2026</p>
      </div>

      {/* Сводка */}
      <div className="px-5 mb-5 grid grid-cols-2 gap-3">
        <div className="bg-beeline-black rounded-2xl p-4">
          <p className="text-xs text-gray-400 mb-1">Потрачено ГБ</p>
          <p className="text-2xl font-black text-beeline-yellow">32.6</p>
          <p className="text-xs text-gray-500 mt-1">из 30 ГБ · перерасход</p>
        </div>
        <div className="bg-beeline-gray rounded-2xl p-4">
          <p className="text-xs text-beeline-muted mb-1">Звонков</p>
          <p className="text-2xl font-black text-beeline-black">340</p>
          <p className="text-xs text-beeline-muted mt-1">мин · из 600</p>
        </div>
        <div className="bg-beeline-gray rounded-2xl p-4">
          <p className="text-xs text-beeline-muted mb-1">SMS</p>
          <p className="text-2xl font-black text-beeline-black">22</p>
          <p className="text-xs text-beeline-muted mt-1">из 50 шт</p>
        </div>
        <div className="bg-beeline-yellow rounded-2xl p-4">
          <p className="text-xs text-yellow-800 mb-1">AI-токены</p>
          <p className="text-2xl font-black text-beeline-black">55К</p>
          <p className="text-xs text-yellow-800 mt-1">из 100К</p>
        </div>
      </div>

      {/* График */}
      <div className="mx-5 bg-white border border-gray-100 rounded-2xl p-4 mb-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-beeline-black">Динамика по неделям</p>
          <div className="flex gap-1">
            <button
              onClick={() => setTab('data')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${tab === 'data' ? 'bg-beeline-black text-white' : 'bg-beeline-gray text-beeline-muted'}`}
            >
              Интернет
            </button>
            <button
              onClick={() => setTab('calls')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${tab === 'calls' ? 'bg-beeline-black text-white' : 'bg-beeline-gray text-beeline-muted'}`}
            >
              Звонки
            </button>
          </div>
        </div>
        <BarChart
          data={barData}
          maxVal={maxVal}
          unit={unit}
          color={tab === 'data' ? '#FFD100' : '#141414'}
        />
      </div>

      {/* Категории трафика */}
      <div className="mx-5 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        <p className="text-sm font-bold text-beeline-black mb-4">Распределение трафика</p>
        <div className="flex gap-2 mb-4">
          {categories.map((c, i) => (
            <div
              key={i}
              className="h-2.5 rounded-full"
              style={{ flex: c.pct, background: c.color }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          {categories.map((c, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: c.color, border: c.color === '#E8E8E8' ? '1px solid #ccc' : 'none' }} />
                <span className="text-sm text-beeline-black">{c.label}</span>
              </div>
              <span className="text-sm font-semibold text-beeline-black">{c.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
