import { useState, useEffect } from "react";
import { Employee } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

export const Manage = () => {
  //Needed to move beetween components
  const location = useLocation();
  //Needed to get data from App.tsx
  const data: Employee = location.state;

  //I use the blank unicode beacause react is not fast enough to change from empty headerText to ex. "Add New Employee" and for nanosecond we don't have h1 and then he appears and that makes form bumps down to make a space for h1. Thats looks bad and not fluent
  const [headerText, setHeaderText] = useState("⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [phonenumber, setPhoneNumber] = useState("+48");
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
      setPhoneNumber(data.phonenumber);
      setSalary(data.salary);
      setStatus(data.status);
    } else {
      setHeaderText("Add New Employee");
    }
  }, [data]);

  // Needed for validation test on fields before sending, that block sending to json-server a dump data
  const validateField = (value, minLength, errorMessage) => {
    if (!value || value.length < minLength) {
      alert(errorMessage);
      return false;
    }
    return true;
  };

  const isValidPostalCode = (code) =>
    /^[0-9-]*\d+[0-9-]*$/.test(code) && code.length >= 6;

  const isValidPhoneNumber = (number) =>
    /^\+48[0-9]+$/.test(number) && number.length >= 12;

  //logic to send data via fetch to json-server
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Grouping together all data from inputs to one object
    const employeeData = {
      firstname,
      lastname,
      birthdate,
      address,
      city,
      postalcode,
      phonenumber,
      salary,
      status,
    };
    //console.log(employeeData);
    //Checking if all inputs and sections is not empty
    //The ! means that the variable is empty
    if (
      !validateField(employeeData.firstname, 2, "First name is too short") ||
      !validateField(employeeData.lastname, 2, "Last name is too short") ||
      !validateField(employeeData.address, 1, "Address is too short") ||
      !validateField(employeeData.city, 2, "City name is too short") ||
      !employeeData.postalcode.includes("-") ||
      !isValidPostalCode(employeeData.postalcode) ||
      !employeeData.phonenumber.includes("+48") ||
      !isValidPhoneNumber(employeeData.phonenumber) ||
      employeeData.salary < 0 ||
      employeeData.salary.toString().includes("-")
    ) {
      return;
    }

    if (data && data.id) {
      // if we had employee ID, thats means we editing existing employee and we gonna use "PUT" method to update only changed values
      try {
        //fetch to json
        const response = await fetch(
          `http://localhost:3000/employees/${data.id}`,
          {
            //Info for json-server what type of method we wanna use
            //We using PUT to only update changed data
            method: "PUT",
            //Info for json-server what type of data we sending
            headers: {
              "Content-Type": "application/json",
            },
            //converting object employeeData to JSON
            body: JSON.stringify(employeeData),
          }
        );

        if (response.ok) {
          // if we got 2xx code response from json-server then user been moved to homepage
          //alert("Edited employee successfully!");
          navigate("/");
        } else {
          // if we got timeout from json-server user get alert about it
          alert("Failed to update employee data");
        }
      } catch (error) {
        // if we got 4xx code from json-server then user get alert about it
        alert("Error while updating employee data:", error);
      }
    } else {
      // if we do not have employee ID that means we adding new employee.
      try {
        const response = await fetch("http://localhost:3000/employees", {
          //Info for json-server what type of method we wanna use
          //We using POST to add new data to JSON
          method: "POST",
          //Info for json-server what type of data we sending
          headers: {
            "Content-Type": "application/json",
          },
          //converting object employeeData to JSON
          body: JSON.stringify(employeeData),
        });

        if (response.ok) {
          // if we got 2xx code response from json-server then user get alert about it and inputs get cleaned
          alert("Added new employee successfully!");
          setFirstName("");
          setLastName("");
          setBirthDate("");
          setAddress("");
          setCity("");
          setPostalCode("");
          setPhoneNumber("");
          setSalary("");
          setStatus("UNDEFINED");
          //navigate("/");
        } else {
          // if we got timeout from json-server user get alert about it
          alert("Failed to add new employee");
        }
      } catch (error) {
        // if we got 4xx code from json-server then user get alert about it
        alert("Error while adding new employee:", error);
      }
    }
  };

  const navigate = useNavigate();
  const handleButtonClick = (): void => {
    navigate("/");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "salary" && parseFloat(value) < 0) {
      return;
    }

    if (name === "postalcode" && !/^\d*(-\d*)?$/.test(value)) {
      return;
    }

    // switch który z pomocą wartości name określa dla którego inputa ma odświeżyć stan
    switch (name) {
      case "firstname":
        setFirstName(value.replace(/\s/g, ""));
        break;
      case "lastname":
        setLastName(value.replace(/\s/g, ""));
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
        setPostalCode(value.replace(/\s/g, ""));
        break;
      case "phonenumber":
        setPhoneNumber(value.replace(/\s/g, ""));
        break;
      case "salary":
        setSalary(value.replace(/\s/g, ""));
        break;
      case "status":
        setStatus(value);
        break;
      default:
        break;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Jeśli nazwa pola to "salary" i użytkownik próbuje wprowadzić "-", zablokuj zdarzenie
    if (event.currentTarget.name === "salary" && event.key === "-") {
      event.preventDefault();
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
        <label>Phone Number:</label>
        <input
          type="tel"
          className="input"
          value={phonenumber}
          onChange={handleInputChange}
          name="phonenumber"
        />
        <label>Salary:</label>

        <input
          type="number"
          className="input"
          value={salary}
          min="0"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          name="salary"
        />
        {/* Zablokować ujemną wypłatę*/}
        <section className="selection-status">
          <label>Status:</label>
          <select value={status} onChange={handleInputChange} name="status">
            <option value="UNDEFINED" hidden>
              Choose status of employee
            </option>
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
