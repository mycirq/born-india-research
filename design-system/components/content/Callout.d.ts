import * as React from 'react';
/** Field note: a 2px coloured rule on the left, no fill, no box. */
export interface CalloutProps {
  /** Mono uppercase kicker, e.g. "Field note". */
  title?: string;
  tone?: 'accent' | 'caution' | 'flag' | 'neutral';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Callout(props: CalloutProps): JSX.Element;
