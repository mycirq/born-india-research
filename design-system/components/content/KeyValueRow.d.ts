import * as React from 'react';
/** Dotted-leader fact row, as in a printed schedule of particulars. */
export interface KeyValueRowProps {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
}
export function KeyValueRow(props: KeyValueRowProps): JSX.Element;
