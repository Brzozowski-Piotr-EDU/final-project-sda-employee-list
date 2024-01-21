import { useState, useEffect } from "react";
import { Employee } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

export const Manage = () => {
  const location = useLocation();
  const data: Employee = location.state;

  //logic to send data via fetch to json-server

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const employeeData = {
      firstname,
      lastname,
      birthdate,
      address,
      city,
      postalcode,
      salary,
      status,
    };

    // if we had employee ID, thats means we editing existing employee and we gonna use "PUT" method to update only changed values
    if (data && data.id) {
      try {
        const response = await fetch(
          `http://localhost:3000/employees/${data.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
          }
        );

        if (response.ok) {
          // Obsługa sukcesu, np. przeniesienie użytkownika na inną stronę
          navigate("/");
        } else {
          // Obsługa błędu, np. wyświetlenie komunikatu użytkownikowi
          console.error("Failed to update employee data");
        }
      } catch (error) {
        console.error("Error while updating employee data:", error);
      }
    } else {
      // Jeśli nie masz ID pracownika, oznacza to, że dodajesz nowego pracownika
      try {
        const response = await fetch("http://localhost:3000/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        });

        if (response.ok) {
          // Obsługa sukcesu, np. przeniesienie użytkownika na inną stronę
          navigate("/");
        } else {
          // Obsługa błędu, np. wyświetlenie komunikatu użytkownikowi
          console.error("Failed to add new employee");
        }
      } catch (error) {
        console.error("Error while adding new employee:", error);
      }
    }
  };

  const [headerText, setHeaderText] = useState("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // updating state of employeeValues when user choose to edit data for existing user
    if (data) {
      setHeaderText("Edit Existing Employee");
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setBirthDate(new Date(data.birthdate).toISOString().split("T")[0]);
      setAddress(data.address);
      setCity(data.city);
      setPostalCode(data.postalcode);
      setSalary(data.salary);
      setStatus(data.status);
    } else {
      setHeaderText("Add New Employee");
    }
  }, [data]);

  const navigate = useNavigate();
  const handleButtonClick = (): void => {
    navigate("/");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // switch który z pomocą wartości name określa dla którego inputa ma odświeżyć stan
    switch (name) {
      case "firstname":
        setFirstName(value);
        break;
      case "lastname":
        setLastName(value);
        break;
      case "birthdate":
        setBirthDate(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "city":
        setCity(value);
        break;
      case "postalcode":
        setPostalCode(value);
        break;
      case "salary":
        setSalary(value);
        break;
      case "status":
        setStatus(value);
        break;
      default:
        break;
    }
  };

  return (
    <main className="main-manage">
      <h1>{headerText}</h1>
      <form onSubmit={handleSubmit}>
        <label>Employee Name:</label>
        <input
          type="text"
          className="input-first"
          placeholder="First Name"
          onChange={handleInputChange}
          value={firstname}
          name="firstname"
        />
        <input
          type="text"
          className="input-second"
          placeholder="Last Name"
          onChange={handleInputChange}
          value={lastname}
          name="lastname"
        />
        <label>Date of Birth:</label>
        <input
          type="date"
          className="input"
          placeholder="YYYY-MM-DD"
          onChange={handleInputChange}
          value={birthdate}
          name="birthdate"
        />
        <label>Employee Adress:</label>
        <input
          type="text"
          className="input-inrow"
          placeholder="Address"
          onChange={handleInputChange}
          value={address}
          name="address"
        />
        <input
          type="text"
          className="input-inrow"
          placeholder="City"
          onChange={handleInputChange}
          value={city}
          name="city"
        />
        <input
          type="text"
          className="input-inrow"
          placeholder="Postal Code"
          onChange={handleInputChange}
          value={postalcode}
          name="postalcode"
        />
        <label>Salary:</label>
        <input
          type="number"
          className="input"
          value={salary}
          onChange={handleInputChange}
          name="salary"
        />
        {/* Zablokować ujemną wypłatę*/}
        <section className="selection-status">
          <label>Status:</label>
          <select value={status} onChange={handleInputChange} name="status">
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
