import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { ToolIcon } from './tool-icon';

// Where each tool floats around the headline on large screens: [left %, top px, size px, tilt deg].
const LAYOUT: Record<string, [number, number, number, number]> = {
  'apri-file-p7m': [5, 8, 176, -8],
  'unisci-pdf': [30, -6, 112, 6],
  'dividere-pdf': [66, 6, 152, 7],
  'ruotare-pdf': [2, 290, 112, -6],
  'jpg-in-pdf': [86, 280, 118, 6],
  'pdf-in-jpg': [11, 452, 150, -5],
  'organizza-pdf': [40, 548, 108, 4],
  'numero-di-pagine': [60, 540, 104, -4],
  'filigrana-pdf': [77, 440, 148, 8],
};

function Tile({ slug, size, tilt, delay }: { slug: string; size: number; tilt: number; delay: number }) {
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return null;
  return (
    <Link
      href={`/strumenti/${tool.slug}`}
      className="group flex flex-col items-center gap-2 opacity-20"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <span
        className="hero-float flex items-center justify-center shadow"
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.24,
          background: `linear-gradient(145deg, color-mix(in srgb, ${tool.color} 70%, #fff), ${tool.color})`,
          animationDelay: `${delay}s`,
        }}
      >
        <ToolIcon name={tool.icon} color="#fff" size={size * 0.5} bare />
      </span>
      <span className="text-center text-sm font-semibold leading-tight text-[#5b6270]">{tool.short}</span>
    </Link>
  );
}

const SLUGS = Object.keys(LAYOUT);

/** Large screens: tools float around the headline. */
export function HeroTiles() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {SLUGS.map((slug, i) => {
        const [left, top, size, tilt] = LAYOUT[slug];
        return (
          <div key={slug} className="pointer-events-auto absolute" style={{ left: `${left}%`, top }}>
            <Tile slug={slug} size={size} tilt={tilt} delay={i * 0.35} />
          </div>
        );
      })}
    </div>
  );
}
