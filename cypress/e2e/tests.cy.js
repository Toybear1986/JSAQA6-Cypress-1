beforeEach(() => {
  cy.visit("/");
});

describe("login screen", () => {
  /* Тест с проверкой отображения страницы */
  it("check elements on start page", () => {
    cy.get('img[alt="Logo"]').should("be.visible");
    cy.contains("Books list").should("be.visible");
    cy.contains("Log in").should("be.visible");
  });

  /* Тесты с лекции */
  it("successfully logins with the valid credentianls", () => {
    cy.login("test@test.com", "test");

    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("show error message on empty login", () => {
    cy.login(null, "test");

    cy.get("#mail")
      .then((element) => element[0].checkValidity())
      .should("be.false");

    cy.get("#mail")
      .then((element) => element[0].validationMessage)
      .should("contain", "Заполните это поле");
  });

  it("show error message on empty pass", () => {
    cy.login("test@test.com", null);

    cy.get("#mail").type("test@test.com");

    cy.get("#pass")
      .then((element) => element[0].checkValidity())
      .should("be.false");

    cy.get("#pass")
      .then((element) => element[0].validationMessage)
      .should("contain", "Заполните это поле");
  });
});

/* Тесты проверки функциональности работы с книгами в избранном*/
describe.only("Working with favorites", () => {
  beforeEach(() => {
    cy.login("test@test.com", "test");
  });

  it("happy path to add new book to favorite", () => {
    const title = "Тихий шепот";
    const description =
      "«Тихий шепот» — полнометражный роман с несколькими откровенными сексуальными сценами," +
      " без обмана и с гарантированной ХЭ. Вторая книга из серии мафии «Идеально несовершенство»." +
      " Каждая книга в серии посвящена отдельной паре и может быть прочитана как самостоятельная," +
      " но для получения максимального удовольствия следуйте рекомендуемому порядку чтения";
    const fileCover = "cypress/fixtures/6363958_large_large.jpg";
    const fileBook = "cypress/fixtures/Oltedz_Neva_Tihij_sepot_r3_y9HHv.txt";
    const authors = "Нева Олтадж";
    cy.addNew(title, description, fileCover, fileBook, authors, true);
    cy.screenshot({ overwrite: true });
    cy.get("button[type=submit]").click();
    cy.get(".h-100 .card-body .card-title").should("contain.text", title);
    cy.get(".h-100 .card-body .card-text").should("contain.text", authors);
    cy.get(".h-100 .card-footer .btn").should(
      "contain.text",
      "Delete from favorite"
    );
  });

  it("should not add new book without title", () => {
    cy.addNew(null, "Test", null, null, null, true);

    cy.get("#title")
      .then((element) => element[0].checkValidity())
      .should("be.false");

    cy.get("#title")
      .then((element) => element[0].validationMessage)
      .should("contain", "Заполните это поле");
  });

  context("delete and add favorites", () => {
    it("delete from favorites", () => {
      cy.deleteFavorite("Тихий шепот");
      cy.get(".h-100")
        .first()
        .within(() => {
          cy.get(".card-title").contains("Тихий шепот");
        })
        .find(".card-footer > .btn")
        .should("contain.text", "Add to favorite");
    });

    it("add to favorites", () => {
      cy.addFavorite("Тихий шепот");
      cy.get(".h-100")
        .first()
        .within(() => {
          cy.get(".card-title").contains("Тихий шепот");
        })
        .get(".card-footer > .btn")
        .should("contain.text", "Delete from favorite");
    });
  });
});
