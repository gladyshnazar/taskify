import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Menu = () => {
  return (
    <div className='fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
      <div className='md:max-w-screen-xl mx-auto flex items-center w-full justify-between'>
        <Logo />
        <div className='space-x-4 md:block md:w-auto flex items-center justify-end w-full'>
          <Button variant='outline' asChild>
            <Link href='/log-in'>Log In</Link>
          </Button>
          <Button asChild>
            <Link href='/sign-up'>Get Taskify free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
