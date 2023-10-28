import React, { useEffect, useState } from "react";
import styles from "../../contract/contract.module.css";
import Link from "next/link";
import Image from "next/image";
import { useDataZaloForm } from "./useDataZaloForm";
import { useRouter } from "next/router";

export default function EmailFormInputGroup({ isSelectedRow }: any) {
  const { dataEnd, loading, error, fetchData } = useDataZaloForm();

  console.log(dataEnd);

  console.log(dataEnd[0]?.templateName);

  const [searchText, setSearchText] = useState("");

  console.log(searchText);
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
  const router = useRouter(); // Initialize the router instance

  useEffect(() => {
    // Trích xuất giá trị query từ URL sử dụng useRouter
    const { query } = router.query;

    // Kiểm tra xem query có giá trị không rỗng
    if (query) {
      setSearchText(query.toString());
    }
  }, [router.query]);

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Ngăn việc gửi biểu mẫu theo cách mặc định

    // Lấy URL từ ô tìm kiếm và thêm searchText vào query
    const url = `/search?query=${searchText}`;

    // Sử dụng router để điều hướng đến URL mới
    router.push(url);
  };

  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={handleFormSubmit}>
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
  );
}
