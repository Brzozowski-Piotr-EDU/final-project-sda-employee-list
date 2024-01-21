import { useLocation, useNavigate } from "react-router-dom";
import { Employee } from "../App";
import { RenderStatus } from "./RenderStatus";

export function Details() {
  const location = useLocation();
  const data: Employee = location.state;

  const navigate = useNavigate();
  const handleButtonClick = (): void => {
    navigate("/");
  };

  return (
    <>
      <main className="main">
        <h1>
          {data.firstname} {data.lastname} (ID: {data.id})
        </h1>
        <table className="table-employee">
          <thead>
            <tr>
              <th>Birth Date</th>
              <th>City</th>
              <th>Address</th>
              <th>Postal Code</th>
              <th>Phone Number</th>
              <th>Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="employee-detail">
              <th>{data.birthdate}</th>
              <th>{data.city}</th>
              <th>{data.address}</th>
              <th>{data.postalcode}</th>
              <th>{data.phonenumber}</th>
              <th>{data.salary}</th>
              <th>{RenderStatus(data.status)}</th>
            </tr>
          </tbody>
        </table>
        <button className="button-back" onClick={handleButtonClick}>
          Back
        </button>
      </main>
    </>
  );
}
