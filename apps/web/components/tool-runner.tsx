'use client';

import type { ComponentType } from 'react';
import P7mViewer from './p7m-viewer';
import { PdfShell } from './pdf-shell';
import {
  ImagesToPdf,
  MergePdf,
  OrganizePdf,
  PageNumbers,
  PdfToJpg,
  RotatePdf,
  SplitPdf,
  Watermark,
} from './pdf-tools';

// Rendered on the server too, so the upload box is visible immediately.
const RUNNERS: Record<string, ComponentType> = {
  'apri-file-p7m': P7mViewer,
  'unisci-pdf-online': MergePdf,
  'dividi-pdf-online': SplitPdf,
  'ruota-pdf-online': RotatePdf,
  'organizza-pdf-online': OrganizePdf,
  'convertire-jpg-in-pdf': ImagesToPdf,
  'convertire-pdf-in-jpg': PdfToJpg,
  'numerare-pagine-pdf': PageNumbers,
  'aggiungere-filigrana-pdf': Watermark,
};

export function ToolRunner({ slug }: { slug: string }) {
  const Runner = RUNNERS[slug];
  if (!Runner) return null;
  if (slug === 'apri-file-p7m') return <Runner />;
  return (
    <PdfShell>
      <Runner />
    </PdfShell>
  );
}
