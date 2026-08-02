import * as React from 'react';
/** Single-line text field with mono uppercase label above. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Replaces hint and turns the border flag-red. */
  error?: string;
  /** Static leading glyph, e.g. "₹". */
  prefix?: React.ReactNode;
}
export function Input(props: InputProps): JSX.Element;
