import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "danger";
}

const buttonVariants = cva(
  "min-w-[120px] cursor-pointer min-h-10 rounded-md border border-transparent transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        primary:
          "bg-[#4a90e2] text-white hover:shadow-primary active:border active:border-[#4a90e2] active:bg-white active:text-[#4a90e2] active:shadow-none",
        secondary:
          "bg-white text-[#4a90e2] border border-[#4a90e2] hover:shadow-secondary active:border-transparent active:bg-[#4a90e2] active:text-white active:shadow-none",
        danger: "bg-[#e53434] text-white",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export default function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props} />
  );
}

Button.displayName = "Button";
