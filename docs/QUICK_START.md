# Quick Start Guide

## Installation

```bash
npm install preact-dialog
```

## Basic Usage

### Using Preact Components

```tsx
import { Dialog, DialogHeader, DialogFooter, DialogClose } from 'preact-dialog';

function App() {
  return (
    <Dialog open>
      <DialogHeader>
        <h2>Welcome</h2>
      </DialogHeader>
      
      <p>This is a simple dialog.</p>
      
      <DialogFooter>
        <DialogClose>
          <button>Close</button>
        </DialogClose>
      </DialogFooter>
    </Dialog>
  );
}
```

### Using with Trigger

```tsx
import { Dialog, DialogTrigger, DialogClose } from 'preact-dialog';

function App() {
  return (
    <div>
      <DialogTrigger targetDialog="my-dialog">
        Open Dialog
      </DialogTrigger>
      
      <Dialog id="my-dialog">
        <p>Dialog content</p>
        <DialogClose>
          <button>Close</button>
        </DialogClose>
      </Dialog>
    </div>
  );
}
```

### Using as Custom Element

```html
<preact-dialog open>
  <div slot="header">
    <h2>Custom Header</h2>
  </div>
  
  <p>Main content goes here</p>
  
  <div slot="footer">
    <button>Action</button>
  </div>
</preact-dialog>
```

## Props

### Dialog

- `open?: boolean` - Controls dialog visibility
- `modal?: boolean` - Whether to show as modal
- `id?: string` - ID for targeting with DialogTrigger
- `onDialogOpened?: (e: CustomEvent) => void` - Called when dialog opens
- `onDialogClosed?: (e: CustomEvent) => void` - Called when dialog closes

### DialogTrigger

- `targetDialog: string` - ID of the dialog to open
- `children?: ComponentChildren` - Button content

### DialogClose

- `children?: ComponentChildren` - Button content

### DialogHeader / DialogFooter

- `children?: ComponentChildren` - Content to display

## Slots

The dialog uses three slots for content projection:

1. **header** - Dialog header content
2. **default** - Main dialog body (unnamed slot)
3. **footer** - Dialog footer content

## Events

The custom element dispatches two events:

- `dialog-opened` - Fired when dialog opens
- `dialog-closed` - Fired when dialog closes

```tsx
<Dialog
  onDialogOpened={(e) => console.log('Dialog opened')}
  onDialogClosed={(e) => console.log('Dialog closed')}
>
  Content
</Dialog>
```

## Styling

### Using CSS Parts

```css
preact-dialog::part(container) {
  max-width: 800px;
  border-radius: 12px;
}

preact-dialog::part(header) {
  background-color: #f0f0f0;
  padding: 1.5rem;
}

preact-dialog::part(close-button) {
  color: red;
}
```

### Using :host

```css
preact-dialog {
  --dialog-max-width: 600px;
}
```

## Examples

See the Storybook for more examples:

```bash
npm run storybook
```

Or view the deployed Storybook at:
https://tkottke90.github.io/preact-dialog/

