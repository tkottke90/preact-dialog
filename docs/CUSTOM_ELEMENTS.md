# Custom Elements

This library supports using the Dialog component as a custom element (Web Component).

## Type Declarations

The custom element `<preact-dialog>` is registered in TypeScript through the `src/jsx.d.ts` file, which extends Preact's JSX namespace to include the custom element definition.

### How It Works

The type declaration file (`src/jsx.d.ts`) augments the Preact module:

```typescript
import 'preact';

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'preact-dialog': HTMLAttributes<HTMLElement> & {
        open?: boolean;
        modal?: boolean;
      };
    }
  }
}
```

This tells TypeScript that `<preact-dialog>` is a valid JSX element and defines its available attributes.

## Registering the Custom Element

To use the Dialog as a custom element, you need to register it first:

```typescript
import { registerDialogElement } from 'preact-dialog';

// Register the custom element
registerDialogElement();
```

After registration, you can use it in your JSX/TSX:

```tsx
function App() {
  return (
    <div>
      <preact-dialog open modal>
        Dialog content here
      </preact-dialog>
    </div>
  );
}
```

Or in plain HTML:

```html
<preact-dialog open>
  Dialog content here
</preact-dialog>
```

## Adding Custom Attributes

To add more custom attributes to the `<preact-dialog>` element:

1. Update `src/jsx.d.ts` to include the new attributes:

```typescript
interface IntrinsicElements {
  'preact-dialog': HTMLAttributes<HTMLElement> & {
    open?: boolean;
    modal?: boolean;
    'aria-label'?: string;  // Add new attribute
    size?: 'small' | 'medium' | 'large';  // Add new attribute
  };
}
```

2. Update the `DialogProps` interface in `src/components/Dialog.tsx`:

```typescript
export interface DialogProps {
  children?: ComponentChildren;
  open?: boolean;
  modal?: boolean;
  'aria-label'?: string;
  size?: 'small' | 'medium' | 'large';
}
```

3. Update the custom element registration in `src/components/register-dialog.ts` to handle the new attributes.

## TypeScript Configuration

The type declarations are automatically picked up by TypeScript because:

1. The `src/jsx.d.ts` file is in the `src` directory
2. `tsconfig.app.json` includes the `src` directory: `"include": ["src"]`
3. The file uses module augmentation to extend Preact's types

No additional TypeScript configuration is needed!

## Best Practices

1. **Always register before use**: Call `registerDialogElement()` before rendering any components that use `<preact-dialog>`
2. **Register once**: The registration function checks if the element is already registered to avoid errors
3. **Type safety**: Use TypeScript to get autocomplete and type checking for custom element attributes
4. **Attribute naming**: Use kebab-case for HTML attributes and camelCase for JSX props

