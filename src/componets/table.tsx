import React, { useState } from "react";
import { mockData } from "../App";

export const Table = (props: { data: Employee[] }) => {
  const renderStatus = (status: EmployeeStatus): string => {
    switch (status) {
      case "SICK_LEAVE":
        return "🤮";

      case "AVAILABLE":
        return "☑️";
      default:
        return "❔";
    }
  };

  const handleRowClick = (event: React.MouseEvent, item: Employee): void => {
    event.preventDefault();
    console.log(item);
  };

  const [data, setData] = useState(mockData);
  return (
    <>
      <div>
        <table className="tb">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Salary</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item) => (
              <tr
                key={item.id}
                onClick={(event) =>
                  handleRowClick(event, props.data[item.id - 1])
                }
              >
                <th>{item.id}</th>
                <th>{item.firstname}</th>
                <th>{item.lastname}</th>
                <th>{item.salary}</th>
                <th>{renderStatus(item.status)}</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
