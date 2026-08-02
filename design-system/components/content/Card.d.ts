import * as React from 'react';
/**
 * Hairline paper card with an optional mono marker ("01") and serif title.
 * @startingPoint section="Content" subtitle="Numbered research cards" viewport="700x260"
 */
export interface CardProps {
  /** Mono eyebrow, typically a two-digit step number. */
  marker?: string;
  title?: React.ReactNode;
  /** Optional rule-separated footer line. */
  footer?: React.ReactNode;
  tone?: 'default' | 'sunk' | 'inverse';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
