import * as React from 'react';
/** Mono headline figure with mono label above and provenance note below. */
export interface StatBlockProps {
  label: string;
  value: React.ReactNode;
  /** Small trailing unit, e.g. "%" or "Cr". */
  unit?: string;
  /** Source or as-of date. Always cite. */
  note?: string;
  style?: React.CSSProperties;
}
export function StatBlock(props: StatBlockProps): JSX.Element;
