
describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.get("li").contains("[data-testid=day]", "Monday")
    .click()
    .should("have.class", "day-list__item--selected")
  });
});
