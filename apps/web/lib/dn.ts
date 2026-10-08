// Distinguished-name normalisation shared by the P7M parser and the trusted-list matcher.
const KEYS: Record<string, string> = {
  cn: 'cn', o: 'o', ou: 'ou', c: 'c', l: 'l', st: 'st', s: 'st',
  serialnumber: 'sn', organizationidentifier: 'oi',
  '2.5.4.3': 'cn', '2.5.4.10': 'o', '2.5.4.11': 'ou', '2.5.4.6': 'c', '2.5.4.7': 'l',
  '2.5.4.8': 'st', '2.5.4.5': 'sn', '2.5.4.97': 'oi',
};

const clean = (v: string) => v.normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim();

export const pair = (key: string, value: string): string | null => {
  const k = KEYS[key.toLowerCase().trim()];
  return k ? `${k}=${clean(value)}` : null;
};

export const dnKey = (pairs: (string | null)[]) =>
  [...new Set(pairs.filter((p): p is string => !!p))].sort().join('|');

/** Parses an RFC 2253-ish string such as "CN=Foo, O=Bar\, Inc, C=IT". */
export function dnFromString(dn: string): string {
  const parts: string[] = [];
  let cur = '';
  for (let i = 0; i < dn.length; i++) {
    const ch = dn[i];
    if (ch === String.fromCharCode(92) && i + 1 < dn.length) {
      cur += dn[++i];
    } else if (ch === ',') {
      parts.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  parts.push(cur);
  return dnKey(
    parts.map((p) => {
      const eq = p.indexOf('=');
      return eq < 0 ? null : pair(p.slice(0, eq), p.slice(eq + 1));
    })
  );
}

export const orgOf = (key: string) => key.split('|').find((p) => p.startsWith('o='));
