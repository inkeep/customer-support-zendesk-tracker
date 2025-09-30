"use client";

import clsx from "clsx";

type ButtonVariant =
  | "primary"
  | "primary-light"
  | "secondary"
  | "tertiary"
  | "outline"
  | "minimal"
  | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  // Base classes that apply to all variants
  const baseClasses = clsx(
    "flex items-center gap-2 transition-all duration-200 ease-in-out",
    "outline-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
    "disabled:hover:transform-none disabled:hover:shadow-none"
  );

  // Border radius variations
  const getRadiusClasses = () => {
    if (variant === "outline") {
      return "rounded";
    } else if (variant === "tertiary") {
      return "rounded-[10px]";
    } else if (variant === "icon") {
      return "rounded-full";
    } else {
      return "rounded-full";
    }
  };

  // Dimension classes
  const getDimensionClasses = () => {
    if (variant === "minimal") {
      return "h-auto px-0";
    } else if (variant === "outline") {
      return "py-[13px] px-5";
    } else if (variant === "tertiary") {
      return "py-[13px] px-[14px]";
    } else if (variant === "icon") {
      return "p-2";
    } else {
      return "h-12 px-4";
    }
  };

  // Typography classes
  const getTextClasses = () => {
    if (variant === "primary") {
      return "text-white text-xs sm:text-base font-medium leading-[115%] tracking-[-0.96px] uppercase";
    } else if (variant === "primary-light") {
      return "text-primary-dark text-xs sm:text-base font-medium leading-[115%] tracking-[-0.96px] uppercase";
    } else if (variant === "secondary") {
      return "text-primary-text text-sm sm:text-base font-medium leading-[115%] tracking-[-0.64px] uppercase";
    } else if (variant === "tertiary") {
      return "text-primary-text text-base font-normal leading-[115%] tracking-[-0.64px] uppercase";
    } else if (variant === "outline") {
      return "text-primary text-sm sm:text-base font-normal leading-[115%] tracking-normal";
    } else if (variant === "minimal") {
      return "text-primary-text text-base sm:text-xl font-normal leading-[115%] tracking-[-0.8px]";
    } else if (variant === "icon") {
      return "text-primary-text text-sm font-medium leading-[115%] tracking-[-0.64px]";
    } else {
      return "text-primary-text text-sm sm:text-base font-normal leading-normal tracking-normal";
    }
  };

  // Variant-specific classes
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-primary hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5",
    "primary-light":
      "bg-primary-lighter hover:bg-primary-dark hover:text-white hover:shadow-lg hover:-translate-y-0.5",
    secondary:
      "bg-surface-alt border border-primary-text hover:bg-primary-lighter hover:border-primary hover:text-primary-dark",
    tertiary:
      "bg-surface-alt border border-primary-text hover:bg-primary-lighter hover:border-primary hover:text-primary-dark",
    outline:
      "bg-transparent border border-primary hover:bg-primary hover:text-white",
    minimal:
      "relative bg-transparent border-none hover:text-primary underline-offset-4 hover:underline",
    icon:
      "bg-transparent hover:opacity-80 hover:shadow-md",
  };

  // Combine all classes
  const buttonClasses = `${baseClasses} ${getRadiusClasses()} ${getDimensionClasses()} ${getTextClasses()} ${
    variantClasses[variant]
  } ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-[1] whitespace-nowrap font-jet-brains">{children}</span>
    </button>
  );
};

export default Button;
