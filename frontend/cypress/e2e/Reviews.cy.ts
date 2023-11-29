describe('Review cars', () => {
  it('Review cars carpage and delete', () => {
    // Review Ferrari-812 Superfast
    cy.visit('http://localhost:5173/project2/filtercars');
    cy.get('[alt="Ferrari-812 Superfast"]').click();
    cy.url().should('include', 'carpage/Ferrari-812%20Superfast');
    cy.get('button').contains('Review').click();
    cy.get('textarea').type(
      'This is a successful test review for 812 Superfast',
    );
    cy.get('input[placeholder="Name"]').type('Test reviewer');
    cy.get('button').contains('Submit').click();

    // Check alert popup shows when adding review
    cy.contains('Successfully added review!').should('exist');

    // Check if review is added
    cy.contains('Your review').should('exist');
    cy.contains('This is a successful test review for 812 Superfast').should(
      'exist',
    );

    // Review Ferrari-Roma
    cy.visit('http://localhost:5173/project2/filtercars');
    cy.get('[alt="Ferrari-Roma"]').click();
    cy.url().should('include', 'carpage/Ferrari-Roma');
    cy.get('button').contains('Review').click();
    cy.get('textarea').type('This is a successful test review for Roma');
    cy.get('input[placeholder="Name"]').type('Test reviewer');
    cy.get('button').contains('Submit').click();

    // Check alert popup shows when adding review
    cy.contains('Successfully added review!').should('exist');

    // Check if review is added
    cy.contains('Your review').should('exist');
    cy.contains('This is a successful test review for Roma').should('exist');

    // Check if both reviews are present
    cy.contains('My Reviews').click();
    cy.url().should('include', 'reviewedcars');
    cy.get('[alt="Ferrari-812 Superfast"]').should('exist');
    cy.get('[alt="Ferrari-Roma"]').should('exist');
    cy.contains('This is a successful test review for 812 Superfast').should(
      'exist',
    );
    cy.contains('This is a successful test review for Roma').should('exist');

    // Delete review for Ferrari-812 Superfast and confirm
    cy.get('[alt="Ferrari-812 Superfast"]').click();
    cy.url().should('include', 'carpage/Ferrari-812%20Superfast');
    cy.get('.delete-review').click();
    cy.get('button').contains('Confirm').click();

    // Check alert popup shows when deleting review
    cy.contains('Successfully deleted review!').should('exist');

    // Check if review is deleted and Portofino still exists
    cy.contains('Your review').should('not.exist');
    cy.contains('This is a successful test review for 812 Superfast').should(
      'not.exist',
    );
    cy.contains('My Reviews').click();
    cy.url().should('include', 'reviewedcars');
    cy.get('[alt="Ferrari-812 Superfast"]').should('not.exist');
    cy.get('[alt="Ferrari-Roma"]').should('exist');
    cy.contains('This is a successful test review for Roma').should('exist');
    cy.contains('This is a successful test review for 812 Superfast').should(
      'not.exist',
    );

    // Cancel delete review for Ferrari-Roma
    cy.get('[alt="Ferrari-Roma"]').click();
    cy.url().should('include', 'carpage/Ferrari-Roma');
    cy.get('.delete-review').click();
    cy.get('button').contains('Cancel').click();

    // Check if review is still present
    cy.contains('Your review').should('exist');
    cy.contains('This is a successful test review for Roma').should('exist');

    // Delete review for Ferrari-Roma and confirm
    cy.get('.delete-review').click();
    cy.get('button').contains('Confirm').click();

    // Check alert popup shows when deleting review
    cy.contains('Successfully deleted review!').should('exist');

    // Check if review is deleted
    cy.contains('Your review').should('not.exist');
    cy.contains('This is a successful test review for Roma').should(
      'not.exist',
    );
    cy.contains('My Reviews').click();
    cy.url().should('include', 'reviewedcars');
    cy.get('[alt="Ferrari-Roma"]').should('not.exist');
    cy.contains('This is a successful test review for Roma').should(
      'not.exist',
    );
  });
});
