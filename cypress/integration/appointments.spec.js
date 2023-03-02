describe("Appointments", () => {

beforeEach(()=>{
  cy.request("GET", "/api/debug/reset")
})

it("should book an interview", () => {
 cy.visit("/");
 cy.get("li").contains("[data-testid=day]", "Tuesday").click()
 cy.get("[alt=Add]").first().click({ force: true });
 cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
 cy.get("[alt='Sylvia Palmer']").click();
 cy.contains("Save").click();
 cy.contains(".appointment__card--show", "Lydia Miller-Jones");
 cy.contains(".appointment__card--show", "Sylvia Palmer");
});

it("should edit an interview", () => {
  cy.visit("/");
  cy.contains("Monday");
  cy.get("[alt=Edit]").invoke('show').click();
 cy.get("[data-testid=student-name-input]").type("Lydia-Jones");
 cy.get("[alt='Sylvia Palmer']").click();
 cy.contains("Save").click();
 cy.contains(".appointment__card--show", "Lydia-Jones");
 cy.contains(".appointment__card--show", "Sylvia Palmer");
})



it("should cancel an interview", () => {
  cy.get("[alt=Delete]")
    .click({ force: true });

  cy.contains("Confirm").click();

  cy.contains("Deleting").should("exist");
  cy.contains("Deleting").should("not.exist");

  cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
});
})