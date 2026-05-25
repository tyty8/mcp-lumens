import type { SolutionGroup } from '@/lib/solutions'

interface Props {
  groups: SolutionGroup[]
  title: string
}

const CX = 450
const CY = 270
const RADIUS = 195
const CENTER_R = 54
const BOX_W = 148
const BOX_H = 46

function groupPosition(index: number, total: number) {
  const angleDeg = 270 + index * (360 / total)
  const angleRad = (angleDeg * Math.PI) / 180
  return {
    x: CX + RADIUS * Math.cos(angleRad),
    y: CY + RADIUS * Math.sin(angleRad),
  }
}

export function SolutionDiagram({ groups, title }: Props) {
  const positions = groups.map((_, i) => groupPosition(i, groups.length))

  return (
    <svg
      viewBox="0 0 900 540"
      className="w-full max-w-3xl mx-auto block"
      aria-label={`Diagrama de arquitectura: ${title}`}
      role="img"
    >
      <defs>
        {/* Center glow gradient */}
        <radialGradient id="sd-center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
        {/* Glow filter */}
        <filter id="sd-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Node shadow */}
        <filter id="sd-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Background glow behind center */}
      <circle cx={CX} cy={CY} r={110} fill="url(#sd-center-glow)" />

      {/* Subtle orbit rings */}
      <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" />
      <circle cx={CX} cy={CY} r={RADIUS * 0.6} fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" />

      {/* Dot marks on orbit ring at each group position */}
      {positions.map((pos, i) => (
        <circle
          key={`orbit-dot-${i}`}
          cx={pos.x}
          cy={pos.y}
          r={3}
          fill={groups[i].hex}
          fillOpacity="0.4"
        />
      ))}

      {/* Connection lines — drawn first so nodes render on top */}
      {groups.map((group, i) => {
        const pos = positions[i]
        return (
          <line
            key={`line-${i}`}
            x1={CX}
            y1={CY}
            x2={pos.x}
            y2={pos.y}
            stroke={group.hex}
            strokeWidth="1.5"
            strokeOpacity="0.25"
            strokeDasharray="5 5"
          />
        )
      })}

      {/* Rotating dashed ring around center */}
      <circle
        cx={CX}
        cy={CY}
        r={CENTER_R + 12}
        fill="none"
        stroke="#22c55e"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeDasharray="6 10"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from={`0 ${CX} ${CY}`}
          to={`360 ${CX} ${CY}`}
          dur="24s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Center node */}
      <circle
        cx={CX}
        cy={CY}
        r={CENTER_R}
        fill="#0a0a0a"
        stroke="#22c55e"
        strokeWidth="1.5"
        filter="url(#sd-glow)"
      />
      <text
        x={CX}
        y={CY - 9}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#22c55e"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        fontWeight="600"
        letterSpacing="0.5"
      >
        Asistente
      </text>
      <text
        x={CX}
        y={CY + 9}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#22c55e"
        fontSize="12"
        fontFamily="ui-monospace, monospace"
        fontWeight="600"
        letterSpacing="0.5"
      >
        de IA
      </text>

      {/* Group nodes */}
      {groups.map((group, i) => {
        const pos = positions[i]
        const bx = pos.x - BOX_W / 2
        const by = pos.y - BOX_H / 2
        const label = group.shortName

        return (
          <g key={group.id} filter="url(#sd-shadow)">
            {/* Box background */}
            <rect
              x={bx}
              y={by}
              width={BOX_W}
              height={BOX_H}
              rx={10}
              fill="#111111"
              stroke={group.hex}
              strokeWidth="1"
              strokeOpacity="0.65"
            />
            {/* Left accent bar */}
            <rect
              x={bx}
              y={by + 8}
              width={3}
              height={BOX_H - 16}
              rx={1.5}
              fill={group.hex}
              fillOpacity="0.8"
            />
            {/* Group name */}
            <text
              x={pos.x + 4}
              y={pos.y - 7}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#e5e5e5"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fontWeight="600"
            >
              {label}
            </text>
            {/* Server count */}
            <text
              x={pos.x + 4}
              y={pos.y + 9}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={group.hex}
              fillOpacity="0.85"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
            >
              {group.servers.length} servidores MCP
            </text>
          </g>
        )
      })}
    </svg>
  )
}
