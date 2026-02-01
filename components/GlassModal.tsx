import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GlassModalProps {
    /**
     * Controls the open/closed state of the modal
     */
    isOpen: boolean;

    /**
     * Callback fired when the modal requests to close
     * (via ESC key, backdrop click, or close button)
     */
    onClose: () => void;

    /**
     * Optional title displayed in the header
     */
    title?: React.ReactNode;

    /**
     * Optional description text for accessibility and context
     */
    description?: string;

    /**
     * The content to display inside the modal
     */
    children: React.ReactNode;

    /**
     * Optional class name to override styles
     */
    className?: string;
}

/**
 * GlassModal
 * A reusable modal component with glassmorphism styling.
 * 
 * Features:
 * - Centered layout
 * - Rounded 2xl corners
 * - Backdrop blur
 * - Semi-transparent background
 * - Scroll locking (handled by Radix UI/Shadcn)
 * - Accessibility (ARIA)
 */
export function GlassModal({
    isOpen,
    onClose,
    title,
    description,
    children,
    className,
}: GlassModalProps) {
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent
                className={cn(
                    // Layout & Shape
                    "sm:max-w-lg w-[95%] rounded-2xl p-0 overflow-hidden",

                    // Glassmorphism Visuals
                    "bg-white/80 dark:bg-zinc-950/80", // Semi-transparent background
                    "backdrop-blur-md", // Content blur
                    "border-white/20 dark:border-zinc-800/50", // Subtle border
                    "shadow-2xl shadow-black/10", // Soft shadow

                    // Animation (Derived from shadcn default, enhanced here if needed)
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                    "duration-200",

                    className
                )}
            >
                {(title || description) ? (
                    <DialogHeader className="px-6 pt-6 pb-2">
                        {title && <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>}
                        {description && (
                            <DialogDescription className="text-gray-500 dark:text-gray-400">
                                {description}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                ) : (
                     <DialogTitle className="sr-only">Dialog</DialogTitle>
                )}

                <div className={cn("relative", (title || description) ? "px-6 pb-6" : "")}>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}
