describe("signing in with email and password (basic authentication)", () => {
  it("should the Enter button be disabled if both email and password fields are empty", () => {
    cy.visit("/signin");
    cy.contains("button", "Entrar").should("be.disabled");
  });

  it("should the Enter button be disabled if the email field is empty", () => {
    cy.visit("/signin");
    cy.get("#formGroupPassword").type(Cypress.env("user_password"));
    cy.contains("button", "Entrar").should("be.disabled");
  });

  it("should the Enter button be disabled if email is invalid", () => {
    cy.visit("/signin");
    cy.get("#formGroupEmail").type("invalid_email");
    cy.get("#formGroupPassword").type(Cypress.env("user_password"));
    cy.contains("button", "Entrar").should("be.disabled");
  });

  it("should the Enter button be disabled if the password field is empty", () => {
    cy.visit("/signin");
    cy.get("#formGroupEmail").type(Cypress.env("user_email"));
    cy.contains("button", "Entrar").should("be.disabled");
  });

  it("should the Enter button be enabled if the email and password are valid", () => {
    cy.visit("/signin");
    cy.get("#formGroupEmail").type(Cypress.env("user_email"));
    cy.get("#formGroupPassword").type(Cypress.env("user_password"));
    cy.contains("button", "Entrar").should("be.enabled");
  });
});
