import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className='w-full p-4 border-t'>
      <div className='md:max-w-screen-xl mx-auto flex items-center w-full justify-between'>
        <div className='italic'>&copy; All rights reserved</div>
        <div className='space-x-1 md:block md:w-auto flex items-center justify-between w-full'>
          <Button size='sm' variant='ghost'>
            Privacy Policy
          </Button>
          <Button size='sm' variant='ghost'>
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
