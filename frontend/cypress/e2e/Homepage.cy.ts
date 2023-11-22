describe('Homepage tests', () => {
  it('homepage loads correct brands and cars', () => {
    cy.visit('http://localhost:5173/project2')

    // Check if all brands are present on first page
    cy.contains('Ferrari').should('exist')
    cy.contains('Audi').should('exist')
    cy.scrollTo('bottom')
    cy.contains('Mercedes Benz').should('exist')
    cy.get('[data-testid="NavigateNextIcon"]').click()

    // Check if all brands are present on second page
    cy.contains('Volvo').should('exist')
    cy.contains('Porsche').should('exist')
    cy.scrollTo('bottom')
    cy.contains('Alfa Romeo').should('exist')
    cy.get('[data-testid="NavigateNextIcon"]').click()

    // Check if all brands are present on third page
    cy.contains('Alpina').should('exist')
    cy.contains('BMW').should('exist')
    cy.scrollTo('bottom')
    cy.contains('Bugatti').should('exist')
    cy.get('[data-testid="NavigateNextIcon"]').click()

    // Check if all brands are present on fourth page
    cy.contains('Cadillac').should('exist')
    cy.contains('Caterham').should('exist')
    cy.scrollTo('bottom')
    cy.contains('Chevrolet').should('exist')

    // Go back to first page
    cy.get('[data-testid="NavigateBeforeIcon"]').click()
    cy.get('[data-testid="NavigateBeforeIcon"]').click()
    cy.contains('1').click()

    // Check if all brands are present on first page
    cy.contains('Ferrari').should('exist')
    cy.contains('Audi').should('exist')
    cy.contains('Mercedes Benz').should('exist')
  })

  it('arrows for scrolling and click car', () => {
    cy.visit('http://localhost:5173/project2')

    // Check if arrows work
    cy.get('.right').click({ multiple: true })

    // Check if carpage is loaded when click from scrollingmenu
    cy.get('[alt="Ferrari-Portofino M"]').click()
    cy.url().should('include', 'carpage/Ferrari-Portofino%20M')

    // Go back to homepage and check if Ferrari-812 Superfast is present
    cy.go('back')
    cy.contains('Ferrari').should('exist')
    cy.get('[alt="Ferrari-812 Superfast"]').click()
    cy.url().should('include', 'carpage/Ferrari-812%20Superfast')
  })
})

