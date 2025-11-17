import type { ComponentChildren } from 'preact';

export interface DialogProps {
  children?: ComponentChildren;
}

export function Dialog({ children }: DialogProps) {
  return (
    <div>
      {children}
    </div>
  );
}

