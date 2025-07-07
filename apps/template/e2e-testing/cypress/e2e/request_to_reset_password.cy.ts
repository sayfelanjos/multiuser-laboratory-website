describe("request to reset password", () => {
  beforeEach(() => {
    cy.visit("/request-to-reset-password");
  });

  it("should ask the user to register when a user no registered request to reset password", () => {
    cy.get("#formGroupEmail").type(Cypress.env("valid_email"));
    cy.get("#formGroupPassword").type(Cypress.env("valid_password"));
    cy.get('[data-cy="enter-button"]').click();
    cy.url().should("include", "/app/scheduler");
  });
});
