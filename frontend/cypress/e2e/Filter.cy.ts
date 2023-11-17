describe('Filterpage', () => {
  
  it('Search and filter cars', () => {
    cy.visit('http://localhost:5173/project2/filtercars')

    // Initial loading
    cy.contains('Ferrari 812 Superfast').should('exist')
    cy.contains('Ferrari F8 Tributo').should('exist')
    cy.contains('Ferrari Roma').should('exist')
    cy.contains('Ferrari Portofino M').should('exist')
    cy.contains('Ferrari SF90 Stradale').should('exist')

    // Dynamic loading more cars
    cy.scrollTo('bottom')
    cy.get('.view-more-button').click()
    cy.scrollTo('bottom')
    cy.contains('Toyota Camry').should('exist')
    cy.contains('Toyota Corolla').should('exist')
    cy.contains('Toyota RAV4').should('exist')
    cy.contains('Toyota Highlander').should('exist')
    cy.contains('Toyota 4Runner').should('exist')

    // Search for Toyota
    cy.get('.searchBar-input').type('Toyota')
    cy.contains('Toyota Camry').should('exist')
    cy.contains('Toyota Corolla').should('exist')
    cy.contains('Toyota RAV4').should('exist')
    cy.contains('Toyota Highlander').should('exist')  
    cy.contains('Toyota 4Runner').should('exist')

    // Search and filter year
    cy.get('.searchBar-input').clear().type('Lamborghini')
    cy.contains('Year').click()
    cy.contains('2023').click()
    cy.contains('Lamborghini Sian').should('exist')
    cy.contains('Lamborghini Aventador').should('not.exist')
    cy.contains('Lamborghini Huracan').should('not.exist')
    cy.contains('Lamborghini Urus').should('not.exist')
    cy.contains('2023').click()
    cy.contains('All').click() 

    // Search and filter car body
    cy.get('.searchBar-input').clear().type('Audi')
    cy.contains('Body').click()
    cy.contains('Sedan').click()
    cy.contains('Audi A3').should('exist')
    cy.contains('Audi A4').should('exist')
    cy.contains('Audi Q3').should('not.exist')
    cy.contains('Audi Q5').should('not.exist')
    cy.contains('Sedan').click()
    cy.contains('All').click()

    // Search and filter car year and body
    cy.get('.searchBar-input').clear().type('Porsche')
    cy.contains('Year').click()
    cy.contains('2021').click()
    cy.contains('Body').click()
    cy.contains('SUV').click()
    cy.contains('Porsche Cayenne').should('exist')
    cy.contains('Porsche Macan').should('exist')
    cy.contains('Porsche 911').should('not.exist')
    cy.contains('SUV').click()
    cy.contains('Convertible').click()
    cy.contains('Porsche 911').should('exist')
    cy.contains('Porsche Cayenne').should('not.exist')
    cy.contains('Porsche Macan').should('not.exist')
    cy.contains('2021').click()
    cy.contains('All').click()
    cy.contains('Convertible').click()
    cy.contains('All').click()
  })
})