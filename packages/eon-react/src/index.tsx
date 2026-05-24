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

export async function ensureEonReact(): Promise<void> {
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
  return React.forwardRef<T, CustomElementProps<T, TEvents>>(function EonReactComponent(props, ref) {
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

export type EonInputEvent = CustomEvent<{ value: string }>;
export type EonChangeEvent = CustomEvent<{ value?: string; checked?: boolean }>;
export type EonSelectEvent = CustomEvent<{ value: string }>;
export type EonPageChangeEvent = CustomEvent<{ page: number }>;

export type EonButtonProps = CustomElementProps<HTMLButtonElement, {
  onEonClick?: (event: Event) => void;
}>;

export type EonInputProps = CustomElementProps<HTMLInputElement, {
  onEonInput?: (event: EonInputEvent) => void;
}>;

export type EonComboboxProps = CustomElementProps<HTMLElement, {
  onEonChange?: (event: EonChangeEvent) => void;
}>;

export type EonDropdownMenuProps = CustomElementProps<HTMLElement, {
  onEonSelect?: (event: EonSelectEvent) => void;
}>;

export type EonPaginationProps = CustomElementProps<HTMLElement, {
  onEonPageChange?: (event: EonPageChangeEvent) => void;
}>;

export const EonButton = createComponent<HTMLButtonElement, EonButtonProps>('eon-button');
export const EonInput = createComponent<HTMLInputElement, EonInputProps>('eon-input');
export const EonCard = createComponent<HTMLElement>('eon-card');
export const EonDialog = createComponent<HTMLElement>('eon-dialog');
export const EonStack = createComponent<HTMLElement>('eon-stack');
export const EonGrid = createComponent<HTMLElement>('eon-grid');
export const EonSection = createComponent<HTMLElement>('eon-section');
export const EonPagination = createComponent<HTMLElement, EonPaginationProps>('eon-pagination');
export const EonCombobox = createComponent<HTMLElement, EonComboboxProps>('eon-combobox');
export const EonDropdownMenu = createComponent<HTMLElement, EonDropdownMenuProps>('eon-dropdown-menu');
export const EonDrawer = createComponent<HTMLElement>('eon-drawer');
export const EonPopover = createComponent<HTMLElement>('eon-popover');
export const EonToast = createComponent<HTMLElement>('eon-toast');

export const reactIntegrationNotes = {
  ssr: 'Call ensureEonReact() on the client before relying on custom element upgrades.',
  events: ['onEonInput', 'onEonChange', 'onEonSelect', 'onEonPageChange'],
  forms: 'Use controlled wrappers where needed by listening to Eon custom events and updating React state.'
} as const;

export const reactUsageExample = `
import { useEffect } from 'react';
import { ensureEonReact, EonButton, EonSection, EonCombobox, EonInput } from '@eonui/react';

export function AccountPage() {
  useEffect(() => {
    ensureEonReact();
  }, []);

  return (
    <EonSection heading="Profile">
      <EonInput label="Email" helpText="We only use this for account notifications." />
      <EonCombobox label="Role" options="Admin,Editor,Viewer" onEonChange={(event) => console.log(event.detail.value)} />
      <EonButton>Save changes</EonButton>
    </EonSection>
  );
}
`;
