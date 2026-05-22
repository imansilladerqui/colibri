import { cn } from "@/lib/utils";
import { HummingbirdIcon } from "@/components/ui/hummingbird-icon";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return <HummingbirdIcon className={cn("h-9 w-auto", className)} />;
};
