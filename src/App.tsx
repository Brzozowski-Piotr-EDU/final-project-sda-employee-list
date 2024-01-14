import { useState } from "react";
import { Table } from "./componets/table";
import "./App.scss";

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
    address: "Warszawska 12",
    city: "Warszawa",
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
    address: "Warszawska 12",
    city: "Warszawa",
    postalcode: "00-000",
    phonenumber: "+48 111 555 000",
  },
];

function App() {
  return (
    <>
      <main>
        <h1>Workers</h1>
        <Table data={mockData} />
      </main>
    </>
  );
}

export default App;
