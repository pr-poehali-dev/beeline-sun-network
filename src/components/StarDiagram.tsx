import React, { useEffect, useState } from 'react';

interface RayData {
  label: string;
  value: number;
  total: number;
  unit: string;
  color: string;
  angle: number;
}

interface MiniRayData {
  label: string;
  icon: string;
  active: boolean;
  angle: number;
}

const rays: RayData[] = [
  { label: 'Минуты', value: 340, total: 600, unit: 'мин', color: '#FFD100', angle: 0 },
  { label: 'SMS', value: 28, total: 50, unit: 'шт', color: '#FFD100', angle: 90 },
  { label: 'Интернет', value: 12.4, total: 30, unit: 'ГБ', color: '#FFD100', angle: 180 },
  { label: 'AI-токены', value: 45000, total: 100000, unit: 'шт', color: '#FFD100', angle: 270 },
];

const miniRays: MiniRayData[] = [
  { label: 'Секретарь', icon: '🤖', active: true, angle: 45 },
  { label: 'Остаток', icon: '📦', active: true, angle: 135 },
  { label: 'Подписки', icon: '✦', active: false, angle: 225 },
  { label: 'Роуминг', icon: '✈️', active: false, angle: 315 },
];

const RAY_LENGTH = 105;
const MINI_RAY_LENGTH = 62;
const CX = 160;
const CY = 160;

function polarToXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CX + r * Math.cos(rad),
    y: CY + r * Math.sin(rad),
  };
}

function formatValue(val: number, unit: string): string {
  if (unit === 'шт' && val >= 1000) return `${(val / 1000).toFixed(0)}К`;
  if (unit === 'шт' && val < 1000) return `${val}`;
  if (unit === 'ГБ') return val.toFixed(1);
  return `${val}`;
}

export default function StarDiagram() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const anim = requestAnimationFrame(() => {
        let start: number | null = null;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 800, 1);
          setProgress(p);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
      return () => cancelAnimationFrame(anim);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full">
      <svg
        viewBox="0 0 320 320"
        width="320"
        height="320"
        className="animate-star-glow"
        style={{ overflow: 'visible' }}
      >
        {/* Фоновые кольца */}
        <circle cx={CX} cy={CY} r="52" fill="none" stroke="#F0F0F0" strokeWidth="1" />
        <circle cx={CX} cy={CY} r="80" fill="none" stroke="#F5F5F5" strokeWidth="0.5" strokeDasharray="3 4" />

        {/* Большие лучи — заливка прогресса */}
        {rays.map((ray) => {
          const end = polarToXY(ray.angle, RAY_LENGTH);
          const progressEnd = polarToXY(ray.angle, 32 + (RAY_LENGTH - 32) * (ray.value / ray.total) * progress);
          const tip = polarToXY(ray.angle, RAY_LENGTH + 2);

          const perpAngle = ray.angle + 90;
          const hw = 7;
          const p1 = polarToXY(ray.angle, 32);
          const perpRad = ((perpAngle - 90) * Math.PI) / 180;
          const dx = hw * Math.cos(perpRad);
          const dy = hw * Math.sin(perpRad);

          const rayStart = polarToXY(ray.angle, 30);
          const rayEnd = polarToXY(ray.angle, RAY_LENGTH);

          // Ромбовидный наконечник
          const diam = 6;
          const dEnd = polarToXY(ray.angle, RAY_LENGTH + diam);
          const dSide1 = polarToXY(ray.angle + 90, diam / 2);
          const dSide2 = polarToXY(ray.angle - 90, diam / 2);
          const diamondPath = `M ${tip.x} ${tip.y} L ${dSide1.x + (tip.x - CX) * 0} ${dSide1.y}`;

          // Линия трека (серая)
          const trackStart = polarToXY(ray.angle, 30);
          const trackEnd = polarToXY(ray.angle, RAY_LENGTH);

          // Линия прогресса
          const progEnd = polarToXY(ray.angle, 30 + (RAY_LENGTH - 30) * (ray.value / ray.total) * progress);

          // Позиция текста
          const textPos = polarToXY(ray.angle, RAY_LENGTH + 26);
          const subTextPos = polarToXY(ray.angle, RAY_LENGTH + 42);

          const remaining = ray.total - ray.value;

          return (
            <g key={ray.label}>
              {/* Трек луча */}
              <line
                x1={trackStart.x} y1={trackStart.y}
                x2={trackEnd.x} y2={trackEnd.y}
                stroke="#E8E8E8"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Прогресс луча */}
              <line
                x1={trackStart.x} y1={trackStart.y}
                x2={progEnd.x} y2={progEnd.y}
                stroke="#FFD100"
                strokeWidth="10"
                strokeLinecap="round"
                style={{ transition: 'none' }}
              />
              {/* Наконечник */}
              <circle
                cx={trackEnd.x}
                cy={trackEnd.y}
                r="4"
                fill={ray.value / ray.total > 0.95 * progress ? '#FFD100' : '#E8E8E8'}
              />

              {/* Текст: остаток */}
              <text
                x={textPos.x}
                y={textPos.y - 5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="13"
                fontWeight="700"
                fontFamily="Golos Text, sans-serif"
                fill="#141414"
              >
                {formatValue(remaining, ray.unit)}
                <tspan fontSize="10" fontWeight="500" fill="#8A8A8A"> {ray.unit}</tspan>
              </text>
              <text
                x={subTextPos.x}
                y={subTextPos.y - 5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9.5"
                fontFamily="Golos Text, sans-serif"
                fill="#AAAAAA"
              >
                {ray.label}
              </text>
            </g>
          );
        })}

        {/* Малые лучи — доп.услуги */}
        {miniRays.map((mr) => {
          const mStart = polarToXY(mr.angle, 28);
          const mEnd = polarToXY(mr.angle, MINI_RAY_LENGTH);
          const textPos = polarToXY(mr.angle, MINI_RAY_LENGTH + 18);

          return (
            <g key={mr.label} opacity={mr.active ? 1 : 0.35}>
              <line
                x1={mStart.x} y1={mStart.y}
                x2={mEnd.x} y2={mEnd.y}
                stroke={mr.active ? '#141414' : '#CCCCCC'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={mr.active ? 'none' : '3 3'}
              />
              <circle
                cx={mEnd.x}
                cy={mEnd.y}
                r="5"
                fill={mr.active ? '#141414' : '#F0F0F0'}
                stroke={mr.active ? '#141414' : '#CCCCCC'}
                strokeWidth="1"
              />
              <text
                x={textPos.x}
                y={textPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8.5"
                fontFamily="Golos Text, sans-serif"
                fill={mr.active ? '#141414' : '#AAAAAA'}
              >
                {mr.label}
              </text>
            </g>
          );
        })}

        {/* Центральная звезда */}
        {/* Центральный круг */}
        <circle cx={CX} cy={CY} r="46" fill="white" />
        <circle cx={CX} cy={CY} r="44" fill="#FFD100" />

        {/* Звезда (полярная, 4 луча) в центре */}
        <g transform={`translate(${CX}, ${CY})`}>
          {/* 4 маленьких луча звезды */}
          {[0, 90, 180, 270].map((a) => {
            const rad = ((a - 90) * Math.PI) / 180;
            const x = 20 * Math.cos(rad);
            const y = 20 * Math.sin(rad);
            const cx1 = 8 * Math.cos(rad);
            const cy1 = 8 * Math.sin(rad);
            return (
              <line key={a} x1="0" y1="0" x2={x} y2={y}
                stroke="#141414" strokeWidth="2.5" strokeLinecap="round" />
            );
          })}
          {/* Диагональные малые лучи */}
          {[45, 135, 225, 315].map((a) => {
            const rad = ((a - 90) * Math.PI) / 180;
            const x = 10 * Math.cos(rad);
            const y = 10 * Math.sin(rad);
            return (
              <line key={a} x1="0" y1="0" x2={x} y2={y}
                stroke="#141414" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            );
          })}
          {/* Центральная точка */}
          <circle cx="0" cy="0" r="3.5" fill="#141414" />
        </g>

        {/* Цена в центре */}
        <text
          x={CX}
          y={CY + 16}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fontFamily="Golos Text, sans-serif"
          fill="#141414"
        >
          590 ₽/мес
        </text>
      </svg>
    </div>
  );
}
