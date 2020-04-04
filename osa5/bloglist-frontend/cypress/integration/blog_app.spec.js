describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Test User',
      username: 'testdude',
      password: 'pass',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('log in to application')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#usernameField').type('testdude')
      cy.get('#passwordField').type('pass')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#usernameField').type('testdude')
      cy.get('#passwordField').type('wrongpass')
      cy.get('#login-button').click()
      cy.contains('log in to application')
      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testdude', password: 'pass' })
    })

    it('A blog can be created', function () {
      cy.get('#open').click()
      cy.get('#titleField').type('This is a test blog')
      cy.get('#authorField').type('Author Dude')
      cy.get('#urlField').type('testurl.com')
      cy.get('#add-blog-button').click()
      cy.get('.allBlogs').contains('This is a test blog')
      cy.get('.allBlogs').contains('Author Dude')
    })

    it('Created blog can be liked', function () {
      cy.get('#open').click()
      cy.get('#titleField').type('This is a test blog')
      cy.get('#authorField').type('Author Dude')
      cy.get('#urlField').type('testurl.com')
      cy.get('#add-blog-button').click()

      cy.get('#show-blog-button').click()
      cy.get('#add-like-button').click()
      cy.contains('likes 1')
    })

    it('Created blog can be removed', function () {
      cy.get('#open').click()
      cy.get('#titleField').type('This is a test blog')
      cy.get('#authorField').type('Author Dude')
      cy.get('#urlField').type('testurl.com')
      cy.get('#add-blog-button').click()

      cy.get('#show-blog-button').click()
      cy.get('#remove-blog-button').click()
      cy.get('.allBlogs').should('not.contain', 'This is a test blog')
      cy.get('.allBlogs').should('not.contain', 'Author Dude')
      cy.get('.allBlogs').should('not.contain', 'testurl.com')
    })

    it('Created blogs are sorted by likes', function () {
      cy.createBlog({
        title: 'blog1',
        author: 'Author1',
        url: 'test.com',
        likes: 3,
      })
      cy.createBlog({
        title: 'blog2',
        author: 'Author2',
        url: 'test.com',
        likes: 44,
      })
      cy.createBlog({
        title: 'blog3',
        author: 'Author3',
        url: 'test.com',
        likes: 42,
      })
      cy.createBlog({
        title: 'blog4',
        author: 'Author4',
        url: 'test.com',
        likes: 8,
      })

      cy.get('#show-blog-button').click()
      cy.get('#show-blog-button').click()
      cy.get('#show-blog-button').click()
      cy.get('#show-blog-button').click()

      cy.get('.allBlogs').then((x) => {
        cy.get(x[0].children[0]).contains('likes 44')
        cy.get(x[0].children[1]).contains('likes 42')
        cy.get(x[0].children[2]).contains('likes 8')
        cy.get(x[0].children[3]).contains('likes 3')
      })
    })
  })
})
