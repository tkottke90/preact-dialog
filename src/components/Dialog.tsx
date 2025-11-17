import { cloneElement } from 'preact';
import { Fragment, useCallback, useRef } from "preact/compat";
import { useEffect } from 'preact/hooks';
import type { BaseProps } from "../lib/base";
import { createContextWithHook } from "../lib/helpers";

// Create the template element
const template = document.createElement("template");
template.innerHTML = `
  <style>

    dialog {
      background: var(--preact-dialog__bg, #efefef);
      color: var(--preact-dialog_fg, #222);

      border:
        var(--preact-dialog__border-width, 1px)
        var(--preact-dialog__border-style, solid)
        var(--preact-dialog__border-color, #AAA);
      
      border-radius: var(--preact-dialog__border-radius, 4px);

      width: var(--preact-dialog__width, fit-content);
      height: var(--preact-dialog__height, fit-content);

      min-width: var(--preact-dialog__width_min, 300px);
      max-width: var(--preact-dialog__width_max, 50vw);
    }

    dialog::backdrop {
      background: var(--preact-dialog__backdrop_bg, #333);
      opacity: var(--preact-dialog__backdrop_opacity, 50%);
    }

    dialog[data-pos="top"] {
      margin-top: 1rem;
    }

    #dialog__close-top {
      display: flex;
      justify-content: flex-end;
    }

    #dialog__content {
      width: 100%;
      height: 100%;
    }
  </style>

  <slot name="trigger">
    <button id="dialog__default-open">Open</button>
  </slot>
  <dialog>
    <div id="dialog__close-top">
      <slot name="close-top"></slot>  
    </div>
    <slot name="header"></slot>

    <div id="dialog__content">
      <slot></slot>
    </div>

    <slot name="footer"></slot>
  </dialog>
`;

export class PreactDialog extends HTMLElement {
  private container: HTMLElement | null = null;
  private dialog: HTMLDialogElement | null = null;
  private dismissible: boolean = true;
  private defaultOpen: HTMLButtonElement | null = null;
  private position: 'center' | 'top' = 'center';

  private abortCtrl = new AbortController();

  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Clone the template content and append to shadow root
    const content = template.content.cloneNode(true);
    shadow.appendChild(content);

    // Get references to elements
    this.dialog = shadow.querySelector('dialog');
    this.defaultOpen = shadow.querySelector('#dialog__default-open')
  }

  connectedCallback() {
    if (!this.dialog) return;

    this.dialog.dataset.pos = this.position;

    // Apply className if it exists
    const className = this.getAttribute('class') ?? this.getAttribute('className');
    if (className && !this.dialog.classList.contains(className)) {
      this.dialog.classList.add(className);
    }

    this.dialog.addEventListener('click', (evt) => {
      if (!this.dialog) return;
      
      // Get bounding box
      const modalBox = this.dialog.getBoundingClientRect();

      // Calculate if it it was inside the modal
      const clickWasInside = [
        evt.clientX > modalBox.left &&   // To the right of the left boundary
        evt.clientX < modalBox.right &&  // To the left of the right boundary
        evt.clientY > modalBox.top &&    // Below the top boundary
        evt.clientY < modalBox.bottom    // Above the bottom boundary
      ].every(Boolean)

      // Check if the click happened inside the modal
      if (!clickWasInside && this.dismissible) {
        this.close();
      }
    }, { signal: this.abortCtrl.signal });

    if (this.defaultOpen) {
      this.defaultOpen.addEventListener('click', () => this.open(), { signal: this.abortCtrl.signal });
    }

    // Check for open attribute
    if (this.hasAttribute("open")) {
      this.open();
    }

    // Initially hide the dialog
    if (this.container && !this.hasAttribute("open")) {
      this.container.style.display = "none";
    }
  }

  disconnectedCallback() {
    // Clean up event listeners
    this.abortCtrl.abort();
  }

  // Observe attribute changes
  static get observedAttributes() {
    return ['open', 'position'];
  }

  attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null) {
    if (name === "open") {
      if (newValue !== null) {
        this.open();
      } else {
        this.close();
      }
    }

    if (this.dialog && name === 'position') {
      this.dialog.dataset.pos = newValue ?? 'center';
    }

    if (this.dialog && name === 'class') {
      this.dialog.className = newValue ?? '';
    }
  }

  close() {
    if (this.dialog) {
      this.dialog.close();
    }
  }

  open() {
    if (this.dialog) {
      this.dialog.showModal();
    }
  }

  // Public methods
  toggle() {
    if (!this.dialog) return;

    if (this.dialog.open) {
      this.close();
    } else {
      this.open();
    }
  }
}


if (!customElements.get('preact-dialog')) {
  customElements.define("preact-dialog", PreactDialog);
}

export interface DialogProps extends BaseProps {
  open?: boolean;
  modal?: boolean;
  dismissible?: boolean;
  position?: 'center' | 'top';
}

export interface DialogHeaderProps extends BaseProps {}

export interface DialogFooterProps extends BaseProps {}

export interface DialogTriggerProps extends BaseProps {}

export interface DialogCloseProps extends BaseProps {}

const { Provider, useHook } = createContextWithHook<{
  open: () => void;
  close: () => void;
}>()

/**
 * Hook for the Dialog Component to access the internals and controls
 */
export const useDialog = useHook;

/**
 * Dialog component using 
 */
export function Dialog({ children, ...props }: DialogProps) {
  const ref = useRef<PreactDialog>(null);
  const { className, id, ...otherProps } = props;

  const open = useCallback(() => {
    if (!ref.current) return;

    ref.current.open();
  }, [ ref ])

  const close = useCallback(() => {
    if (!ref.current) return;

    ref.current.close();
  }, [ ref ])

  return (
    <Provider value={{
      open,
      close
    }}>
      <preact-dialog ref={ref} {...otherProps} class={className ?? ''} className={className} id={id} >
        {children}
      </preact-dialog>
    </Provider>
  )
};

export function DialogHeader({ children }: DialogHeaderProps) {
  return <div slot="header">{children}</div>;
}

export function DialogFooter({ children }: DialogFooterProps) {
  return <div slot="footer">{children}</div>;
}

export function DialogTrigger({ children, className }: DialogTriggerProps) {
  const { open } = useDialog();

  // If no children, render default
  if (!children) {
    return <button className={className} slot="trigger" onClick={open}>
      Open Dialog
    </button>;
  }

  // If children are an array or primitive, wrap in a button
  if (Array.isArray(children) || typeof children !== 'object') {
    return <button className={className} slot="trigger" onClick={open}>
      {children}
    </button>;
  }

  if ('props' in children) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
      if (!ref.current) return;

      const abortCtrl = new AbortController();

      ref.current.addEventListener('click', open, { signal: abortCtrl.signal });

      return () => abortCtrl.abort();
    }, [ children ]);

    return cloneElement(children, { ref })
  }
  
  return (<Fragment>{children}</Fragment>)
}

export function DialogClose({ children }: DialogCloseProps) {
  const { close } = useDialog();

  if (!children) {
    return <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} slot="close-top" onClick={close}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--preact-dialog_fg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>;
  }

  return (<Fragment>{children}</Fragment>)
}
