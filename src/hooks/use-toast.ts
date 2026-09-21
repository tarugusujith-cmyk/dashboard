import * as React from "react";
import type { ToasterToast } from "@/components/ui/toaster";

type Toast = ToasterToast & {
    id: string;
    dismiss: () => void;
    update: (props: Partial<ToasterToast>) => void;
};

type State = {
    toasts: Toast[];
};

type Listener = (state: State) => void;

type ToastStore = {
    state: State;
    listeners: Listener[];
    getState: () => State;
    setState: (nextState: State | ((state: State) => State)) => void;
    subscribe: (listener: Listener) => () => void;
};

const TOAST_LIMIT = 1;

let count = 0;

function generateId(): string {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
}

const toastStore: ToastStore = {
    state: {
        toasts: [],
    },
    listeners: [],

    getState: () => toastStore.state,

    setState: (nextState) => {
        const newState =
            typeof nextState === "function"
                ? nextState(toastStore.state)
                : nextState;
        toastStore.state = { ...toastStore.state, ...newState };
        toastStore.listeners.forEach((listener) => listener(toastStore.state));
    },

    subscribe: (listener) => {
        toastStore.listeners.push(listener);
        return () => {
            toastStore.listeners = toastStore.listeners.filter(
                (l) => l !== listener
            );
        };
    },
};

export const toast = (props: Omit<ToasterToast, "id">) => {
    const id = generateId();

    const update = (props: Partial<ToasterToast>) =>
        toastStore.setState((state) => ({
            ...state,
            toasts: state.toasts.map((t) =>
                t.id === id ? { ...t, ...props } : t
            ),
        }));

    const dismiss = () =>
        toastStore.setState((state) => ({
            ...state,
            toasts: state.toasts.filter((t) => t.id !== id),
        }));

    const toastItem: Toast = {
        ...props,
        id,
        dismiss,
        update,
    };

    toastStore.setState((state) => ({
        ...state,
        toasts: [toastItem, ...state.toasts].slice(0, TOAST_LIMIT),
    }));

    return {
        id,
        dismiss,
        update,
    };
};

export function useToast() {
    const [state, setState] = React.useState<State>(toastStore.getState());

    React.useEffect(() => {
        const unsubscribe = toastStore.subscribe((newState) => {
            setState(newState);
        });
        return unsubscribe;
    }, []);

    React.useEffect(() => {
        const timeouts: NodeJS.Timeout[] = [];

        state.toasts.forEach((toast) => {
            if (toast.duration === Infinity) {
                return;
            }

            const timeout = setTimeout(() => {
                toast.dismiss();
            }, toast.duration || 5000);

            timeouts.push(timeout);
        });

        return () => {
            timeouts.forEach((timeout) => clearTimeout(timeout));
        };
    }, [state.toasts]);

    return {
        toast,
        toasts: state.toasts,
    };
}
