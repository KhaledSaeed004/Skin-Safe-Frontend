import { cn } from "../../utils/cn";

type DividerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  orientation?: "horizontal" | "vertical";
};

function Divider({
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  const orientationClasses =
    orientation === "vertical" ? "mx-4 w-px self-stretch" : "my-4 h-px w-full";

  return (
    <div
      {...props}
      className={cn("flex-shrink-0 bg-gray-200", orientationClasses, className)}
    />
  );
}

export default Divider;
