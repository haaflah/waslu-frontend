import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> ;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-24 w-full rounded-md border border-neutral-500 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:bg-neutral-100",
        className
      )}
      {...props}
    />
  );
});
