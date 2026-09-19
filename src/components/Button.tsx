import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses = {
  primary: "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 focus:outline-none shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 focus:ring-4 focus:ring-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-200",
  outline: "border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 focus:ring-4 focus:ring-emerald-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed dark:border-emerald-400 dark:text-emerald-400",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
  ghost: "text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-300 dark:hover:bg-gray-800",
};

const sizeClasses = {
  sm: "h-8 px-3 text-xs rounded-lg",
  md: "h-10 px-5 text-sm rounded-xl",
  lg: "h-12 px-6 text-base rounded-xl",
};

function Spinner() {
  return (
    <span className="inline-flex h-4 w-4 animate-spin items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path d="M12 2a10 10 0 019.95 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out select-none ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {loading && <Spinner />}
      {!loading && iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
      {children}
      {!loading && iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
}
