const providers = {
  'bin': ['basename', 'prefix', 'length', 'content',],
  'csv': ['basename', 'prefix', 'header', 'data_columns', 'num_rows', 'content', 'encoding'],
  'docx': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'eml': ['basename', 'prefix', 'options', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'epub': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content', 'title', 'chapter_title'],
  'generic': ['content', 'extension', 'basename', 'prefix'],
  'ico': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'jpeg': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'mp3': ['basename', 'prefix', 'max_nb_chars', 'content', 'mp3_generator_cls', 'mp3_generator_kwargs'],
  'odp': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'ods': ['basename', 'prefix', 'data_columns', 'num_rows', 'content'],
  'odt': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'pdf': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content', 'pdf_generator_cls', 'pdf_generator_kwargs'],
  'png': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'pptx': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'rtf': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'svg': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'tar': ['basename', 'prefix', 'options', 'compression'],
  'txt': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'webp': ['basename', 'prefix', 'max_nb_chars', 'wrap_chars_after', 'content'],
  'xlsx': ['basename', 'prefix', 'data_columns', 'num_rows', 'content'],
  'xml': ['basename', 'prefix', 'root_element', 'row_element', 'data_columns', 'num_rows', 'content', 'encoding'],
  'zip': ['basename', 'prefix', 'options'],
};

describe('Get JSON schema', () => {
  it('passes', () => {
    cy.intercept('GET', 'http://localhost:8000/openapi.json', { fixture: 'openapi.json' })
  })
})

describe('Faker File UI', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', 'http://localhost:8000/openapi.json', { fixture: 'openapi.json' }).as('fetchEndpoints');
    cy.wait('@fetchEndpoints');
  });

  Object.entries(providers).forEach(([provider, fields]) => {
    it(`loads the form for ${provider}`, () => {
      cy.contains('span', provider).click();
      fields.forEach((field) => {
        cy.get(`[name="${field}"]`).should('be.visible');
      });
    });
  });
});
