import { Input } from "@/components/ui/input";
import { cn } from "cn";

interface IconInputProps extends React.ComponentProps<typeof Input> {
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}
export default function IconsPayment({ icon, trailingIcon, className, ...props }: IconInputProps) {
  return (
    <div className="relative">
      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-3.5">
          {icon}
        </span>
      )}
      <Input
        className={cn(
          "h-12 rounded-lg border-gray-200 bg-white text-xs shadow-none placeholder:text-gray-400",
          icon && "pl-9",
          trailingIcon && "pr-9",
          className
        )}
        {...props}
      />
      {trailingIcon && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-3.5">
          {trailingIcon}
        </span>
      )}
    </div>
  );
}