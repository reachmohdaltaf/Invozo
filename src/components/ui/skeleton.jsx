import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse  rounded-md bg-blue-600", className)}
      {...props} />)
  );
}

export { Skeleton }
