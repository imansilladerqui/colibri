import { cn } from "@/lib/utils";
import { HUMMINGBIRD_PATHS } from "@/components/ui/hummingbird-paths";

interface HummingbirdIconProps {
  className?: string;
  title?: string;
}

export const HummingbirdIcon = ({
  className,
  title = "Estudio Colibrí",
}: HummingbirdIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1255 836"
      className={cn("h-9 w-auto", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <g dangerouslySetInnerHTML={{ __html: HUMMINGBIRD_PATHS }} />
    </svg>
  );
};
