describe('Filterpage', () => {
  it('Search and filter cars', () => {
    cy.visit('http://localhost:5173/project2/filtercars');

    // Initial loading
    cy.contains('Ferrari 812 Superfast').should('exist');
    cy.contains('Ferrari F8 Tributo').should('exist');
    cy.contains('Ferrari Roma').should('exist');
    cy.contains('Ferrari Portofino M').should('exist');
    cy.contains('Ferrari SF90 Stradale').should('exist');

    // Dynamic loading more cars
    cy.scrollTo('bottom');
    cy.get('.view-more-button').click();
    cy.scrollTo('bottom');
    cy.contains('Toyota Camry').should('exist');
    cy.contains('Toyota Corolla').should('exist');
    cy.contains('Toyota RAV4').should('exist');
    cy.contains('Toyota Highlander').should('exist');
    cy.contains('Toyota 4Runner').should('exist');

    // Search for Toyota
    cy.get('.searchBar-input').type('Toyota');
    cy.contains('Toyota Camry').should('exist');
    cy.contains('Toyota Corolla').should('exist');
    cy.contains('Toyota RAV4').should('exist');
    cy.contains('Toyota Highlander').should('exist');
    cy.contains('Toyota 4Runner').should('exist');

    // Search and filter car body
    cy.get('.searchBar-input').clear().type('Audi');
    cy.contains('Body').click();
    cy.contains('Sedan').click();
    cy.contains('Audi A3').should('exist');
    cy.contains('Audi A4').should('exist');
    cy.contains('Audi Q3').should('not.exist');
    cy.contains('Audi Q5').should('not.exist');
    cy.contains('Sedan').click();
    cy.get('.clearButton').click();

    // Filter car body
    cy.get('.searchBar-input').clear();
    cy.contains('Body').click();
    cy.contains('City car').click();
    cy.contains('Smart Fortwo').should('exist');
    cy.contains('Smart Forfour').should('exist');
    cy.get('.clearButton').click();

    // Check feedback when no cars are found
    cy.get('.searchBar-input').clear().type('This car does not exist');
    cy.contains('No cars found').should('exist');
    cy.contains('Try changing your searchterm').should('exist');
    cy.get('.searchBar-input').clear();
  });
});
