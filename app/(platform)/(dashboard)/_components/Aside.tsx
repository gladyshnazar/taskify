"use client";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Link from "next/link";

import { useSessionStorage } from "../_hooks/useStorage";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { MenuItem, Organization } from "./MenuItem";

type SidebarProps = {
  storageKey?: string;
};

export const Aside = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useSessionStorage<Record<string, boolean>>(
    storageKey,
    {}
  );
  const { organization: activeOrg, isLoaded: isLoadedOrg } = useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded(curr => ({ ...curr, [id]: !expanded[id] }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className='flex items-center justify-between mb-2'>
          <Skeleton className='h-10 w-[50%]' />
          <Skeleton className='h-10 w-10' />
        </div>
        <div className='space-y-2'>
          <MenuItem.Skeleton />
          <MenuItem.Skeleton />
          <MenuItem.Skeleton />
          <MenuItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className='font-medium text-xs flex items-center justify-between mb-1s'>
        <h3 className='pl-4'>Workspaces</h3>
        <Button asChild type='button' size='icon' variant='ghost'>
          <Link href='/select-org'>
            <Plus className='h-4 w-4' />
          </Link>
        </Button>
      </div>
      <Accordion
        type='multiple'
        defaultValue={defaultAccordionValue}
        className='space-y-2'
      >
        {userMemberships.data?.map(({ organization }) => (
          <MenuItem
            key={organization.id}
            isActive={activeOrg?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
