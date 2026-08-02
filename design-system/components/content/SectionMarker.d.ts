import * as React from 'react';
/** Numbered eyebrow with a rule running to the right edge — opens every section. */
export interface SectionMarkerProps {
  /** Two-digit string, e.g. "03". */
  number?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function SectionMarker(props: SectionMarkerProps): JSX.Element;
