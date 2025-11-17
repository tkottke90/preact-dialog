import { Dialog, DialogClose, DialogFooter, DialogHeader, DialogTrigger, useDialog } from '../components/Dialog';
import './Dialog.stories.css';

interface PlaygroundArgs {
  position: 'center' | 'top';
  dismissible: boolean;
  '--preact-dialog__bg': string;
  '--preact-dialog_fg': string;
  '--preact-dialog__border-color': string;
  '--preact-dialog__border-radius': string;
  '--preact-dialog__border-width': string;
  '--preact-dialog__width_min': string;
  '--preact-dialog__width_max': string;
  '--preact-dialog__backdrop_bg': string;
  '--preact-dialog__backdrop_opacity': number;
}

export default {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A customizable dialog component built with Web Components for [Preact](https://preactjs.com/). Supports CSS custom properties for theming and styling.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS class name for styling',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      control: 'text',
      description: 'HTML id attribute',
      table: {
        type: { summary: 'string' },
      },
    },
    position: {
      control: 'select',
      options: ['center', 'top'],
      description: 'Dialog position in viewport',
      table: {
        type: { summary: 'center | top' },
        defaultValue: { summary: 'center' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the dialog can be dismissed by clicking outside or pressing Escape',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    // CSS Custom Properties
    '--preact-dialog__bg': {
      control: 'color',
      description: 'Background color',
      table: {
        category: 'CSS Variables',
        type: { summary: 'color' },
        defaultValue: { summary: '#efefef' },
      },
    },
    '--preact-dialog_fg': {
      control: 'color',
      description: 'Text color',
      table: {
        category: 'CSS Variables',
        type: { summary: 'color' },
        defaultValue: { summary: '#222' },
      },
    },
    '--preact-dialog__border-color': {
      control: 'color',
      description: 'Border color',
      table: {
        category: 'CSS Variables',
        type: { summary: 'color' },
        defaultValue: { summary: '#AAA' },
      },
    },
    '--preact-dialog__border-radius': {
      control: 'text',
      description: 'Border radius (e.g., 4px, 1rem)',
      table: {
        category: 'CSS Variables',
        type: { summary: 'string' },
        defaultValue: { summary: '4px' },
      },
    },
    '--preact-dialog__border-width': {
      control: 'text',
      description: 'Border width (e.g., 1px, 2px)',
      table: {
        category: 'CSS Variables',
        type: { summary: 'string' },
        defaultValue: { summary: '1px' },
      },
    },
    '--preact-dialog__width_min': {
      control: 'text',
      description: 'Minimum width (e.g., 300px, 20rem)',
      table: {
        category: 'CSS Variables',
        type: { summary: 'string' },
        defaultValue: { summary: '300px' },
      },
    },
    '--preact-dialog__width_max': {
      control: 'text',
      description: 'Maximum width (e.g., 50vw, 800px)',
      table: {
        category: 'CSS Variables',
        type: { summary: 'string' },
        defaultValue: { summary: '50vw' },
      },
    },
    '--preact-dialog__backdrop_bg': {
      control: 'color',
      description: 'Backdrop background color',
      table: {
        category: 'CSS Variables',
        type: { summary: 'color' },
        defaultValue: { summary: '#333' },
      },
    },
    '--preact-dialog__backdrop_opacity': {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Backdrop opacity (0-100%)',
      table: {
        category: 'CSS Variables',
        type: { summary: 'string' },
        defaultValue: { summary: '50%' },
      },
    },
  },
};

/**
 * The default dialog with basic content and a close button.
 * Click the "Open" button to launch the dialog.
 */
export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Basic dialog with default styling. Includes a close button in the top-right corner and a trigger button to open the dialog.',
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogClose />
      <h2>Welcome to the Dialog</h2>
      <p>
        This is a basic dialog component with default styling. It uses the native HTML{' '}
        <code>&lt;dialog&gt;</code> element with Shadow DOM for style encapsulation.
      </p>
      <p>
        You can customize the appearance using CSS custom properties like{' '}
        <code>--preact-dialog__bg</code>, <code>--preact-dialog__border-radius</code>, and more.
      </p>
    </Dialog>
  ),
};

/**
 * Dialog with custom trigger button text.
 */
export const CustomTrigger = {
  parameters: {
    docs: {
      description: {
        story: 'Dialog with a custom trigger button using the DialogTrigger component.',
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger>
        <button className="customBtn">
          Open Modal
        </button>
      </DialogTrigger>
      <DialogClose />
      <h2>Custom Trigger Dialog</h2>
      <p>
        This dialog uses the <code>&lt;DialogTrigger&gt;</code> component to create a custom
        button that opens the dialog.
      </p>
    </Dialog>
  ),
};

/**
 * Dialog with header and footer slots.
 */
export const WithHeaderAndFooter = {
  parameters: {
    docs: {
      description: {
        story: 'Dialog demonstrating the use of DialogHeader and DialogFooter components for structured content.',
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogClose />

      <DialogHeader>
        <h2 style={{ margin: 0 }}>Dialog Title</h2>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', opacity: 0.7 }}>
          This is a subtitle or description
        </p>
      </DialogHeader>

      <div style={{ padding: '1rem 0' }}>
        <p>
          This is the main content area of the dialog. You can put any content here,
          including forms, images, or other components.
        </p>
        <p>
          The header and footer are optional and can be used to create a more structured
          layout for your dialog content.
        </p>
      </div>

      <DialogFooter>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Cancel</button>
          <button style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Confirm
          </button>
        </div>
      </DialogFooter>
    </Dialog>
  ),
};

/**
 * Dialog with custom styling using CSS variables.
 */
export const CustomStyles = {
  parameters: {
    docs: {
      description: {
        story: 'Dialog with custom styling applied via CSS custom properties. This example shows a dark theme with custom colors and border radius.',
      },
    },
  },
  render: () => (
    <Dialog className="custom-styles" id="custom-styles">
      <DialogTrigger>Open Styled Dialog</DialogTrigger>
      <DialogClose />
      <h2>Custom Styled Dialog</h2>
      <p>
        This dialog demonstrates custom styling using CSS variables:
      </p>
      <ul>
        <li><code>--preact-dialog__bg</code>: Custom background color</li>
        <li><code>--preact-dialog_fg</code>: Custom text color</li>
        <li><code>--preact-dialog__border-radius</code>: Custom border radius</li>
        <li><code>--preact-dialog__backdrop_bg</code>: Custom backdrop color</li>
      </ul>
      <p>
        Check the CSS file to see how these variables are applied!
      </p>
    </Dialog>
  ),
};

/**
 * Dialog positioned at the top of the viewport.
 */
export const TopPosition = {
  parameters: {
    docs: {
      description: {
        story: 'Dialog positioned at the top of the viewport instead of centered.',
      },
    },
  },
  render: () => (
    <Dialog position="top">
      <DialogTrigger>Open Top Dialog</DialogTrigger>
      <DialogClose />
      <h2>Top Positioned Dialog</h2>
      <p>
        This dialog appears at the top of the viewport. You can control the position
        using the <code>position</code> prop.
      </p>
    </Dialog>
  ),
};

/**
 * Dialog with form content.
 */
export const WithForm = {
  parameters: {
    docs: {
      description: {
        story: 'Dialog containing a form with input fields and submit button.',
      },
    },
  },
  render: () => (
    <Dialog dismissible={false}>
      <DialogTrigger>Open Form Dialog</DialogTrigger>
      <h2>Contact Form</h2>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem' }}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem' }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '0.25rem' }}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box', resize: 'vertical' }}
            placeholder="Enter your message"
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <CancelButton />
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </Dialog>
  ),
};

function CustomButton() {
  
}

function CancelButton() {
  const { close } = useDialog();

  return (
    <button onClick={close} type="button" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
      Cancel
    </button>
  );
}