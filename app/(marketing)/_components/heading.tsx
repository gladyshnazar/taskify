"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your Ideas, Tasks, & Plans. Unified. Welcome to{" "}
        <span className='underline'>Taskify</span>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        Taskify is the connected workspace where <br />
        better, faster work happens.
      </h3>
      <Button asChild>
        <Link href='sign-up'>
          Get Taskify free
          <ArrowRight className='h-4 w-4 ml-2' />
        </Link>
      </Button>
    </div>
  );
};
