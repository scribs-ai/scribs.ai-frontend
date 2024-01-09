describe("Home Page Testing", () => {
  it("navigate to sign-up page", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[href="/sign-up"]').click().wait(1000);
    cy.url().should("include", "/sign-up");
  });
});

describe("Signup Page Testing", () => {
  it("successfully submits signup form", () => {
    cy.visit("http://localhost:3000/sign-up");
    cy.get('button[type="submit"]').click().wait(4000);

    cy.get('button:contains("Google")').click().should("be.enabled").wait(1000);

    cy.contains("First Name")
      .next('input[name="first_name"]')
      .type("devo")
      .wait(1000);
    cy.contains("Last Name")
      .next('input[name="last_name"]')
      .type("devoCode")
      .wait(1000);
    cy.contains("Email")
      .next('input[name="email"]')
      .type("Devocode@yopmail.com")
      .wait(1000);
    cy.contains("Password")
      .next('input[name="password"]')
      .type("Devo@123")
      .wait(1000);
    cy.contains("Confirm Password")
      .next('input[name="confirmPassword"]')
      .type("Devo@123")
      .wait(1000);

    const placeholders = {
      'input[name="first_name"]': "Enter first name",
      'input[name="last_name"]': "Enter last name",
      'input[name="email"]': "mail@example.com",
      'input[name="password"]': "Enter your password",
      'input[name="confirmPassword"]': "Re-enter your password",
    };

    Object.entries(placeholders).forEach(([selector, placeholderText]) => {
      cy.get(selector)
        .should("have.attr", "placeholder", placeholderText)
        .wait(1000);
    });

    cy.get('button[type="submit"]').click().wait(1000);

    cy.url().should("include", "http://localhost:3000/sign-up");
  });
});
