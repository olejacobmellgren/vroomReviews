describe('Review cars', () => {
  it('Review cars carpage and delete', () => {
    // Review Ferrari-812 Superfast
    cy.visit('http://http://it2810-25.idi.ntnu.no/project2');
    cy.get('[alt="Ferrari-812 Superfast"]').click();
    cy.url().should('include', 'carpage/Ferrari-812%20Superfast');
    cy.get('.button').contains('Review').click();
    cy.get('textarea').type(
      'This is a successful test review for 812 Superfast',
    );
    cy.get('input[placeholder="name"]').type('Test reviewer');
    cy.get('.button').contains('Submit').click();

    // Check alert popup shows when adding review
    cy.contains('Successfully added review!').should('exist');

    // Check if review is added
    cy.contains('Your review').should('exist');
    cy.contains('This is a successful test review for 812 Superfast').should(
      'exist',
    );

    // Review Ferrari-Portofino M
    cy.visit('http://http://it2810-25.idi.ntnu.no/project2');
    cy.get('[alt="Ferrari-Portofino M"]').click();
    cy.url().should('include', 'carpage/Ferrari-Portofino%20M');
    cy.get('.button').contains('Review').click();
    cy.get('textarea').type('This is a successful test review for Portofino M');
    cy.get('input[placeholder="name"]').type('Test reviewer');
    cy.get('.button').contains('Submit').click();

    // Check alert popup shows when adding review
    cy.contains('Successfully added review!').should('exist');

    // Check if review is added
    cy.contains('Your review').should('exist');
    cy.contains('This is a successful test review for Portofino M').should(
      'exist',
    );

    // Check if both reviews are present
    cy.contains('My Reviews').click();
    cy.url().should('include', 'reviewedcars');
    cy.contains('Ferrari 812 Superfast').should('exist');
    cy.contains('Ferrari Portofino M').should('exist');
    cy.contains('This is a successful test review for 812 Superfast').should(
      'exist',
    );
    cy.contains('This is a successful test review for Portofino M').should(
      'exist',
    );

    // Delete review for Ferrari-812 Superfast and confirm
    cy.get('[alt="Ferrari-812 Superfast"]').click();
    cy.url().should('include', 'carpage/Ferrari-812%20Superfast');
    cy.get('u').contains('delete').click();
    cy.get('.button').contains('Confirm').click();

    // Check alert popup shows when deleting review
    cy.contains('Successfully deleted review!').should('exist');

    // Check if review is deleted and Portofino still exists
    cy.contains('Your review').should('not.exist');
    cy.contains('This is a successful test review for 812 Superfast').should(
      'not.exist',
    );
    cy.contains('My Reviews').click();
    cy.url().should('include', 'reviewedcars');
    cy.contains('Ferrari 812 Superfast').should('not.exist');
    cy.contains('Ferrari Portofino M').should('exist');
    cy.contains('This is a successful test review for Portofino M').should(
      'exist',
    );
    cy.contains('This is a successful test review for 812 Superfast').should(
      'not.exist',
    );

    // Cancel delete review for Ferrari-Portofino M
    cy.get('[alt="Ferrari-Portofino M"]').click();
    cy.url().should('include', 'carpage/Ferrari-Portofino%20M');
    cy.get('u').contains('delete').click();
    cy.get('.button').contains('Cancel').click();

    // Check if review is still present
    cy.contains('Your review').should('exist');
    cy.contains('This is a successful test review for Portofino M').should(
      'exist',
    );

    // Delete review for Ferrari-Portofino M and confirm
    cy.get('u').contains('delete').click();
    cy.get('.button').contains('Confirm').click();

    // Check alert popup shows when deleting review
    cy.contains('Successfully deleted review!').should('exist');

    // Check if review is deleted
    cy.contains('Your review').should('not.exist');
    cy.contains('This is a successful test review for Portofino M').should(
      'not.exist',
    );
    cy.contains('My Reviews').click();
    cy.url().should('include', 'reviewedcars');
    cy.contains('Ferrari Portofino M').should('not.exist');
    cy.contains('This is a successful test review for Portofino M').should(
      'not.exist',
    );
  });
});
