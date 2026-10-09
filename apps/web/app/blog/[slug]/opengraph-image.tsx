import { ImageResponse } from 'next/og';
import { getPost } from '@/lib/blog';
import { SITE } from '@/lib/tools';

export const alt = 'Articolo del blog di ApriDoc.com';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  const title = post?.title ?? 'Blog';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#1f087a',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>
          Apri<span style={{ color: '#b9a8ff' }}>Doc</span>
          <span style={{ marginLeft: 16, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>Blog</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: '#b9a8ff', textTransform: 'uppercase', letterSpacing: 4 }}>
            {post?.category ?? ''}
          </div>
          <div style={{ marginTop: 20, fontSize: 68, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5 }}>{title}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: 'rgba(255,255,255,0.6)' }}>
          {SITE.url.replace('https://', '')}
        </div>
      </div>
    ),
    size,
  );
}
