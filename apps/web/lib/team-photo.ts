import { existsSync } from 'node:fs';
import path from 'node:path';

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

/** "Dr. Elena Marchetti" becomes "elena-marchetti". */
export const photoSlug = (name: string) =>
  name
    .replace(/^(dr|prof|mr|ms|mrs)\.?\s+/i, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Looks for /public/team/<slug>.(jpg|jpeg|png|webp) at build or render time and returns its
 * public path, so adding a photo file is enough to show it. Returns undefined when none exists.
 */
export const findTeamPhoto = (name: string): string | undefined => {
  const slug = photoSlug(name);
  for (const extension of EXTENSIONS) {
    const file = `${slug}.${extension}`;
    if (existsSync(path.join(process.cwd(), 'public', 'team', file))) return `/team/${file}`;
  }
  return undefined;
};
