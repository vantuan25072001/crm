import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import style from "../sms_branchname/sms.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import Link from "next/link";

const SMSCaNhanTable: React.FC = () => {
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
    setHeaderTitle("Cài đặt/ SMS Zalo");
    setShowBackButton(true);
    setCurrentPath("/setting/main");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <div className={style.main__setting_email}>
      <div className={style.setting_email_body}>
        <p className={style.setting_email_body__title}>
          Thiết lập Zalo Marketing
        </p>
        <p>Kết nối Email để thực hiện các chiến dịch Zalo Marketting </p>
        <div className={style.setting_email_body__connect}>
          <div className={style.setting_email_body__connect_item}>
            <img
              style={{ height: "60px", width: "70%" }}
              className={style.connect_img}
              src="/crm/zalo.svg"
            />
            <p className={style.connect_title}>Zalo</p>
            <Link href="sms/add_zalo">
              <button className={style.connect_button}>Kết nối</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSCaNhanTable;
