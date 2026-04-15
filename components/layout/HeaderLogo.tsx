import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 h-20">
      <Image
        src="/summer87.png"
        alt="Summer87 Intelligence"
        width={480}
        height={120}
        priority
        className="h-12 md:h-16 lg:h-20 w-auto object-contain"
      />

      <div className="flex flex-col leading-tight">
        <span className="text-white text-sm md:text-base font-semibold">
          Summer87
        </span>
        <span className="text-cyan-400 text-xs md:text-sm font-medium tracking-wide">
          Business Intelligence
        </span>
      </div>
    </Link>
  );
}
