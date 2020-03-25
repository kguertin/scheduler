import { getByAltText } from "@testing-library/react";

describe("Navagation", () => {
  it("should visit root", () => {
    cy.visit("/)");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/)");

    cy.get("li")
      .contains("Tuesday")
      .click();
  });
});
