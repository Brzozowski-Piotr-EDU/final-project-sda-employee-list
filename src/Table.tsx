import React, { useState } from "react";
import { mockData } from "./App";
import { useNavigate } from "react-router-dom";
import { RenderStatus } from "./componets/RenderStatus";

export const Table = (props: { data: Employee[] }) => {
  const navigate = useNavigate();
  const handleRowClick = (event: React.MouseEvent, item: Employee): void => {
    event.preventDefault();
    navigate("/details", { state: item });
  };

  const handleButtonClick = (): void => {
    navigate("/manage");
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
                className="employee"
                key={item.id}
                onClick={(event) => handleRowClick(event, item)}
              >
                <th>{item.id}</th>
                <th>{item.firstname}</th>
                <th>{item.lastname}</th>
                <th>{item.salary}</th>
                <th>{RenderStatus(item.status)}</th>
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
