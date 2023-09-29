"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useOrigin } from "@/hooks/useOrigin";
import AlertApi from "@/components/ui/alert.api";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const params = useParams();
  const origin = useOrigin();
  const BASE_URL = `${origin}/api/${params.storeId}`;

  return (
    <>
      <AlertApi title={`GET`} description={`${BASE_URL}/${entityName}`} variant={`public`} />
    </>
  );
};

export default ApiList;
