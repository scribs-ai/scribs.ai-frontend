describe("Sign-in Page testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get('a[href="/sign-in"]').click().wait(1000);
  });

  it("passes", () => {
    cy.contains("Welcome, Login").wait(1000);
    cy.contains("Enter your credentials below to login").wait(1000);
    cy.get('button:contains("Google")').click().should("be.enabled").wait(1000);
    cy.contains("Email");
    cy.get('input[name="email"]').should(
      "have.attr",
      "placeholder",
      "mail@example.com"
    );

    cy.contains("Password");
    cy.get('input[name="password"]').should(
      "have.attr",
      "placeholder",
      "Enter your password"
    );

    cy.get('a[href="/forgot-password"]').trigger("mouseover").wait(1000);
    cy.get(".space-y-2 > .inline-flex").click().wait(1000);

    cy.contains("Email is required").click().wait(1000);
    cy.contains("Password is required").click().wait(1000);

    cy.wait(4000);

    cy.get('input[name="email"]').type("Devocode@yopmail.com").wait(1000);
    cy.get('input[name="password"]').type("Devo@123").wait(1000);

    cy.get('button[type="submit"]').click().wait(1000);
    cy.contains("If you don't have an account, please.").click().wait(1000);
  });
});
