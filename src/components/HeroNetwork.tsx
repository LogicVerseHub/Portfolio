import type { CSSProperties } from 'react';

export type FocusArea = 'data' | 'cloud' | 'ai';

interface NetNode {
  x: number;
  y: number;
  r: number;
  group: FocusArea;
}

const WIDTH = 1200;
const HEIGHT = 800;
const NODE_COUNT = 44;

/** Small seeded PRNG so the network looks the same on every load. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNetwork() {
  const rand = mulberry32(11);
  const nodes: NetNode[] = Array.from({ length: NODE_COUNT }, () => {
    const x = 30 + rand() * (WIDTH - 60);
    const y = 30 + rand() * (HEIGHT - 60);
    // Left → right mirrors the flow: data sources, cloud processing, intelligence.
    const group: FocusArea = x < WIDTH / 3 ? 'data' : x < (2 * WIDTH) / 3 ? 'cloud' : 'ai';
    return { x, y, r: 1.6 + rand() * 2.6, group };
  });

  const seen = new Set<string>();
  const edges: [number, number][] = [];
  nodes.forEach((node, i) => {
    const nearest = nodes
      .map((other, j) => ({ j, d: Math.hypot(other.x - node.x, other.y - node.y) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const { j } of nearest) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  });

  return { nodes, edges };
}

const { nodes, edges } = buildNetwork();

const groupColor: Record<FocusArea, string> = {
  data: '#67E8F9',
  cloud: '#94A3B8',
  ai: '#A78BFA',
};

export function HeroNetwork({ focus }: { focus: FocusArea | null }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <g>
        {edges.map(([a, b]) => {
          const from = nodes[a];
          const to = nodes[b];
          const lit = focus !== null && from.group === focus && to.group === focus;
          return (
            <line
              key={`e-${a}-${b}`}
              className="net-edge"
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={lit ? groupColor[from.group] : '#94A3B8'}
              strokeOpacity={lit ? 0.55 : focus ? 0.06 : 0.13}
              strokeWidth={1}
            />
          );
        })}
      </g>

      <g>
        {edges
          .filter((_, i) => i % 3 === 0)
          .map(([a, b], i) => {
            const from = nodes[a];
            const to = nodes[b];
            const dimmed = focus !== null && !(from.group === focus && to.group === focus);
            const style = {
              '--dur': `${4 + (i % 5)}s`,
              '--delay': `${-(i * 0.7)}s`,
              opacity: dimmed ? 0.15 : 0.9,
            } as CSSProperties;
            return (
              <line
                key={`p-${a}-${b}`}
                className="net-packet net-edge"
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                pathLength={100}
                stroke={groupColor[from.group === 'cloud' ? 'data' : from.group]}
                strokeWidth={2}
                strokeLinecap="round"
                style={style}
              />
            );
          })}
      </g>

      <g>
        {nodes.map((node, i) => {
          const lit = focus === node.group;
          const dimmed = focus !== null && !lit;
          return (
            <g key={`n-${i}`}>
              {lit && <circle cx={node.x} cy={node.y} r={node.r * 4} fill={groupColor[node.group]} opacity={0.12} />}
              <circle
                className="net-node"
                cx={node.x}
                cy={node.y}
                r={lit ? node.r + 1.2 : node.r}
                fill={lit ? groupColor[node.group] : '#CBD5E1'}
                opacity={dimmed ? 0.18 : lit ? 1 : 0.5}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
