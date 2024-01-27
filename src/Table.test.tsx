//@ts-nocheck

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App, { Employee, EmployeeStatus } from "./App";
import { Table } from "./Table";

const mockData: Employee[] = [
  {
    id: "1",
    firstname: "John",
    lastname: "Doe",
    salary: 50000,
    status: "EMPLOYED" as EmployeeStatus,
    birthdate: new Date(),
    address: "123 Main St",
    city: "Anytown",
    postalcode: "12345",
    phonenumber: "555-1234",
  },
  // Add more mock data as needed
];

describe("App Component", () => {
  test("renders employee data", () => {
    //@ts-ignore
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // You may need to adjust the queries based on your actual rendered content
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("50000")).toBeInTheDocument();
    // Add more assertions as needed
  });
});
