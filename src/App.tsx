import { useState, useEffect } from "react";
import { Table } from "./Table";
import "./App.scss";
import { Route, Routes } from "react-router";
import { Details } from "./componets/Details";

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
        <h1>List of Employees</h1>
        <Table data={data} />
      </main>
    </>
  );
}

export default App;
