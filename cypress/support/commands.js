// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
  cy.contains("Log in").click();

  if (email) {
    cy.get("#mail").type(email);
  }

  if (password) {
    cy.get("#pass").type(password);
  }

  cy.contains("Submit").click();
});

Cypress.Commands.add(
  "addNew",
  (title, description, fileCover, fileBook, authors, favorite) => {
    cy.get("button").contains("Add new").click();

    if (title) {
      cy.get("#title").type(title);
    }

    if (description) {
      cy.get("#description").type(description);
    }

    if (fileCover) {
      cy.get('input[id="fileCover"]').selectFile(fileCover);
    }

    if (fileBook) {
      cy.get('input[id="fileBook"]').selectFile(fileBook);
    }

    if (authors) {
      cy.get("#authors").type(authors);
    }

    if (favorite === true) {
      cy.get("#favorite").check().check();
    }
  }
);

Cypress.Commands.add("deleteFavorite", (title) => {
  cy.get(".h-100")
    .first()
    .within(() => {
      cy.get(".card-title").contains(title);
    })
    .find(".card-footer > .btn")
    .contains("Delete from favorite")
    .click();
});

Cypress.Commands.add("addFavorite", (title) => {
  cy.get(".h-100")
    .first()
    .within(() => {
      cy.get(".card-title").contains(title);
    })
    .find(".card-footer > .btn")
    .contains("Add to favorite")
    .click();
});
