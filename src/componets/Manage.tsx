import React, { useState, useEffect } from "react";
import { Employee } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Manage = () => {
  //Support for i18n
  const { t } = useTranslation();
  //Needed to move data between componets
  const location = useLocation();
  //Needed to get data from App.tsx
  const data: Employee = location.state;

  const navigate = useNavigate();

  //I use the blank unicode beacause react is not fast enough to change from empty headerText to for ex. "Add New Employee" and for nanosecond we don't have h1 and then he appears and that makes form bumps down to make a space for h1. Thats looks bad and not fluent
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
      setHeaderText(t("editing_page_title"));
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setBirthDate(new Date(data.birthdate).toISOString().split("T")[0]);
      setAddress(data.address);
      setCity(data.city);
      setPostalCode(data.postalcode);
      setPhoneNumber(data.phonenumber);
      setSalary(data.salary.toString());
      setStatus(data.status);
    } else {
      setHeaderText(t("adding_page_title"));
    }
  }, [data]);

  // Needed for validation test on fields before sending, that block sending to json-server a dump data
  const validateField = (
    value: string,
    minLength: number,
    errorMessage: string
  ): boolean => {
    if (!value || value.length < minLength) {
      alert(errorMessage);
      return false;
    }
    return true;
  };

  const isValidPostalCode = (code: string): boolean =>
    /^[0-9-]*\d+[0-9-]*$/.test(code) && code.length >= 6;

  const isValidPhoneNumber = (number: string): boolean =>
    /^\+48[0-9]+$/.test(number) && number.length >= 12;

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
      phonenumber,
      salary: parseFloat(salary),
      status,
    };
    //Checking if all inputs and sections is not empty or too short (min 1 or 2 length)
    //The ! means that the variable is empty
    if (
      !validateField(employeeData.firstname, 2, t("alert_first_name_short")) ||
      !validateField(employeeData.lastname, 2, t("alert_last_name_short")) ||
      !validateField(employeeData.address, 1, t("alert_address_short")) ||
      !validateField(employeeData.city, 2, t("alert_city_short")) ||
      !employeeData.postalcode.includes("-") ||
      !isValidPostalCode(employeeData.postalcode) ||
      !employeeData.phonenumber.includes("+48") ||
      !isValidPhoneNumber(employeeData.phonenumber) ||
      employeeData.salary < 0
    ) {
      return;
    }

    //check if we have data - when we have he gonna PUT not POST to JSON
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
        //check if we get 2xx respond from json-server
        //if we get 2xx respond, user been moved to the index (app.tsx)
        if (response.ok) {
          navigate("/");
        } else {
          //if we get timeout, user get alert about it
          alert(
            `${t("fetch_timeout_error_manage")} ${response.status} ${
              response.statusText
            }`
          );
        }
      } catch (error) {
        //if we get 4xx respond code, user get alert about it
        alert(`${t("fetch_4xx_error_manage")} ${error}`);
      }
    } else {
      //when we don't have date use method POST
      try {
        const response = await fetch("http://localhost:3000/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        });
        //if we get 2xx respond, user get alert about it and form been cleared
        if (response.ok) {
          alert(t("fetch_repsonse_ok_manage"));
          setFirstName("");
          setLastName("");
          setBirthDate("");
          setAddress("");
          setCity("");
          setPostalCode("");
          setPhoneNumber("+48");
          setSalary("");
          setStatus("UNDEFINED");
        } else {
          //if we get timeout, user get alert about it
          alert(
            `${t("fetch_timeout_error_add")} ${response.status} ${
              response.statusText
            }`
          );
        }
        //if we get 4xx respond code, user get alert about it
      } catch (error) {
        alert(`${t("fetch_4xx_error_add")} ${error}`);
      }
    }
  };

  const handleButtonClick = (): void => {
    navigate("/");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    //checks if putted value is lower than 0
    if (name === "salary" && parseFloat(value) < 0) {
      return;
    }
    //checks if postalcode value does not have illegal characters - only numbers and "-" been accepted
    if (name === "postalcode" && !/^\d*(-\d*)?$/.test(value)) {
      return;
    }

    //checks if phonenumber value does not have illegal characters - only numbers and "+" been accepted
    if (name === "phonenumber" && !/^\+?[0-9]*$/.test(value)) {
      return;
    }

    switch (name) {
      case "firstname":
        //value.replace is used to block user to use spacebar on input
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

  //thats blocks to put negative salary to the form
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.name === "salary" && event.key === "-") {
      event.preventDefault();
    }
  };

  return (
    <main className="main-manage">
      <h1>{headerText}</h1>
      <form onSubmit={handleSubmit}>
        <label>{t("label_employee_name:")}</label>
        <input
          type="text"
          className="input-first"
          placeholder={t("input_first_name_placeholder")}
          onChange={handleInputChange}
          value={firstname}
          name="firstname"
        />
        <input
          type="text"
          className="input-second"
          placeholder={t("input_last_name_placeholder")}
          onChange={handleInputChange}
          value={lastname}
          name="lastname"
        />
        <label>{t("label_date_of_birth")}</label>
        <input
          type="date"
          className="input"
          placeholder={t("input_date_of_birth_placeholder")}
          onChange={handleInputChange}
          value={birthdate}
          name="birthdate"
        />
        <label>{t("label_employee_address")}</label>
        <input
          type="text"
          className="input-inrow"
          placeholder={t("input_address_placeholder")}
          onChange={handleInputChange}
          value={address}
          name="address"
        />
        <input
          type="text"
          className="input-inrow"
          placeholder={t("input_city_placeholder")}
          onChange={handleInputChange}
          value={city}
          name="city"
        />
        <input
          type="text"
          className="input-inrow"
          placeholder={t("input_postal_code_placeholder")}
          onChange={handleInputChange}
          value={postalcode}
          name="postalcode"
        />
        <label>{t("label_phone_number")}</label>
        <input
          type="string"
          className="input"
          value={phonenumber}
          onChange={handleInputChange}
          name="phonenumber"
        />
        <label>{t("label_salary")}</label>
        <input
          type="number"
          className="input"
          value={salary}
          min="0"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          name="salary"
        />
        <section className="selection-status">
          <label>{t("label_status")}</label>
          <select value={status} onChange={handleInputChange} name="status">
            <option value="UNDEFINED" hidden>
              {t("status_section_option_undefined")}
            </option>
            <option value="EMPLOYED">
              {t("status_section_option_employed")}
            </option>
            <option value="FIRED">{t("status_section_option_fired")}</option>
            <option value="ON_HOLIDAY">
              {t("status_section_option_on_holiday")}
            </option>
          </select>
        </section>
        <section className="section-bottom">
          <input
            className="input-submit"
            type="submit"
            value={t("button_submit")}
          />
          <button className="button-back" onClick={handleButtonClick}>
            {t("button_back")}
          </button>
        </section>
      </form>
    </main>
  );
};
