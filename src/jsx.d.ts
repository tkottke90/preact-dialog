import 'preact';
import type { PreactDialog } from './components/Dialog';

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'preact-dialog': HTMLAttributes<PreactDialog> & {
        // Add any custom attributes for your dialog element here
        open?: boolean;
        modal?: boolean;
        position?: 'center' | 'top'
        dismissible?: boolean

        // Add more custom attributes as needed

      };
    }
  }
}

