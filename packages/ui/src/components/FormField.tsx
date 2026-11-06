import { type ReactNode, useId } from "react";

const REQUIRED_MARK = "*";

export interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (ids: { fieldId: string; hintId: string | undefined; errorId: string | undefined }) => ReactNode;
}

export function FormField({ label, hint, error, required, children }: FormFieldProps) {
  const fieldId = useId();
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className="space-y-1">
      <label htmlFor={fieldId} className="block text-sm font-medium text-neutral-900">
        {label}
        {required ? <span aria-hidden="true" className="ml-1 text-danger-700">
            {REQUIRED_MARK}
          </span> : null}
      </label>
      {children({ fieldId, hintId, errorId })}
      {hint ? (
        <p id={hintId} className="text-xs text-neutral-600">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs text-danger-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
