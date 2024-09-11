describe("signing in with email and password (basic authentication)", () => {
  it("should be thrown an error message if the email field is empty", () => {
    cy.visit("/signin");
    cy.get("#formGroupPassword").type(Cypress.env("valid_password"));
    cy.get('[data-cy="enter-button"]').click();
    cy.get('[data-cy="email-feedback"]').contains("Email is required");
  });

  it("should be thrown an error message if the password field is empty", () => {
    cy.visit("/signin");
    cy.get("#formGroupEmail").type(Cypress.env("valid_email"));
    cy.get('[data-cy="password-feedback"]').contains("Password is required");
  });

  it("should be thrown an error message if both the email and the password field is empty", () => {
    cy.visit("/signin");
    cy.get('[data-cy="enter-button"]').click();
    cy.get('[data-cy="email-feedback"]').contains("Email is required");
    cy.get('[data-cy="password-feedback"]').contains("Password is required");
  });

  it("should be thrown an error message if the email input is invalid", () => {
    cy.visit("/signin");
    cy.get("#formGroupEmail").type("invalid_email");
    cy.get("#formGroupPassword").type(Cypress.env("valid_password"));
    cy.get('[data-cy="enter-button"]').click();
    cy.get('[data-cy="email-feedback"]').should("be.visible");
  });

  it("should be thrown an error message if the password input is invalid", () => {
    cy.visit("/signin");
    cy.get("#formGroupEmail").type(Cypress.env("valid_email"));
    cy.get("#formGroupPassword").type("invalid_password");
    cy.get('[data-cy="enter-button"]').click();
    cy.get('[data-cy="password-feedback"]').should("be.visible");
  });

  it("should be thrown an error message if the user isn't registered", () => {
    cy.visit("/signin");
    cy.get("#formGroupEmail").type(Cypress.env("unregistered_email"));
    cy.get("#formGroupPassword").type(Cypress.env("unregistered_password"));
    cy.get('[data-cy="enter-button"]').click();
    cy.get('[data-cy="alert"]').should("be.visible");
  });

  it("should move to the scheduler page if the user is registered", () => {
    cy.visit("/signin");
    cy.get("#formGroupEmail").type(Cypress.env("valid_email"));
    cy.get("#formGroupPassword").type(Cypress.env("valid_password"));
    cy.get('[data-cy="enter-button"]').click();
    cy.url().should("include", "/app/scheduler");
  });
});
