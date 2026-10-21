
import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";

type InputProps = React.ComponentProps<typeof InputPrimitive> & {
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
  wrapperClassName?: string;
  containerClassName?: string;
};

function Input({
  label,
  startIcon,
  endIcon,
  error,
  id,
  className,
  wrapperClassName,
  containerClassName,
  disabled,
  type = "text",
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const describedBy =
    [props["aria-describedby"], error ? errorId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={cn("w-full space-y-2", wrapperClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-lg font-medium text-gray-800 leading-5 "
        >
          {label}
          {props.required && (
            <span className="ms-1 text-destructive">*</span>
          )}
        </label>
      )}

      <div
        className={cn(
          "flex h-10 w-full items-center gap-2 rounded-lg border border-input bg-background px-3 transition-colors",
          "focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20",
          error &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
          disabled && "cursor-not-allowed opacity-50",
          containerClassName,
        )}
      >
        {startIcon && (
          <span
            aria-hidden="true"
            className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4"
          >
            {startIcon}
          </span>
        )}

        <InputPrimitive
          {...props}
          id={inputId}
          type={type}
          disabled={disabled}
          data-slot="input"
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={describedBy}
          className={cn(
            "h-full min-w-0 flex-1 border-0 bg-transparent px-0 py-0 text-sm text-foreground shadow-none outline-none",
            "placeholder:text-muted-foreground",
            "focus-visible:border-transparent focus-visible:ring-0",
            "disabled:cursor-not-allowed",
            className,
          )}
        />

        {endIcon && (
          <span
            aria-hidden="true"
            className="flex shrink-0 items-center text-muted-foreground [&_svg]:size-4"
          >
            {endIcon}
          </span>
        )}
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export { Input };
export type { InputProps };
