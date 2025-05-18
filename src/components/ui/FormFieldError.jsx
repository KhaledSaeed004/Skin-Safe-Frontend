import { cn } from "../../utils/cn";

function FormFieldError({ message, className }) {
  return (
    <p className={cn("mt-1 text-sm text-red-500", className)}>{message}</p>
  );
}

export default FormFieldError;
