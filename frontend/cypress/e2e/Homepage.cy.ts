describe('Homepage tests', () => {
  it('Test homepage loads correct brands and cars', () => {
    cy.visit('http://localhost:5173/project2')
    cy.contains('Ferrari')
    cy.contains('Audi')
    cy.scrollTo('bottom')
    cy.contains('Mercedes Benz')
    cy.get('.view-more-button').contains('Next Page').click()

    cy.contains('Volvo')
    cy.contains('Porsche')
    cy.scrollTo('bottom')
    cy.contains('Alfa Romeo')
    cy.get('.view-more-button').contains('Next Page').click()

    cy.contains('Alpina')
    cy.contains('BMW')
    cy.scrollTo('bottom')
    cy.contains('Bugatti')
    cy.get('.view-more-button').contains('Next Page').click()

    cy.contains('Cadillac')
    cy.contains('Caterham')
    cy.scrollTo('bottom')
    cy.contains('Chevrolet')
    cy.get('.view-more-button').contains('Prev Page').click()
    cy.get('.view-more-button').contains('Prev Page').click()
    cy.get('.view-more-button').contains('Prev Page').click()
    cy.contains('Ferrari')
    cy.contains('Audi')
    cy.contains('Mercedes Benz')
  })

  it('Test arrows for scrolling and click car', () => {
    cy.visit('http://localhost:5173/project2')
    cy.get('.right').click().click().click()
    cy.get('[alt="Ferrari-Portofino M"]').click()

    cy.url().should('include', 'carpage/Ferrari-Portofino%20M')
    cy.go('back')
    cy.contains('Ferrari')

    cy.get('[alt="Ferrari-812 Superfast"]').click()
    cy.url().should('include', 'carpage/Ferrari-812%20Superfast')
  })
})

