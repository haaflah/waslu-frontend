import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> ;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full rounded-md border border-neutral-500 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:bg-neutral-100",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});
