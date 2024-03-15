// Npm
import { Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";

// Alias imports
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";

// Local relative imports

const headingFont = localFont({ src: "../../public/fonts/font.woff2" });
const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className='min-h-full flex flex-col dark:bg-[#1F1F1F]'>
      <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
        <Heading />
        <Heroes />
      </div>
    </div>
  );
};

export default MarketingPage;
