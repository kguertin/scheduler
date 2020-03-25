import { getByAltText } from "@testing-library/react";

describe("Navagation", () => {
  it("should visit root", () => {
    cy.visit("/)");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/)");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
