import {
  Columns2,
  Combine,
  Droplet,
  FileText,
  Hash,
  Image as ImageIcon,
  ImageDown,
  LayoutGrid,
  Lock,
  Minimize2,
  PenLine,
  RotateCw,
  ScanText,
  Scissors,
  ShieldCheck,
  Unlock,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  merge: Combine,
  split: Scissors,
  rotate: RotateCw,
  layout: LayoutGrid,
  'image-in': ImageIcon,
  'image-out': ImageDown,
  hash: Hash,
  droplet: Droplet,
  minimize: Minimize2,
  'file-text': FileText,
  scan: ScanText,
  pen: PenLine,
  lock: Lock,
  unlock: Unlock,
  wrench: Wrench,
  columns: Columns2,
};

export function ToolIcon({
  name,
  color,
  size = 56,
  bare = false,
}: {
  name: string;
  color: string;
  size?: number;
  /** Just the glyph, without the tinted square behind it. */
  bare?: boolean;
}) {
  const Icon = ICONS[name] ?? FileText;
  if (bare) return <Icon size={size} strokeWidth={1.8} color={color} />;
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-2xl"
      style={{ width: size, height: size, background: `${color}1f`, color }}
    >
      <Icon size={size * 0.52} strokeWidth={2} />
    </span>
  );
}
