"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

export const OrganizationControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) return;

    // TODO: handle case when user type id of organization that does not exist

    setActive({ organization: params.organizationId as string });
  }, [params.organizationId, setActive]);

  return null;
};
