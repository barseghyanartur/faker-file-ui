const elements = [
  'bin',
  'csv',
  'docx',
  'eml',
  'epub',
  'generic',
  'ico',
  'jpeg',
  'mp3',
  'odp',
  'ods',
  'odt',
  'pdf',
  'png',
  'pptx',
  'rtf',
  'svg',
  'tar',
  'txt',
  'webp',
  'xlsx',
  'xml',
  'zip',
];

describe('Get JSON schema', () => {
  it('passes', () => {
    cy.intercept('GET', 'http://localhost:8000/openapi.json', { fixture: 'openapi.json' })
  })
})

describe('Faker File UI', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // replace with your app's URL
  });

  it('loads the endpoints and models on mount', () => {
    cy.intercept('GET', 'http://localhost:8000/openapi.json', { fixture: 'openapi.json' }).as('fetchEndpoints');

    // make assertions about how your app should behave
    cy.wait('@fetchEndpoints');
    // Further assertions
    elements.forEach(element => {
      cy.contains('span', element).should('be.visible');
    });
  });

  // write more tests...
});
