import * as React from 'react';
/** Small uppercase mono status chip carrying a research verdict. */
export interface BadgeProps {
  tone?: 'neutral' | 'accent' | 'verified' | 'caution' | 'flag';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): JSX.Element;
