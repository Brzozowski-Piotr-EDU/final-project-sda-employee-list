import React from "react";
import { Employee } from "./App";
import { useNavigate } from "react-router-dom";
import { RenderStatus } from "./componets/RenderStatus";

export const Table = (props: { data: Employee[] }) => {
  const navigate = useNavigate();
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
