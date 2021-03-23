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

  it('login form is shown', function() {
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

    it('a blog can be created', function() {
      cy.createBlog({
        title: 'A new note from cypress',
        author: 'Franco Romano',
        url: 'www.google.com'
      })
    })

    describe('Users can interact with created blogs', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'First note from cypress', author: 'Franco Romano', url: 'www.google.com', likes: 5 })
        cy.createBlog({ title: 'Second note from cypress', author: 'Bianca Perotti', url: 'www.google.com', likes: 10 })
        cy.createBlog({ title: 'Third note from cypress', author: 'Tomas Fernandez', url: 'www.google.com', likes: 15 })
        cy.createBlog({ title: 'Fourth note from cypress', author: 'Mauro Ostinelli', url: 'www.google.com', likes: 20 })
      })

      it('and like a blog', function() {
        cy.contains('view').click()

        cy.contains('like').click()
        cy.get('.likes-counter')
          .should('contain', 'likes: 21')
      })

      it('and delete its own blog', function() {
        cy.contains('view').click()

        cy.get('#remove-blog').click()
        cy.contains('Fourth note from cypress').should('not.exist')
      })

      it('and blogs are ordered according to likes', function () {
        cy.get('section > article')
          .then(blogs => {
            expect(blogs[0]).to.contain.text('likes: 20')
          })
      })

    })
  })
})
