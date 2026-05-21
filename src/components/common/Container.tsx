import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-6", {
  variants: {
    variant: {
      default: "container",
      narrow: "max-w-4xl",
      wide: "max-w-[1920px]",
      full: "max-w-full",
    },
    size: {
      none: "px-4 lg:px-10",
      sm: "py-4 md:py-6",
      md: "py-8 md:py-12",
      lg: "py-12 md:py-24",
    },
    center: {
      true: "flex flex-col items-center text-center",
      false: "",
    },
  },
  defaultVariants: {
    variant: "wide",
    size: "none",
    center: false,
  },
});

interface ContainerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: React.ReactNode;
}

export default function Container({
  children,
  className,
  variant,
  size,
  center,
  ...props
}: ContainerProps) {
  return (
    <section
      className={cn(containerVariants({ variant, size, center, className }))}
      {...props}
    >
      {children}
    </section>
  );
}
