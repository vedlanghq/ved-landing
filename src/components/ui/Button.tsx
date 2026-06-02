import React from "react";
import Link from "next/link";
import { MagneticButton } from "./MagneticButton";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: Readonly<ButtonProps>) {
  const baseStyles =
    "px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider transition-colors inline-block text-center";
  const variants = {
    primary: "bg-lexum-accent text-lexum-text hover:bg-orange-600",
    outline: "border border-lexum-border text-lexum-text hover:bg-lexum-border",
  };

  if (props.href) {
    return (
      <MagneticButton>
        <Link
          href={props.href}
          target={props.target}
          rel={props.rel}
          className={`${baseStyles} ${variants[variant]} ${className}`}
        >
          {children}
        </Link>
      </MagneticButton>
    );
  }

  return (
    <MagneticButton>
      <button
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    </MagneticButton>
  );
}
