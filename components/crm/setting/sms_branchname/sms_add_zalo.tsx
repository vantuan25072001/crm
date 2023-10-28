import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import style from "../sms_branchname/sms.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import AddSMSFooter from "./add_sms_footer";

const AddSMSTable: React.FC = () => {
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
    setHeaderTitle("Cài đặt/ SMS Zalo / SMS cá nhân");
    setShowBackButton(true);
    setCurrentPath("/setting/sms");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <>
      <div className={styleHome.main} ref={mainRef}>
        <form className="main_sms_ct flex_column" id="form_setup_sms_system">
          <div className="main_form">
            <div className={style.main__title}>ZALO</div>
            <div className={style.main__body}>
              <div className={style.main__body_item}>
                <div className={style.body__connect_system_row}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label className={style.form_label} aria-required="true">
                      Mã ứng dụng
                    </label>
                    <input
                      type="text"
                      className={style.form_control}
                      name=""
                      id=""
                      placeholder="Nhập app_id"
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label className={style.form_label} aria-required="true">
                      Khóa bí mật
                    </label>
                    <input
                      type="text"
                      className={style.form_control}
                      name=""
                      id=""
                      placeholder="secret_key"
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label className={style.form_label} aria-required="true">
                      Mã truy cập
                    </label>
                    <input
                      type="text"
                      className={style.form_control}
                      name=""
                      id=""
                      placeholder="access_token"
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label className={style.form_label} aria-required="true">
                      Mã làm mới
                    </label>
                    <input
                      type="text"
                      className={style.form_control}
                      name=""
                      id=""
                      placeholder="refresh_token"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AddSMSFooter />
        </form>
      </div>
    </>
  );
};

export default AddSMSTable;
