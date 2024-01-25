import React, { useState } from "react";
import { Employee } from "./App";
import { useNavigate } from "react-router-dom";
import { RenderStatus } from "./componets/RenderStatus";

export const Table = (props: { data: Employee[] }) => {
  const navigate = useNavigate();

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
    const userConfirmed = window.confirm(
      "This action will delete the employee. Are you sure?"
    );

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
          alert("Deleted!");
        } else {
          //if json-server timeout user get alert about it
          alert("Failed to delete employee!");
        }
      } catch (error) {
        //if we got 4xx status code user get alert about it
        alert("Error while deleting employee:", error);
      }
    }
  };

  return (
    <>
      <div>
        <button className="button-add" onClick={handleButtonClick}>
          Add new employee
        </button>
        <table className="table-employee">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>ID</th>
              <th onClick={() => handleSort("firstname")}>First Name</th>
              <th onClick={() => handleSort("lastname")}>Last Name</th>
              <th onClick={() => handleSort("salary")}>Salary</th>
              <th onClick={() => handleSort("status")}>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
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
                    Edit
                  </button>
                </th>
                <th>
                  <button
                    onClick={(event) => {
                      event.stopPropagation(); // This allow button to work beacause with out that tr onClick overlaps
                      handleDeleteButtonClick(item.id);
                    }}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
