describe('Favorites', () => {
  it('add and remove favorites', () => {
    cy.visit('http://localhost:5173/project2');

    // Add Ferrari-812 Superfast to favorites
    cy.get('[alt="Ferrari-812 Superfast"]').click();
    cy.url().should('include', 'carpage/Ferrari-812%20Superfast');
    cy.get('.heart').click();

    // Check alert popup shows when adding to favorites
    cy.contains('Successfully added to favorites!').should('exist');

    // Add Ferrari-Portofino M to favorites
    cy.visit('http://localhost:5173/project2');
    cy.get('[alt="Ferrari-Portofino M"]').click();
    cy.url().should('include', 'carpage/Ferrari-Portofino%20M');
    cy.get('.heart').click();

    // Check alert popup shows when adding to favorites
    cy.contains('Successfully added to favorites!').should('exist');

    // Check if both cars are in favorites
    cy.contains('My Favorites').click();
    cy.url().should('include', 'favorites');
    cy.get('[alt="Ferrari-812 Superfast"]').should('exist');
    cy.get('[alt="Ferrari-Portofino M"]').should('exist');

    // Remove Ferrari-812 Superfast from favorites from carpage
    cy.get('[alt="Ferrari-812 Superfast"]').click();
    cy.url().should('include', 'carpage/Ferrari-812%20Superfast');
    cy.get('.heart').click();

    // Check alert popup shows when removing from favorites
    cy.contains('Successfully removed from favorites!').should('exist');

    // Check if Ferrari-812 Superfast is removed from favorites
    cy.contains('My Favorites').click();
    cy.url().should('include', 'favorites');
    cy.get('[alt="Ferrari-Portofino M"]').should('exist');
    cy.get('[alt="Ferrari-812 Superfast"]').should('not.exist');

    // Remove Ferrari-Portofino M from favorites from favorites page
    cy.get('.heart').click();
    cy.get('[alt="Ferrari-Portofino M"]').should('not.exist');
  });

  it('explore cars button when no favorites', () => {
    cy.visit('http://localhost:5173/project2/favorites');

    // Check if favorites page is empty and explore button is present
    cy.contains('Explore cars').should('exist');
    cy.contains('Explore cars').click();
    cy.url().should('not.include', 'favorites');
    cy.url().should('include', 'project2');
  });
});
