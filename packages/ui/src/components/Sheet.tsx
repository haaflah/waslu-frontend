import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "./Button";

export interface SheetProps {
  open: boolean;
  title: string;
  description?: string;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Sheet({ open, title, description, onOpenChange, children }: SheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    const focusTarget = dialog?.querySelector<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    focusTarget?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        aria-label="Close sheet"
        className="fixed inset-0 bg-neutral-900/40"
        onClick={() => onOpenChange(false)}
        type="button"
      />
      <div
        aria-describedby={description ? "sheet-description" : undefined}
        aria-labelledby="sheet-title"
        aria-modal="true"
        className="relative ml-auto h-full w-full max-w-md space-y-4 bg-white p-4 shadow-lg"
        ref={dialogRef}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900" id="sheet-title">
              {title}
            </h2>
            {description ? (
              <p className="text-sm text-neutral-600" id="sheet-description">
                {description}
              </p>
            ) : null}
          </div>
          <Button aria-label="Dismiss" size="sm" variant="ghost" onClick={() => onOpenChange(false)}>
            ×
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
