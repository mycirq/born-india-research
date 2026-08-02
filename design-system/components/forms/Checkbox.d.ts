import * as React from 'react';
/** Square checkbox with laterite fill when checked. */
export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
