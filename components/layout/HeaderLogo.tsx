import Image from "next/image";
import { Link } from "@/navigation";

interface HeaderLogoProps {
  slogan: string;
}

export default function HeaderLogo({ slogan }: HeaderLogoProps) {
  return (
    <Link
      href="/"
      className="flex min-w-0 max-w-[min(100%,22rem)] flex-col items-center gap-1.5 sm:max-w-none md:h-20 md:flex-row md:items-center md:gap-3"
    >
      <Image
        src="/summer87.png"
        alt="Summer87 Intelligence"
        width={480}
        height={120}
        sizes="(max-width: 768px) 180px, (max-width: 1024px) 240px, 320px"
        priority
        className="h-12 w-auto shrink-0 object-contain md:h-16 lg:h-20"
      />

      <div className="flex min-w-0 flex-col items-center text-center md:items-start md:text-left">
        <span className="text-sm font-semibold text-text-primary md:text-base">Summer87</span>
        <span className="font-display text-sm font-bold leading-tight tracking-tight text-tech-gradient sm:text-base md:text-lg lg:text-xl">
          {slogan}
        </span>
      </div>
    </Link>
  );
}
