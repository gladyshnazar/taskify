import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import MobileAside from "./MobileAdide";
import { FormPopover } from "@/components/form/form-popover";

export const Menu = () => {
  return (
    <nav className='fixed z-10 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center'>
      <MobileAside />
      <div className='flex items-center gap-x-4'>
        <Logo />
        <FormPopover align="start" sideOffset={18}>
          <Button
            size='sm'
            variant='primary'
            className='rounded-sm h-auto py-1.5 px-2'
          >
            <span className='hidden md:block'>Create</span>
            <Plus className='h-4 w-4 block md:hidden' />
          </Button>
        </FormPopover>
      </div>
      <div className='ml-auto flex items-center gap-x-2'>
        <OrganizationSwitcher
          hidePersonal
          afterSelectOrganizationUrl='/organization/:id'
          createOrganizationUrl='/organization/:id'
          afterLeaveOrganizationUrl='/select-org'
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
