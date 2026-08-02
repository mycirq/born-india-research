import * as React from 'react';

/**
 * Primary action control. Near-square corners (2px) — never a pill.
 * @startingPoint section="Actions" subtitle="Primary, secondary, accent and quiet buttons" viewport="700x160"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** primary = ink fill (default) · secondary = hairline outline · accent = laterite fill · quiet = underlined text link */
  variant?: 'primary' | 'secondary' | 'accent' | 'quiet';
  size?: 'sm' | 'md' | 'lg';
  /** Renders an <a> instead of a <button>. */
  href?: string;
  disabled?: boolean;
  /** Leading 16px Lucide icon node. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
