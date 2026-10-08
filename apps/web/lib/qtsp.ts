import { orgOf } from './dn';
import { TL, TL_ISSUED } from './tl-data';

export { TL_ISSUED };

export type IssuerMatch =
  | { kind: 'exact'; country: string; provider: string; active: boolean }
  | { kind: 'organisation'; country: string; provider: string; active: boolean }
  | { kind: 'none' };

/**
 * Looks the issuer of a certificate up in the official trusted lists of Italy (AgID)
 * and Romania (ADR), bundled in tl-data.ts.
 */
export function findIssuer(issuerDn: string): IssuerMatch {
  if (!issuerDn) return { kind: 'none' };

  const exact = TL.filter((e) => e[3] === issuerDn);
  if (exact.length) {
    const e = exact.find((x) => x[2] === 1) ?? exact[0];
    return { kind: 'exact', country: e[0], provider: e[1], active: e[2] === 1 };
  }

  const org = orgOf(issuerDn);
  if (org) {
    const same = TL.filter((e) => orgOf(e[3]) === org);
    if (same.length) {
      const e = same.find((x) => x[2] === 1) ?? same[0];
      return { kind: 'organisation', country: e[0], provider: e[1], active: e[2] === 1 };
    }
  }
  return { kind: 'none' };
}
