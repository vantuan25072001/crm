import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import style from "../sms_branchname/sms.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import AddSMSFooter from "./switch_board_footer";
import stylex from "../setting.module.css";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import { useDataZalo } from "./useDataZalo";
import ModalCompleteStep from "../email_step/complete_modal_zalo";
import CancelModal from "../email_step/cancel_modal_zalo";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import {
  dataSaveTD,
  doDisConnect,
} from "@/components/crm/redux/user/userSlice";

import { createContext } from "react";

const AddSMSTable: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isVerify, setisVerify] = useState(false);
  const dispatch = useDispatch();
  const { isConnected, setIsConnected } = useContext<any>(CallContext);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  const { dataApi, loading, error, fetchData } = useDataZalo();

  const [inputData, setInputData] = useState({
    app_id: dataApi?.app_id || "", // Sử dụng dataApi?.app_id để tránh lỗi nếu dataApi là undefined
    secret_key: dataApi?.secret_key || "",
    access_token: dataApi?.access_token || "",
    refresh_token: dataApi?.refresh_token || "",
  });

  useEffect(() => {
    if (dataApi) {
      // Gán giá trị từ dataApi vào inputData
      setInputData({
        app_id: dataApi?.app_id || "",
        secret_key: dataApi?.secret_key || "",
        access_token: dataApi?.access_token || "",
        refresh_token: dataApi?.refresh_token || "",
      });
    }
  }, [dataApi]);

  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  useEffect(() => {
    setHeaderTitle("Cài đặt/ Tổng đài / Zalo ");
    setShowBackButton(true);
    setCurrentPath("/setting/zalo");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  async function handleConnect() {
    try {
      let accessToken = "";
      accessToken = Cookies.get("token_base365");

      if (
        !inputData.app_id ||
        !inputData.secret_key ||
        !inputData.access_token ||
        !inputData.refresh_token
      ) {
        alert("Please fill in all fields.");
        return;
      }
      const modifiedFields = [];

      // Compare input values with default values
      if (inputData.app_id !== dataApi.app_id) {
        modifiedFields.push("Mã ứng dụng");
      }
      if (inputData.secret_key !== dataApi.secret_key) {
        modifiedFields.push("Khóa bí mật");
      }
      if (inputData.access_token !== dataApi.access_token) {
        modifiedFields.push("Mã truy cập");
      }
      if (inputData.refresh_token !== dataApi.refresh_token) {
        modifiedFields.push("Mã làm mới");
      }

      if (modifiedFields.length > 0) {
        alert(
          `Trường đầu vào của bạn bị sai : ${modifiedFields.join(
            ", "
          )}. Please check your input .`
        );
        return;
      }

      const response = await fetch(
        "http://210.245.108.202:3007/api/crm/marketingZalo/managerZalo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Thay 'accessToken' bằng biến chứa mã thông báo truy cập
          },
          body: JSON.stringify(inputData),
        }
      );

      if (response.ok) {
        alert("Kết nối thành công !");
        setisVerify(true);
        setIsConnected(true);
        setModal1Open(true);

        // const history = useHistory();
        // history.push("/marketing/zalo");
      } else {
        if (response.ok) {
          alert("Kết nối thành công !");
          setisVerify(true);
          setIsConnected(true);
          setModal1Open(true);
        } else {
          if (response.status === 401) {
            alert("Unauthorized. Please check your credentials.");
          } else if (response.status === 400) {
            alert("Bad Request. Please check the input data.");
          } else {
            alert("Kết nối thất bại");
          }
        }
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu
      alert("Lỗi trong quá trình kết nối");
    }
  }
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
                      defaultValue={dataApi?.app_id}
                      placeholder="Nhập app_id"
                      onChange={(e) => {
                        setInputData((prevData) => ({
                          ...prevData,
                          app_id: e.target.value,
                        }));
                      }}
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
                      defaultValue={dataApi?.secret_key}
                      placeholder="secret_key"
                      onChange={(e) =>
                        setInputData((prevData) => ({
                          ...prevData,
                          secret_key: e.target.value,
                        }))
                      }
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
                      defaultValue={dataApi?.access_token}
                      placeholder="access_token"
                      onChange={(e) =>
                        setInputData((prevData) => ({
                          ...prevData,
                          access_token: e.target.value,
                        }))
                      }
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
                      defaultValue={dataApi?.refresh_token}
                      placeholder="refresh_token"
                      onChange={(e) =>
                        setInputData((prevData) => ({
                          ...prevData,
                          refresh_token: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={stylex.main__footer}>
              {isVerify ? (
                <button
                  style={{ color: "red", border: "1px solid" }}
                  type="button"
                  onClick={() => (
                    setisVerify(false),
                    dispatch(doDisConnect("")),
                    alert("Hủy kết nối thành công")
                  )}
                >
                  Huỷ kết nối
                </button>
              ) : (
                <button type="button" onClick={handleConnect}>
                  Kết nối
                </button>
              )}
            </div>

            <ModalCompleteStep
              modal1Open={modal1Open}
              setModal1Open={setModal1Open}
              title={
                isConnected
                  ? "Kết nối tổng đài thành công!"
                  : "Ngắt kết nối tổng đài thành công!"
              }
              routerback={"#"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSMSTable;
