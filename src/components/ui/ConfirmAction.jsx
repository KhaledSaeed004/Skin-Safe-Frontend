import { cn } from "../../utils/cn";

function ConfirmAction({ children }) {
  return (
    <div className="flex w-[40rem] flex-col gap-5 bg-white p-8">{children}</div>
  );
}

function Title({ children }) {
  return <h3 className="text-xl font-medium">{children}</h3>;
}

function Body({ children }) {
  return <p className="mb-5 text-gray-500">{children}</p>;
}

function Highlight({ children, variant = "default", className = "" }) {
  const base = "font-semibold capitalize";
  const variants = {
    default: "text-gray-900",
    highlighted: "text-primary",
    danger: "text-red-700 uppercase",
  };
  return (
    <span className={cn(base, variants[variant], className)}>{children}</span>
  );
}

function Actions({ children }) {
  return <div className="flex justify-end gap-5">{children}</div>;
}

ConfirmAction.Title = Title;
ConfirmAction.Body = Body;
ConfirmAction.Highlight = Highlight;
ConfirmAction.Actions = Actions;

export default ConfirmAction;
