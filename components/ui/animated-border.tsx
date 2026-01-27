import React from "react";

export default function AnimatedBorder({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`relative p-[2px] rounded-3xl overflow-hidden ${className}`}>
            <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 animate-[spin_4s_linear_infinite] opacity-70" />
            <div className="relative rounded-3xl bg-white dark:bg-black h-full w-full">{children}</div>
        </div>
    );
}
