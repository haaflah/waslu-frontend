import { useEffect, useId, useRef, type ReactNode } from "react";
import { Button } from "./Button";

const CLOSE_ICON = "\u00d7";

export interface SheetProps {
  open: boolean;
  title: string;
  description?: string;
  /** Accessible name for the close button, for example t("common.actions.close"). */
  closeLabel: string;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Sheet({ open, title, description, closeLabel, onOpenChange, children }: SheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    // Remember what had focus, so we can give it back when the sheet closes.
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusTarget = dialog?.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    focusTarget?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Clicking the dark area closes the sheet. Keyboard users have Escape and the close button. */}
      <div aria-hidden="true" className="fixed inset-0 bg-neutral-900/40" onClick={() => onOpenChange(false)} />
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className="relative ml-auto h-full w-full max-w-md space-y-4 bg-white p-4 shadow-lg"
        ref={dialogRef}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="text-sm text-neutral-600" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          <Button aria-label={closeLabel} size="sm" variant="ghost" onClick={() => onOpenChange(false)}>
            {CLOSE_ICON}
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
