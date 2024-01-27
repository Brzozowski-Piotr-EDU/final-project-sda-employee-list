import cypress from "cypress";

describe("home page", () => {
  it("should be default set to polish language", () => {
    cy.visit("http://localhost:5173/");

    cy.get("h1").contains("Lista Pracowników");
  });

  it("should change language to english", () => {
    cy.visit("http://localhost:5173/");

    cy.get("select").select("en");

    cy.get("h1").contains("Employees");
  });
});
