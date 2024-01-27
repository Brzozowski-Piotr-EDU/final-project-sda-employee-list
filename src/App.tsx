import { useState, useEffect } from "react";
import { Table } from "./Table";
import "./App.scss";
import { Route, Routes } from "react-router";
import { Details } from "./componets/Details";
import { I18nextProvider, useTranslation } from "react-i18next";

export type EmployeeStatus =
  | "SICK_LEAVE"
  | "AVAILABLE"
  | "EMPLOYED"
  | "FIRED"
  | "ON_HOLIDAY";
export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  salary: number;
  status: EmployeeStatus;
  birthdate: Date;
  address: string;
  city: string;
  postalcode: string;
  phonenumber: string;
}

function App() {
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetch("http://localhost:3000/employees")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      });
  }, []);
  return (
    <>
      <main className="main">
        <h1>{t("main_page_title")}</h1>
        <Table data={data} />
      </main>
    </>
  );
}

export default App;
