import * as React from 'react';
/** Square hairline button holding a single 18px Lucide icon. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required accessible name. */
  label: string;
  /** Square edge in px. Default 36. */
  size?: number;
  children?: React.ReactNode;
}
export function IconButton(props: IconButtonProps): JSX.Element;
