Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  const token = JSON.parse(localStorage.getItem('loggedUser')).token;
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: {
      title,
      author,
      url,
      likes
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Welcome to Bloglist App')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Welcome to Bloglist App')
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.contains('Iniciar sesión').click()

      cy.contains('logged in')
    })
  
    it('fails with wrong credentials', function() {
      cy.contains('Welcome to Bloglist App')
      cy.get('#username').type('admin')
      cy.get('#password').type('pepe')
      cy.contains('Iniciar sesión').click()

      cy.get('html').should('not.contain', 'Admin User is logged in')
    })
  })

  describe('When logged in', function() {
    
    beforeEach(function() {
      cy.contains('Welcome to Bloglist App')
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.contains('Iniciar sesión').click()

      cy.contains('admin is logged in')
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('input[name="Title"]').type('Test Blog');
      cy.get('input[name="Author"]').type('Test Author');
      cy.get('input[name="URL"]').type('http://testblog.com');

      cy.contains('create').click();

      cy.contains('Test Blog')
    })

    it('User can like a blog', function() {
      cy.contains('Test Blog Test Author').parent('.blog').as('blogItem');
    
      cy.get('@blogItem').find('#toggleVisibilityButton').click();
      cy.get('@blogItem').find('#likeButton').click();
    });

    it('User can delete a blog they created', function() {
      // Crear un nuevo blog
      cy.contains('New blog').click()
      cy.get('input[name="Title"]').type('Test Blog to delete');
      cy.get('input[name="Author"]').type('Test Author');
      cy.get('input[name="URL"]').type('http://testblogtodelete.com');
    
      cy.contains('create').click();
      
      cy.reload();

      cy.contains('Test Blog to delete Test Author').parent('.blog').as('blogItem');
    
      cy.get('@blogItem').find('#toggleVisibilityButton').click();
      cy.contains('remove').click()
      cy.on('window:confirm', () => true);

      cy.get('html').should('not.contain', 'Test Blog to delete Test Author');
    });

    
    
    describe('Deleting a blog', function() {
      beforeEach(function() {
        // Crea un nuevo blog
        cy.createBlog({ title: 'Test Blog to delete', author: 'Test Author', url: 'http://testblogtodelete.com' })
      })
  
      it('User cannot delete a blog they did not create', function() {
        // Desconecta al usuario actual
        cy.contains('Logout').click()
  
        // Inicia sesión como un usuario diferente
        cy.get('#username').type('test')
        cy.get('#password').type('test')
        cy.contains('Iniciar sesión').click()
  
        // Intenta eliminar el blog creado por 'admin'
        cy.contains('Test Blog to delete Test Author').parent('.blog').as('blogItem');
        cy.get('@blogItem').find('#toggleVisibilityButton').click();
  
        // Verifica que el botón de eliminar no está presente
        cy.get('@blogItem').should('not.contain', 'remove')
      })
    })
  
    describe('Blogs ordered by number of likes', function() {
      beforeEach(function() {
        cy.createBlog({ author: 'Davidu', title: 'test1', url: 'http://example.com./test1' })
        cy.createBlog({ author: 'Davidu', title: 'test2', url: 'http://example.com./test2' })
        cy.createBlog({ author: 'Davidu', title: 'test3', url: 'http://example.com./test3' })
        
        cy.reload()

        cy.contains('test1').parent().parent().as('blog1')
        cy.contains('test2').parent().parent().as('blog2')
        cy.contains('test3').parent().parent().as('blog3')
      })
    
      it('they are ordered by number of likes', function() {

        cy.reload()
        
        cy.get('@blog1').contains('view').click()
        cy.get('@blog2').contains('view').click()
        cy.get('@blog3').contains('view').click()
        cy.get('@blog1').contains('like').as('like1')
        cy.get('@blog2').contains('like').as('like2')
        cy.get('@blog3').contains('like').as('like3')
    
        cy.get('@like2').click()
        cy.wait(500)
        cy.get('@like1').click()
        cy.wait(500)
        cy.get('@like1').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)
    
        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('3')
          cy.wrap(blogs[1]).contains('2')
          cy.wrap(blogs[2]).contains('1')
        })
      })
    })
    
  })
  
})
