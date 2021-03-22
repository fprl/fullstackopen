describe.only('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'A new note from cypress',
        author: 'Franco Romano',
        url: 'www.google.com'
      })
    })

    describe.only('users can interact with created blogs', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'A new note from cypress',
          author: 'Franco Romano',
          url: 'www.google.com'
        })
      })

      it('User can like a blog', function() {
        cy.contains('view').click()

        cy.get('.click').click()
        cy.get('.likes-counter')
          .should('contain', 'likes: 1')
      })
    })
  })
})
