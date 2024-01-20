import { Employee } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

export const Manage = () => {
  const location = useLocation();
  const data: Employee = location.state;

  let headerText;

  let employeeValues = {
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    city: "",
    postalCode: "",
    salary: "",
    status: "",
  };

  const birthDate = data?.birthdate
    ? new Date(data.birthdate).toISOString().split("T")[0]
    : "";

  if (data === null) {
    console.log(data);
    headerText = "Add New Employee";

    employeeValues = {
      id: data?.id ?? "",
      firstName: data?.firstname ?? "",
      lastName: data?.lastname ?? "",
      birthDate: birthDate,
      address: data?.address ?? "",
      city: data?.city ?? "",
      postalCode: data?.postalcode ?? "",
      salary: data?.salary ?? "",
      status: data?.status ?? "",
    };
  } else {
    headerText = "Edit Existing Employee";

    employeeValues = {
      id: data.id,
      firstName: data.firstname,
      lastName: data.lastname,
      birthDate: birthDate,
      address: data.address,
      city: data.city,
      postalCode: data.postalcode,
      salary: data.salary,
      status: data.status,
    };
  }

  const navigate = useNavigate();
  const handleButtonClick = (): void => {
    navigate("/");
  };

  return (
    <main className="main-manage">
      <h1>{headerText}</h1>
      <form>
        <label>Employee Name:</label>
        <input
          type="text"
          className="input-first"
          placeholder="First Name"
          value={employeeValues.firstName}
        />
        <input
          type="text"
          className="input-second"
          placeholder="Last Name"
          value={employeeValues.lastName}
        />
        <label>Date of Birth:</label>
        <input
          type="date"
          className="input"
          placeholder="YYYY-MM-DD"
          value={employeeValues.birthDate}
        />
        <label>Employee Adress:</label>
        <input
          type="text"
          className="input-inrow"
          placeholder="Address"
          value={employeeValues.address}
        />
        <input
          type="text"
          className="input-inrow"
          placeholder="City"
          value={employeeValues.city}
        />
        <input
          type="text"
          className="input-inrow"
          placeholder="Postal Code"
          value={employeeValues.postalCode}
        />
        <label>Salary:</label>
        <input
          type="number"
          className="input"
          value={employeeValues.salary}
        />{" "}
        {/* Zablokować ujemną wypłatę*/}
        <section className="selection-status">
          <label>Status:</label>
          <select value={employeeValues.status}>
            <option hidden>Choose status of employee</option>
            <option value="EMPLOYED">Employed</option>
            <option value="FIRED">Fired</option>
            <option value="ON_HOLIDAY">On holiday</option>
          </select>
        </section>
        <section className="section-bottom">
          <input className="input-submit" type="submit" value="Submit" />
          <button className="button-back" onClick={handleButtonClick}>
            Back
          </button>
        </section>
      </form>
    </main>
  );
};
