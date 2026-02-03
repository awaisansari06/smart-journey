import React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "gradient" | "outline" | "ghost";
};

export default function GradientButton({
    className,
    variant = "gradient",
    ...props
}: Props) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                variant === "gradient" &&
                "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-xl shadow-orange-300/40 ring-1 ring-white/30 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 hover:shadow-2xl hover:shadow-pink-400/30 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-300",
                variant === "outline" &&
                "border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900",
                variant === "ghost" &&
                "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
                className
            )}
            {...props}
        />
    );
}
