import React, { useState } from "react";
import { Employee } from "./App";
import { useNavigate } from "react-router-dom";
import { RenderStatus } from "./componets/RenderStatus";
import { useTranslation } from "react-i18next";
import { LangSelector } from "./componets/LangSelector";
export const Table = (props: { data: Employee[] }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  //useState used to store state of table sorted table
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  //useState used to get track of type of sorting been used on table
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // logic to handle click on header to sort the table
  const handleSort = (columnName: string) => {
    if (sortedColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnName);
      setSortOrder("asc");
    }
  };

  //storing table, used to render table later
  const sortedData = [...props.data].sort((a, b) => {
    if (sortedColumn) {
      const aValue = a[sortedColumn];
      const bValue = b[sortedColumn];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
    }

    return 0;
  });

  //useState for search by strings comming from input
  const [searchTerm, setSearchTerm] = useState<string>("");

  //logic to handle searching by
  const filteredData = sortedData.filter((item) => {
    const searchableFields = [
      "id",
      "firstname",
      "lastname",
      "salary",
      "status",
    ];

    for (const field of searchableFields) {
      if (
        String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }

    return false;
  });

  const handleRowClick = (event: React.MouseEvent, item: Employee): void => {
    event.preventDefault();
    navigate("/details", { state: item });
  };

  /*const handleButtonClick = (props: {data: Employee[]}): void => {
    navigate("/manage");
  };*/

  const handleButtonClick = (event: React.MouseEvent, item: Employee): void => {
    event.preventDefault();
    //console.log({ state: item });
    navigate("/manage", { state: item });
  };

  const handleDeleteButtonClick = async (id) => {
    const userConfirmed = window.confirm(t("question_deleting_user"));

    if (userConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/employees/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          //if employee deleted website refresh and user get alert about it
          window.location.reload();
          alert(t("fetch_repsonse_ok_delete"));
        } else {
          //if json-server timeout user get alert about it
          alert(t("fetch_timeout_error_delete"));
        }
      } catch (error) {
        //if we got 4xx status code user get alert about it
        alert(t("fetch_timeout_error_delete"), error);
      }
    }
  };

  return (
    <>
      <div>
        <button className="button-add" onClick={handleButtonClick}>
          {t("button_add_new")}
        </button>

        <input
          type="text"
          className="inputSearch"
          placeholder={t("input_search_placeholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <LangSelector />
        <table className="table-employee">
          <thead>
            <tr>
              <th className="thSortBy" onClick={() => handleSort("id")}>
                {t("id")}
              </th>
              <th className="thSortBy" onClick={() => handleSort("firstname")}>
                {t("first_name_table_header")}
              </th>
              <th className="thSortBy" onClick={() => handleSort("lastname")}>
                {t("last_name_table_header")}
              </th>
              <th className="thSortBy" onClick={() => handleSort("salary")}>
                {t("salary_table_header")}
              </th>
              <th className="thSortBy" onClick={() => handleSort("status")}>
                {t("status_table_header")}
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                onClick={(event) => handleRowClick(event, item)}
                className="employee"
                key={item.id}
              >
                <th>{item.id}</th>
                <th>{item.firstname}</th>
                <th>{item.lastname}</th>
                <th>{item.salary}</th>
                <th>{RenderStatus(item.status)}</th>
                <th>
                  <button
                    onClick={(event) => {
                      event.stopPropagation(); // This allow button to work beacause with out that tr onClick overlaps
                      handleButtonClick(event, item);
                    }}
                  >
                    {t("button_edit_existing")}
                  </button>
                </th>
                <th>
                  <button
                    onClick={(event) => {
                      event.stopPropagation(); // This allow button to work beacause with out that tr onClick overlaps
                      handleDeleteButtonClick(item.id);
                    }}
                  >
                    {t("button_delete_existing")}
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>
          {t("number_of_results")}
          {filteredData.length}
        </h4>
      </div>
    </>
  );
};
