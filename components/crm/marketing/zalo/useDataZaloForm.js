import Cookies from "js-cookie";
import { useApi } from "../../hooks/useApi";
import React, { useEffect } from "react";
export function useDataZaloForm() {
  const url =
    "http://210.245.108.202:3007/api/crm/marketingZalo/getListDetailTemplate";

  let accessToken = "";
  accessToken = Cookies.get("token_base365");

  const { data, loading, error, fetchData } = useApi(url, accessToken);
  useEffect(() => {
    // Gọi hàm fetchData để lấy dữ liệu từ API khi component được render
    fetchData();
  }, []);

  const dataApi = data?.data?.data;
  let dataEnd = [];
  for (let i = 1; i < dataApi?.length; i++) {
    dataEnd.push({ ...dataApi[i], id: i });
  }

  return { dataEnd, loading, error, fetchData };
}
