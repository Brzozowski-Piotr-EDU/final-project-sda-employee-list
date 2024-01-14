import { useState } from "react";
import { Table } from "./Table";
import "./App.scss";
import { Route, Routes } from "react-router";
import { Details } from "./componets/Details";

export type EmployeeStatus = "SICK_LEAVE" | "AVAILABLE";
export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  salary: number;
  status: EmployeeStatus;
  birtdate: Date;
  address: string;
  city: string;
  postalcode: string;
  phonenumber: string;
}

export const mockData: Employee[] = [
  {
    id: "1",
    firstname: "Jan",
    lastname: "Kowalski",
    salary: 5000,
    status: "SICK_LEAVE",
    birthdate: new Date("1983-07-14"),
    address: "Warszawska 12",
    city: "Warszawa",
    postalcode: "00-000",
    phonenumber: "+48 777 666 555",
  },
  {
    id: "2",
    firstname: "Adam",
    lastname: "Nowak",
    salary: 10000,
    status: "AVAILABLE",
    birthdate: new Date("1995-02-01"),
    address: "Poznańska 45a",
    city: "Poznań",
    postalcode: "00-000",
    phonenumber: "+48 888 999 111",
  },
  {
    id: "3",
    firstname: "Justyna",
    lastname: "Kowalczyk",
    salary: 12500,
    status: "ok",
    birthdate: new Date("1990-05-11"),
    address: "Wrocławska 8b",
    city: "Wrocław",
    postalcode: "00-000",
    phonenumber: "+48 111 555 000",
  },
  {
    id: "4",
    firstname: "Paulina",
    lastname: "Dagmarczyk",
    salary: 5000,
    status: "AVAILABLE",
    birthdate: new Date("1997-10-24"),
    address: "Gdańska 54",
    city: "Gdańsk",
    postalcode: "00-000",
    phonenumber: "+48 505 664 301",
  },
];

function App() {
  return (
    <>
      <main>
        <h1>List of Employees</h1>
        <Table data={mockData} />
      </main>
    </>
  );
}

export default App;
