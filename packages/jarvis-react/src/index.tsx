import * as React from 'react';

type EventBridgeMap<TElement extends HTMLElement> = Record<
  string,
  (event: Event, element: TElement) => void
>;

type CommonProps<T> = Omit<React.HTMLAttributes<T>, 'onChange' | 'children'> & {
  children?: React.ReactNode;
};

type CustomElementProps<TElement extends HTMLElement, TEvents extends object = {}> = CommonProps<TElement> &
  React.RefAttributes<TElement> &
  TEvents;

let registered = false;

export async function ensureJarvisReact(): Promise<void> {
  if (registered || typeof window === 'undefined' || typeof customElements === 'undefined') {
    return;
  }

  registered = true;
}

function mergeRefs<T>(refs: Array<React.Ref<T> | undefined>, value: T): void {
  refs.forEach((ref) => {
    if (!ref) {
      return;
    }

    if (typeof ref === 'function') {
      ref(value);
    } else {
      (ref as React.MutableRefObject<T>).current = value;
    }
  });
}

function createComponent<T extends HTMLElement, TEvents extends object = {}>(
  tagName: string,
  eventBridgeMap: EventBridgeMap<T> = {}
) {
  return React.forwardRef<T, CustomElementProps<T, TEvents>>(function JarvisReactComponent(props, ref) {
    const localRef = React.useRef<T | null>(null);
    const { children, ...rest } = props as CustomElementProps<T, TEvents> & { children?: React.ReactNode };

    React.useEffect(() => {
      const element = localRef.current;
      if (!element) {
        return;
      }

      const listeners = Object.entries(eventBridgeMap)
        .map(([propName, listenerFactory]) => {
          const handler = (props as Record<string, unknown>)[propName];
          if (typeof handler !== 'function') {
            return null;
          }

          const eventName = propName.slice(2);
          const domEventName = eventName.charAt(0).toLowerCase() + eventName.slice(1);
          const listener = (event: Event) => listenerFactory(event, element);
          const bridged = (event: Event) => (handler as (event: Event) => void)(event);
          const composedListener = (event: Event) => {
            listener(event);
            bridged(event);
          };
          element.addEventListener(domEventName, composedListener);
          return { domEventName, composedListener };
        })
        .filter(Boolean) as Array<{ domEventName: string; composedListener: (event: Event) => void }>;

      return () => {
        listeners.forEach(({ domEventName, composedListener }) => {
          element.removeEventListener(domEventName, composedListener);
        });
      };
    }, [props]);

    return React.createElement(tagName, {
      ...rest,
      ref: (value: T) => {
        localRef.current = value;
        mergeRefs([ref], value);
      }
    }, children);
  });
}

export type JarvisInputEvent = CustomEvent<{ value: string }>;
export type JarvisChangeEvent = CustomEvent<{ value?: string; checked?: boolean }>;
export type JarvisSelectEvent = CustomEvent<{ value: string }>;
export type JarvisPageChangeEvent = CustomEvent<{ page: number }>;

export type JarvisButtonProps = CustomElementProps<HTMLButtonElement, {
  onJarvisClick?: (event: Event) => void;
}>;

export type JarvisInputProps = CustomElementProps<HTMLInputElement, {
  onJarvisInput?: (event: JarvisInputEvent) => void;
}>;

export type JarvisComboboxProps = CustomElementProps<HTMLElement, {
  onJarvisChange?: (event: JarvisChangeEvent) => void;
}>;

export type JarvisDropdownMenuProps = CustomElementProps<HTMLElement, {
  onJarvisSelect?: (event: JarvisSelectEvent) => void;
}>;

export type JarvisPaginationProps = CustomElementProps<HTMLElement, {
  onJarvisPageChange?: (event: JarvisPageChangeEvent) => void;
}>;

export const JarvisButton = createComponent<HTMLButtonElement, JarvisButtonProps>('jarvis-button');
export const JarvisInput = createComponent<HTMLInputElement, JarvisInputProps>('jarvis-input');
export const JarvisCard = createComponent<HTMLElement>('jarvis-card');
export const JarvisDialog = createComponent<HTMLElement>('jarvis-dialog');
export const JarvisStack = createComponent<HTMLElement>('jarvis-stack');
export const JarvisGrid = createComponent<HTMLElement>('jarvis-grid');
export const JarvisSection = createComponent<HTMLElement>('jarvis-section');
export const JarvisPagination = createComponent<HTMLElement, JarvisPaginationProps>('jarvis-pagination');
export const JarvisCombobox = createComponent<HTMLElement, JarvisComboboxProps>('jarvis-combobox');
export const JarvisDropdownMenu = createComponent<HTMLElement, JarvisDropdownMenuProps>('jarvis-dropdown-menu');
export const JarvisDrawer = createComponent<HTMLElement>('jarvis-drawer');
export const JarvisPopover = createComponent<HTMLElement>('jarvis-popover');
export const JarvisToast = createComponent<HTMLElement>('jarvis-toast');

export const reactIntegrationNotes = {
  ssr: 'Call ensureJarvisReact() on the client before relying on custom element upgrades.',
  events: ['onJarvisInput', 'onJarvisChange', 'onJarvisSelect', 'onJarvisPageChange'],
  forms: 'Use controlled wrappers where needed by listening to Jarvis custom events and updating React state.'
} as const;

export const reactUsageExample = `
import { useEffect } from 'react';
import { ensureJarvisReact, JarvisButton, JarvisSection, JarvisCombobox, JarvisInput } from '@jarvis/react';

export function AccountPage() {
  useEffect(() => {
    ensureJarvisReact();
  }, []);

  return (
    <JarvisSection heading="Profile">
      <JarvisInput label="Email" helpText="We only use this for account notifications." />
      <JarvisCombobox label="Role" options="Admin,Editor,Viewer" onJarvisChange={(event) => console.log(event.detail.value)} />
      <JarvisButton>Save changes</JarvisButton>
    </JarvisSection>
  );
}
`;
