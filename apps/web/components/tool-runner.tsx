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
  'unisci-pdf': MergePdf,
  'dividere-pdf': SplitPdf,
  'ruotare-pdf': RotatePdf,
  'organizza-pdf': OrganizePdf,
  'jpg-in-pdf': ImagesToPdf,
  'pdf-in-jpg': PdfToJpg,
  'numero-di-pagine': PageNumbers,
  'filigrana-pdf': Watermark,
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
