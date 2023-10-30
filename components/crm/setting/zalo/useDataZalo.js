import Cookies from "js-cookie";
import { useApi } from "../../hooks/useApi";
import React, { useEffect, useState } from "react";
export function useDataZalo() {
  const url = "http://210.245.108.202:3007/api/crm/marketingZalo/getInforZalo";

  let accessToken = "";
  accessToken = Cookies.get("token_base365");

  const { data, loading, error, fetchData } = useApi(url, accessToken);
  useEffect(() => {
    fetchData();
  }, []);

  const dataApi = data?.data?.data;

  return { dataApi, loading, error, fetchData };
}
