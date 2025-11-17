# Using HTML Templates with Web Components

This guide explains how HTML templates are used in the `preact-dialog` Web Component.

## What is an HTML Template?

An HTML `<template>` element is a mechanism for holding HTML that is not rendered immediately when the page loads. Instead, it can be cloned and inserted into the DOM later using JavaScript. This is perfect for Web Components!

## How It Works in preact-dialog

### 1. Template Creation

The template is created once when the module loads:

```typescript
const template = document.createElement('template');
template.innerHTML = `
  <style>
    /* Scoped styles for the component */
    :host {
      display: block;
    }
    .dialog-container {
      /* ... styles ... */
    }
  </style>
  
  <div class="dialog-container">
    <div class="dialog-header">
      <slot name="header">
        <h2>Dialog Title</h2>
      </slot>
      <button class="close-button">×</button>
    </div>
    
    <div class="dialog-body">
      <slot></slot>
    </div>
    
    <div class="dialog-footer">
      <slot name="footer"></slot>
    </div>
  </div>
`;
```

### 2. Template Cloning

In the constructor, the template content is cloned into the shadow DOM:

```typescript
constructor() {
  super();
  const shadow = this.attachShadow({ mode: "open" });
  
  // Clone the template content
  const content = template.content.cloneNode(true);
  shadow.appendChild(content);
}
```

## Key Concepts

### Shadow DOM

The template is inserted into a **Shadow DOM**, which provides:
- **Style encapsulation**: Styles inside don't leak out, styles outside don't leak in
- **DOM encapsulation**: Internal structure is hidden from the main document
- **Composition**: Content can be projected using slots

### Slots

Slots are placeholders that allow users to insert their own content:

```html
<!-- Named slot for header -->
<slot name="header">
  <h2>Default Header</h2>
</slot>

<!-- Default slot for main content -->
<slot></slot>

<!-- Named slot for footer -->
<slot name="footer"></slot>
```

### Using Slots

```tsx
<Dialog>
  <DialogHeader>
    <h2>My Custom Header</h2>
  </DialogHeader>
  
  <p>This goes in the default slot</p>
  
  <DialogFooter>
    <button>OK</button>
  </DialogFooter>
</Dialog>
```

Or with plain HTML:

```html
<preact-dialog>
  <div slot="header">
    <h2>My Custom Header</h2>
  </div>
  
  <p>This goes in the default slot</p>
  
  <div slot="footer">
    <button>OK</button>
  </div>
</preact-dialog>
```

## Benefits of Using Templates

1. **Performance**: Template is created once and cloned for each instance
2. **Reusability**: Same template structure for all dialog instances
3. **Maintainability**: Template structure is defined in one place
4. **Encapsulation**: Styles and structure are scoped to the component

## Styling with ::part

The template uses the `part` attribute to expose styling hooks:

```html
<div class="dialog-container" part="container">
  <div class="dialog-header" part="header">
    <!-- ... -->
  </div>
</div>
```

Users can style these parts from outside:

```css
preact-dialog::part(container) {
  max-width: 800px;
}

preact-dialog::part(header) {
  background-color: #f0f0f0;
}
```

## Modifying the Template

To customize the template structure:

1. Edit the `template.innerHTML` in `src/components/Dialog.tsx`
2. Update styles within the `<style>` tag
3. Add or modify slots as needed
4. Update the component class to handle new elements

Example - Adding a new slot:

```typescript
template.innerHTML = `
  <style>/* ... */</style>
  
  <div class="dialog-container">
    <!-- Add new slot -->
    <div class="dialog-subtitle" part="subtitle">
      <slot name="subtitle"></slot>
    </div>
    <!-- ... rest of template ... -->
  </div>
`;
```

Then use it:

```tsx
<Dialog>
  <DialogHeader>Title</DialogHeader>
  <div slot="subtitle">Subtitle text</div>
  <p>Content</p>
</Dialog>
```

