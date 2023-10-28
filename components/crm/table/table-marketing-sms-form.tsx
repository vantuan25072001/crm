import React, { useEffect, useState } from "react";
import { Table, Tooltip, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import Image from "next/image";

import styles from "../contract/contract.module.css";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingSMSFormActionTable from "../marketing/sms/sms_form_action_table";
import Link from "next/link";
import { useDataZaloForm } from "../marketing/zalo/useDataZaloForm";
interface DataType {
  key: React.Key;
  id: number;
  update: string;
  templateId: string;
  templateName: string;
  createAt: string;
  status: string;
  previewUrl: string;
  price: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 80,
    dataIndex: "id",
    key: "0",
  },
  {
    title: "Tên mẫu - ID",
    width: 250,
    dataIndex: "templateName",
    key: "1",
    render: (text, record) => (
      <span>
        {text} - {record.templateId}
      </span>
    ),
  },

  {
    title: "Người cập nhật",
    dataIndex: "update",
    key: "2",
    width: 280,
    render: (text) => text || "Công ty Cổ phần Thanh toán Hưng Hà",
  },

  {
    title: "Giá tiền",
    dataIndex: "price",
    key: "4",
    width: 80,
    render: (text) => `${text} vnđ`,
  },
  {
    title: "Xem trước",
    dataIndex: "previewUrl",
    key: "5",
    width: 80,
    render: (text, record) => (
      <Link target="_blank" href={record.previewUrl}>
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            style={{ margin: "-3px 4px" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 8.09091C1 8.09091 3.54545 3 8 3C12.4545 3 15 8.09091 15 8.09091C15 8.09091 12.4545 13.1818 8 13.1818C3.54545 13.1818 1 8.09091 1 8.09091Z"
              stroke="#474747"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M7.99991 10C9.05427 10 9.909 9.14528 9.909 8.09091C9.909 7.03655 9.05427 6.18182 7.99991 6.18182C6.94555 6.18182 6.09082 7.03655 6.09082 8.09091C6.09082 9.14528 6.94555 10 7.99991 10Z"
              stroke="#474747"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>
      </Link>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "createAt",
    key: "6",
    width: 140,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "7",
    width: 140,
  },
];

interface TableDataSMSFormProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataSMSForm: React.FC<TableDataSMSFormProps> = (any) => {
  const { dataEnd, loading, error, fetchData } = useDataZaloForm();

  console.log(dataEnd);

  console.log(dataEnd[0]?.templateName);

  const [searchText, setSearchText] = useState(() => {
    // Lấy giá trị tìm kiếm từ localStorage khi trang được tải
    const savedSearchText = localStorage.getItem("searchText");
    return savedSearchText || "";
  });

  const filteredData = dataEnd.filter((item) =>
    item.templateName
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes(
        searchText
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      )
  );

  useEffect(() => {
    localStorage.setItem("searchText", searchText);
  }, [searchText]);

  console.log(searchText);
  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        <div className={styles.main__control}>
          <div className={`${styles.main__control_btn} flex_between`}>
            <div className={styles.main__control_search}>
              <form>
                <input
                  type="text"
                  className={styles.input__search}
                  name="search"
                  value={searchText}
                  placeholder="Tìm kiếm theo tên mẫu"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button className={styles.kinh_lup}>
                  <Image
                    width={14}
                    height={14}
                    className={styles.img__search}
                    src="/crm/search.svg"
                    alt="hungha365.com"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Table
          columns={columns}
          dataSource={filteredData}
          bordered
          scroll={{ x: 500, y: 400 }}
        />
      </div>
    </div>
  );
};

export default TableDataSMSForm;
