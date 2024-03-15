import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({ src: "../public/fonts/font.woff2" });

export const Logo = () => {
  return (
    <Link href='/' className='hidden md:block'>
      <div className='flex hover:opacity-75 transition items-center gap-x-2'>
        <Image src='/logo.svg' alt='Logo' height={30} width={30} />
        <span
          className={cn("text-2xl next-neutral-700 pb-1", headingFont.className)}
        >
          Taskify
        </span>
      </div>
    </Link>
  );
};
