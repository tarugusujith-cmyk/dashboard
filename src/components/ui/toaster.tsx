import * as React from "react";

import {
    Toast,
    ToastClose,
    ToastDescription,
    type ToastProps,
    ToastProvider,
    ToastTitle,
    ToastViewport,
    type ToastActionElement,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

export type ToasterToast = Pick<
    ToastProps,
    "variant" | "onOpenChange" | "defaultOpen" | "open" | "duration"
> & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
};

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(
                ({
                    id,
                    title,
                    description,
                    action,
                    dismiss,
                    update,
                    ...props
                }) => {
                    void dismiss;
                    void update;
                    return (
                        <Toast key={id} {...props}>
                            <div className="grid gap-1">
                                {title && <ToastTitle>{title}</ToastTitle>}
                                {description && (
                                    <ToastDescription>
                                        {description}
                                    </ToastDescription>
                                )}
                            </div>
                            {action}
                            <ToastClose />
                        </Toast>
                    );
                }
            )}
            <ToastViewport />
        </ToastProvider>
    );
}
