import { Input as HeadlessInput } from "@headlessui/react";
import { cn } from "../../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...props }: InputProps) {
  const classNames = cn(
    "hover:shadow-gray rounded-lg border border-black bg-white px-4 py-2 text-black transition-all duration-300 ease-out placeholder:text-[#837D7D] focus:border-[#4a90e2] focus:shadow-none focus:outline-none focus:placeholder:text-[#4a90e2]",
    className,
  );

  return <HeadlessInput className={classNames} {...props} />;
}
