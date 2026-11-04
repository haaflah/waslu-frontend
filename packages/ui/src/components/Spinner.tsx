import { type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function Spinner({ className, label = "Loading", ...props }: SpinnerProps) {
  return (
    <div aria-label={label} aria-live="polite" role="status" {...props}>
      <div className={cn("h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-brand-600", className)} />
    </div>
  );
}
