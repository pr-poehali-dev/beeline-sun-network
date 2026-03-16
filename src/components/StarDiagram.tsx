import React, { useEffect, useState } from 'react';

interface RayData {
  label: string;
  value: number;
  total: number;
  unit: string;
  angle: number;
}

interface MiniRayData {
  id: string;
  angle: number;
}

const rays: RayData[] = [
  { label: 'Минуты', value: 340, total: 600, unit: 'мин', angle: 0 },
  { label: 'SMS', value: 28, total: 50, unit: 'шт', angle: 90 },
  { label: 'Интернет', value: 12.4, total: 30, unit: 'ГБ', angle: 180 },
  { label: 'AI', value: 45000, total: 100000, unit: 'токенов', angle: 270 },
];

// 8 малых лучей равномерно, между большими (по диагоналям + промежуточные)
const miniRayAngles = [45, 90 + 45, 180 + 45, 270 + 45];
// Дополнительные между диагональными
const extraAngles = [22, 67, 112, 157, 202, 247, 292, 337];

const ALL_MINI: MiniRayData[] = [
  { id: 'secretary', angle: 22 },
  { id: 'savings', angle: 67 },
  { id: 'subscriptions', angle: 112 },
  { id: 'roaming', angle: 157 },
  { id: 'novpn', angle: 202 },
  { id: 'family', angle: 247 },
  { id: 'antivirus', angle: 292 },
  { id: 'calls', angle: 337 },
];

const CX = 160;
const CY = 160;
const RAY_START = 52;
const RAY_LENGTH = 118;
const MINI_START = 48;
const MINI_LENGTH = 82;

function polarToXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function formatVal(val: number, unit: string) {
  if (unit === 'токенов') return val >= 1000 ? `${Math.round(val / 1000)}К` : `${val}`;
  if (unit === 'ГБ') return val.toFixed(1);
  return `${val}`;
}

interface Props {
  activeOptions: Record<string, boolean>;
  onToggleMini?: (id: string) => void;
}

export default function StarDiagram({ activeOptions, onToggleMini }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    const timeout = setTimeout(() => {
      let start: number | null = null;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 900, 1);
        setProgress(p);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, 200);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="flex items-center justify-center w-full select-none">
      <svg viewBox="0 0 320 320" width="320" height="320" style={{ overflow: 'visible' }}>

        {/* ─── БОЛЬШИЕ ЛУЧИ — прогресс-трек ─── */}
        {rays.map((ray) => {
          const trackS = polarToXY(ray.angle, RAY_START);
          const trackE = polarToXY(ray.angle, RAY_LENGTH);
          const ratio = (ray.value / ray.total) * progress;
          const progE = polarToXY(ray.angle, RAY_START + (RAY_LENGTH - RAY_START) * ratio);

          const remaining = ray.total - ray.value;

          // Текстовая позиция: вдоль луча, подальше от конца
          const labelR = RAY_LENGTH + 28;
          const labelPos = polarToXY(ray.angle, labelR);
          const subLabelPos = polarToXY(ray.angle, labelR + 16);

          // Треугольный наконечник луча в стиле флэт-звезды
          // Луч — как вытянутый ромб: широкий у основания, острый на конце
          const rayAngleRad = ((ray.angle - 90) * Math.PI) / 180;
          const perpRad = ((ray.angle) * Math.PI) / 180;
          const baseHalfW = 9;
          const tipPoint = polarToXY(ray.angle, RAY_LENGTH + 4);
          const baseCenter = polarToXY(ray.angle, RAY_START);
          const baseL = { x: baseCenter.x - baseHalfW * Math.cos(perpRad), y: baseCenter.y - baseHalfW * Math.sin(perpRad) };
          const baseR = { x: baseCenter.x + baseHalfW * Math.cos(perpRad), y: baseCenter.y + baseHalfW * Math.sin(perpRad) };

          const filledRatio = Math.min(ratio, 1);
          const fillTip = polarToXY(ray.angle, RAY_START + (RAY_LENGTH + 4 - RAY_START) * filledRatio);
          const fillBaseHW = baseHalfW * (1 - filledRatio * 0.6);
          const fillBaseL = { x: baseCenter.x - fillBaseHW * Math.cos(perpRad), y: baseCenter.y - fillBaseHW * Math.sin(perpRad) };
          const fillBaseR = { x: baseCenter.x + fillBaseHW * Math.cos(perpRad), y: baseCenter.y + fillBaseHW * Math.sin(perpRad) };

          return (
            <g key={ray.label}>
              {/* Серый трек-луч */}
              <polygon
                points={`${baseL.x},${baseL.y} ${baseR.x},${baseR.y} ${tipPoint.x},${tipPoint.y}`}
                fill="#EBEBEB"
              />
              {/* Жёлтый прогресс */}
              {filledRatio > 0.01 && (
                <polygon
                  points={`${fillBaseL.x},${fillBaseL.y} ${fillBaseR.x},${fillBaseR.y} ${fillTip.x},${fillTip.y}`}
                  fill="#FFD100"
                />
              )}

              {/* Остаток: X из Y */}
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12.5"
                fontWeight="700"
                fontFamily="Golos Text, sans-serif"
                fill="#141414"
              >
                {formatVal(remaining, ray.unit)}
                <tspan fontSize="9.5" fontWeight="500" fill="#8A8A8A"> из {formatVal(ray.total, ray.unit)}</tspan>
              </text>
              <text
                x={subLabelPos.x}
                y={subLabelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontFamily="Golos Text, sans-serif"
                fill="#BBBBBB"
              >
                {ray.label}
              </text>
            </g>
          );
        })}

        {/* ─── МАЛЫЕ ЛУЧИ — доп.опции ─── */}
        {ALL_MINI.map((mr) => {
          const active = !!activeOptions[mr.id];
          const mS = polarToXY(mr.angle, MINI_START);
          const mE = polarToXY(mr.angle, MINI_LENGTH);
          const dotR = MINI_LENGTH + 6;
          const dot = polarToXY(mr.angle, dotR);

          return (
            <g
              key={mr.id}
              onClick={() => onToggleMini?.(mr.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Пунктирная / сплошная линия */}
              <line
                x1={mS.x} y1={mS.y}
                x2={mE.x} y2={mE.y}
                stroke={active ? '#FFD100' : '#D0D0D0'}
                strokeWidth={active ? '2' : '1.5'}
                strokeLinecap="round"
                strokeDasharray={active ? 'none' : '3 3'}
              />
              {/* Точка-кнопка */}
              <circle
                cx={dot.x} cy={dot.y} r="7"
                fill={active ? '#FFD100' : '#F5F5F5'}
                stroke={active ? '#FFD100' : '#D8D8D8'}
                strokeWidth="1.5"
              />
              {/* Внутренняя точка когда активна */}
              {active && (
                <circle cx={dot.x} cy={dot.y} r="2.5" fill="#141414" />
              )}
            </g>
          );
        })}

        {/* ─── ЦЕНТРАЛЬНАЯ ЗВЕЗДА (флэт, как референс) ─── */}
        <g transform={`translate(${CX}, ${CY})`}>
          {/* 4 больших острых луча звезды */}
          {[0, 90, 180, 270].map((a) => {
            const rad = ((a - 90) * Math.PI) / 180;
            const perpRad = (a * Math.PI) / 180;
            const tipX = 38 * Math.cos(rad);
            const tipY = 38 * Math.sin(rad);
            const hw = 7;
            const bLX = -hw * Math.cos(perpRad);
            const bLY = -hw * Math.sin(perpRad);
            const bRX = hw * Math.cos(perpRad);
            const bRY = hw * Math.sin(perpRad);
            // тёмная грань (левая сторона)
            const midRad = ((a - 45 - 90) * Math.PI) / 180;
            const midX = 20 * Math.cos(rad) - 3 * Math.cos(perpRad);
            const midY = 20 * Math.sin(rad) - 3 * Math.sin(perpRad);
            return (
              <g key={a}>
                {/* светлая грань */}
                <polygon
                  points={`${bLX},${bLY} 0,0 ${tipX},${tipY}`}
                  fill="#FFD100"
                  opacity="0.9"
                />
                {/* тёмная грань */}
                <polygon
                  points={`${bRX},${bRY} 0,0 ${tipX},${tipY}`}
                  fill="#E6B800"
                />
              </g>
            );
          })}
          {/* 4 малых луча по диагоналям */}
          {[45, 135, 225, 315].map((a) => {
            const rad = ((a - 90) * Math.PI) / 180;
            const perpRad = (a * Math.PI) / 180;
            const tipX = 22 * Math.cos(rad);
            const tipY = 22 * Math.sin(rad);
            const hw = 5;
            const bLX = -hw * Math.cos(perpRad);
            const bLY = -hw * Math.sin(perpRad);
            const bRX = hw * Math.cos(perpRad);
            const bRY = hw * Math.sin(perpRad);
            return (
              <g key={a}>
                <polygon points={`${bLX},${bLY} 0,0 ${tipX},${tipY}`} fill="#FFD100" opacity="0.85" />
                <polygon points={`${bRX},${bRY} 0,0 ${tipX},${tipY}`} fill="#E6B800" />
              </g>
            );
          })}
          {/* Центральный круг */}
          <circle cx="0" cy="0" r="26" fill="#FFF8D6" />
          <circle cx="0" cy="0" r="22" fill="white" />

          {/* Цена — чётко по центру, ничего не загораживает */}
          <text
            x="0" y="-5"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="900"
            fontFamily="Golos Text, sans-serif"
            fill="#141414"
          >
            590 ₽
          </text>
          <text
            x="0" y="9"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fontWeight="500"
            fontFamily="Golos Text, sans-serif"
            fill="#8A8A8A"
          >
            в месяц
          </text>
        </g>
      </svg>
    </div>
  );
}
