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
      <AlertApi title={`GET`} description={`${BASE_URL}/${entityName}/{${entityIdName}}`} variant={`public`} />
      <AlertApi title={`POST`} description={`${BASE_URL}/${entityName}`} variant={`admin`} />
      <AlertApi title={`PATCH`} description={`${BASE_URL}/${entityName}/{${entityIdName}}`} variant={`admin`} />
      <AlertApi title={`DELETE`} description={`${BASE_URL}/${entityName}/{${entityIdName}}`} variant={`admin`} />
    </>
  );
};

export default ApiList;
