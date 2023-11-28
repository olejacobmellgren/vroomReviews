describe('Filterpage', () => {
  it('Search and filter cars', () => {
    cy.visit('http://localhost:5173/project2/filtercars');

    // Initial loading
    cy.get('[alt="Ferrari-812 Superfast"]').should('exist');
    cy.get('[alt="Ferrari-F8 Tributo"]').should('exist');
    cy.get('[alt="Ferrari-Roma"]').should('exist');
    cy.get('[alt="Ferrari-Portofino M"]').should('exist');
    cy.get('[alt="Ferrari-SF90 Stradale"]').should('exist');

    // Dynamic loading more cars
    cy.scrollTo('bottom');
    cy.get('.view-more-button').click();
    cy.scrollTo('bottom');
    cy.get('[alt="Toyota-Camry"]').should('exist');
    cy.get('[alt="Toyota-Corolla"]').should('exist');
    cy.get('[alt="Toyota-RAV4"]').should('exist');
    cy.get('[alt="Toyota-Highlander"]').should('exist');
    cy.get('[alt="Toyota-4Runner"]').should('exist');

    // Search for Toyota
    cy.get('.search-bar-input').type('Toyota');
    cy.get('[alt="Toyota-Camry"]').should('exist');
    cy.get('[alt="Toyota-Corolla"]').should('exist');
    cy.get('[alt="Toyota-RAV4"]').should('exist');
    cy.get('[alt="Toyota-Highlander"]').should('exist');
    cy.get('[alt="Toyota-4Runner"]').should('exist');

    // Search and filter car body
    cy.get('.search-bar-input').clear().type('Audi');
    cy.contains('Body').click();
    cy.contains('Sedan').click();
    cy.get('[alt="Audi-A3"]').should('exist');
    cy.get('[alt="Audi-A4"]').should('exist');
    cy.get('[alt="Audi-Q3"]').should('not.exist');
    cy.get('[alt="Audi-Q5"]').should('not.exist');
    cy.contains('Sedan').click();
    cy.get('.clear-button').click();

    // Filter car body
    cy.get('.search-bar-input').clear();
    cy.contains('Body').click();
    cy.contains('City car').click();
    cy.get('[alt="Smart-Fortwo"]').should('exist');
    cy.get('[alt="Smart-Forfour"]').should('exist');
    cy.get('.clear-button').click();

    // Check feedback when no cars are found
    cy.get('.search-bar-input').clear().type('This car does not exist');
    cy.contains('No cars found').should('exist');
    cy.contains('Try changing your searchterm').should('exist');
    cy.get('.search-bar-input').clear();
  });
});
