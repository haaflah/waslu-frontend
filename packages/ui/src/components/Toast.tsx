import { type ReactNode } from "react";
import { Button } from "./Button";

const CLOSE_ICON = "\u00d7";

export interface ToastProps {
  open: boolean;
  title: string;
  description?: ReactNode;
  status?: "info" | "success" | "warning" | "error";
  /** Accessible name for the dismiss button, for example t("common.actions.dismiss"). */
  dismissLabel: string;
  onDismiss: () => void;
}

const statusStyles: Record<NonNullable<ToastProps["status"]>, string> = {
  info: "border-brand-200 bg-brand-50 text-brand-900",
  success: "border-success-100 bg-success-100 text-success-700",
  warning: "border-warning-100 bg-warning-100 text-warning-700",
  error: "border-danger-100 bg-danger-100 text-danger-700"
};

export function Toast({ open, title, description, status = "info", dismissLabel, onDismiss }: ToastProps) {
  if (!open) return null;

  return (
    <div
      aria-live={status === "error" ? "assertive" : "polite"}
      className={`fixed bottom-4 right-4 max-w-sm rounded-md border p-3 shadow-md ${statusStyles[status]}`}
      role={status === "error" ? "alert" : "status"}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium">{title}</p>
          {description ? <p className="mt-1 text-sm">{description}</p> : null}
        </div>
        <Button aria-label={dismissLabel} size="sm" variant="ghost" onClick={onDismiss}>
          {CLOSE_ICON}
        </Button>
      </div>
    </div>
  );
}
