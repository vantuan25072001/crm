import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import ZaloCaNhan from "./zalo_canhan";

const SMSTable: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Cài đặt / SMS Zalo");
    setShowBackButton(true);
    setCurrentPath("/setting/main");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const tabsItems = [
    {
      label: `Zalo hệ thống`,
      key: "1",
      children: <ZaloCaNhan key={1} />,
    },
  ];

  return (
    <div className={styleHome.main} ref={mainRef}>
      <Tabs items={tabsItems} />
    </div>
  );
};

export default SMSTable;
