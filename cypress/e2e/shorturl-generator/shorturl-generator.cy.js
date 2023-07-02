const { faker } = require("@faker-js/faker");

describe("ShortURL Generator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders home page successfully", () => {
    cy.get(".container").should("contain", "Create an account or login");
    cy.get(".container").should("contain", "Register");
    cy.get(".container").should("contain", "Login");
  });

  const fullName = faker.person.fullName();
  const email = faker.internet.email();
  const password = "johndoe123";

  it("Should register successfully", () => {
    cy.get("#register").click();
    cy.get("#name").should("be.visible");
    cy.get("#name").type(fullName);
    cy.get("#email").should("be.visible");
    cy.get("#email").type(email);
    cy.get("#password").should("be.visible");
    cy.get("#password").type(password);
    cy.get("#password2").should("be.visible");
    cy.get("#password2").type(password);
    cy.get("#submitRegisterButton").click();

    cy.get(".alert").should("be.visible");
    cy.get(".alert").should("contain", "You are now registered and can login");
  });

  it("Should fail registration if email already exists", () => {
    cy.get("#register").click();
    cy.get("#name").should("be.visible");
    cy.get("#name").type(fullName);
    cy.get("#email").should("be.visible");
    cy.get("#email").type(email);
    cy.get("#password").should("be.visible");
    cy.get("#password").type(password);
    cy.get("#password2").should("be.visible");
    cy.get("#password2").type(password);
    cy.get("#submitRegisterButton").click();

    cy.get(".alert").should("be.visible");
    cy.get(".alert").should("contain", "Email is already registered");
  });

  it("Should login successfully", () => {
    cy.visit("/users/login");

    cy.get("#email").should("be.visible");
    cy.get("#email").type(email);
    cy.get("#password").should("be.visible");
    cy.get("#password").type(password);
    cy.get("#loginButton").click();

    cy.get(".container").should("contain", "Dashboard");
    cy.get(".container").should("contain", `Welcome ${fullName}`);
    cy.get(".btn").click();
  });

  it("Should navigate to home page successfully", () => {
    cy.visit("/users/home");

    cy.get(".mt-4").should("contain", "Home");
    cy.get(".my-3 > h1").should("contain", "URL Shortner");
    cy.get(".mt-lg-5 > h1").should("contain", "Qr Code Generator");
  });

  it("Create a short URL", () => {
    cy.visit("/users/home");

    cy.get("#fullUrl").should("be.visible");
    cy.get("#fullUrl").type("https://google.com");
    cy.get(".my-4 > .btn").click();
  });

  it("Delete a short URL", () => {
    cy.visit("/users/home");

    cy.get(".fa").should("be.visible");
    cy.get(".fa").click();
  });

  it("Create a Barcode", () => {
    cy.visit("/users/home");

    cy.get("#text").type("https://google.com");
    cy.get(".form-check > .btn").click();
  });
});
