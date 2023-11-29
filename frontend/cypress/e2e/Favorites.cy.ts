describe('Favorites', () => {
  it('add and remove favorites', () => {
    cy.visit('http://localhost:5173/project2');

    // Add Volvo XC40 to favorites
    cy.get('[data-testid="NavigateNextIcon"]').click();
    cy.get('[alt="Volvo-XC40"]').click();
    cy.url().should('include', 'carpage/Volvo-XC40');
    cy.get('.heart').click();

    // Check alert popup shows when adding to favorites
    cy.contains('Successfully added to favorites!').should('exist');

    // Add Volvo XC60 to favorites
    cy.visit('http://localhost:5173/project2');
    cy.get('[alt="Volvo-XC60"]').click();
    cy.url().should('include', 'carpage/Volvo-XC60');
    cy.get('.heart').click();

    // Check alert popup shows when adding to favorites
    cy.contains('Successfully added to favorites!').should('exist');

    // Check if both cars are in favorites
    cy.contains('My Favorites').click();
    cy.url().should('include', 'favorites');
    cy.get('[alt="Volvo-XC40"]').should('exist');
    cy.get('[alt="Volvo-XC60"]').should('exist');

    // Remove Volvo XC40 from favorites from carpage
    cy.get('[alt="Volvo-XC40"]').click();
    cy.url().should('include', 'carpage/Volvo-XC40');
    cy.get('.heart').click();

    // Check alert popup shows when removing from favorites
    cy.contains('Successfully removed from favorites!').should('exist');

    // Check if Volvo XC40 is removed from favorites
    cy.contains('My Favorites').click();
    cy.url().should('include', 'favorites');
    cy.get('[alt="Volvo-XC60"]').should('exist');
    cy.get('[alt="Volvo-XC40"]').should('not.exist');

    // Remove Volvo XC60 from favorites from favorites page
    cy.get('.heart').click();
    cy.get('[alt="Volvo-XC60"]').should('not.exist');
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
