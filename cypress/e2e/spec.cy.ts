/**
 * Webp is disabled.
*/
const providers = {
  bin: {
    category: "Binary",
    fields: ["basename", "prefix", "length", "content"],
  },
  csv: {
    category: "Spreadsheet",
    fields: [
      "basename",
      "prefix",
      "header",
      "data_columns",
      "num_rows",
      "content",
      "encoding",
    ],
  },
  docx: {
    category: "Rich Text",
    fields: ["basename", "prefix", "max_nb_chars", "wrap_chars_after", "content"],
  },
  eml: {
    category: "Archive",
    fields: [
      "basename",
      "prefix",
      "options",
      "max_nb_chars",
      "wrap_chars_after",
      "content",
    ],
  },
  epub: {
    category: "Publishing",
    fields: [
      "basename",
      "prefix",
      "max_nb_chars",
      "wrap_chars_after",
      "content",
      "title",
      "chapter_title",
    ],
  },
  generic: {
    category: "Generic",
    fields: ["content", "extension", "basename", "prefix"],
  },
  "graphic ico": {
    category: "Image",
    fields: ["size", "hue", "luminosity", "basename", "prefix"],
  },
  "graphic jpeg": {
    category: "Image",
    fields: ["size", "hue", "luminosity", "basename", "prefix"],
  },
  "graphic pdf": {
    category: "Publishing",
    fields: ["size", "hue", "luminosity", "basename", "prefix"]
  },
  "graphic png": {
    category: "Image",
    fields: ["size", "hue", "luminosity", "basename", "prefix"],
  },
  "graphic webp": {
    category: "Image",
    fields: ["size", "hue", "luminosity", "basename", "prefix"],
  },
  ico: {
    category: "Image",
    fields: ["basename", "prefix", "max_nb_chars", "wrap_chars_after", "content"],
  },
  jpeg: {
    category: "Image",
    fields: ["basename", "prefix", "max_nb_chars", "wrap_chars_after", "content"],
  },
  mp3: {
    category: "Audio",
    fields: [
      "basename",
      "prefix",
      "max_nb_chars",
      "content",
      "mp3_generator_cls",
      "mp3_generator_kwargs",
    ],
  },
  odp: {
    category: "Presentation",
    fields: ["basename", "prefix", "max_nb_chars", "wrap_chars_after", "content"],
  },
  ods: {
    category: "Spreadsheet",
    fields: ["basename", "prefix", "data_columns", "num_rows", "content"],
  },
  odt: {
    category: "Rich Text",
    fields: ["basename", "prefix", "max_nb_chars", "wrap_chars_after", "content"],
  },
  pdf: {
    category: "Publishing",
    fields: [
      "basename",
      "prefix",
      "max_nb_chars",
      "wrap_chars_after",
      "content",
      "pdf_generator_cls",
      "pdf_generator_kwargs",
    ],
  },
  png: {
    category: "Image",
    fields: ["basename", "prefix", "max_nb_chars", "wrap_chars_after", "content"],
  },
  pptx: {
    category: "Presentation",
    fields: ["basename", "prefix", "max_nb_chars", "wrap_chars_after", "content"],
  },
  rtf: {
    category: "Rich Text",
    fields: ["basename", "prefix", "max_nb_chars", "wrap_chars_after", "content"],
  },
  svg: {
    category: "Image",
    fields: ["basename", "prefix", "max_nb_chars", "wrap_chars_after", "content"],
  },
  tar: {
    category: "Archive",
    fields: ["basename", "prefix", "options", "compression"],
  },
  txt: {
    category: "Text",
    fields: ["basename", "prefix", "max_nb_chars", "wrap_chars_after", "content"],
  },
  // webp: {
  //   category: "Image",
  //   fields: ["basename", "prefix", "max_nb_chars", "wrap_chars_after", "content"],
  // },
  xlsx: {
    category: "Spreadsheet",
    fields: ["basename", "prefix", "data_columns", "num_rows", "content"],
  },
  xml: {
    category: "Data",
    fields: [
      "basename",
      "prefix",
      "root_element",
      "row_element",
      "data_columns",
      "num_rows",
      "content",
      "encoding",
    ],
  },
  zip: {
    category: "Archive",
    fields: ["basename", "prefix", "options"],
  },
};

/**
 * Webp is disabled.
*/
const formValues = {
  // This object should include values to fill in the form for each provider.
  // Each key should be a provider name, and each value should be an object that has field names and values.
  bin: { basename: "test", length: 5 },
  csv: { basename: "test", num_rows: 10 },
  docx: { basename: "test", max_nb_chars: 10000 },
  eml: { basename: "test", max_nb_chars: 10000 },
  epub: { basename: "test", max_nb_chars: 10000 },
  generic: {
    basename: "test",
    content: "<html><body>hello</body></html>",
    extension: "html",
  },
  "graphic ico": { basename: "test" },
  "graphic jpeg": { basename: "test" },
  "graphic pdf": { basename: "test" },
  "graphic png": { basename: "test" },
  "graphic webp": { basename: "test" },
  ico: { basename: "test", max_nb_chars: 5000 },
  jpeg: { basename: "test", max_nb_chars: 5000 },
  mp3: {
    basename: "test",
    max_nb_chars: 500,
    mp3_generator_cls:
      "faker_file.providers.mp3_file.generators.gtts_generator.GttsMp3Generator",
  },
  odp: { basename: "test", max_nb_chars: 10000 },
  ods: { basename: "test", num_rows: 10 },
  odt: { basename: "test", max_nb_chars: 10000 },
  pdf: {
    basename: "test",
    max_nb_chars: 10000,
    pdf_generator_cls:
      "faker_file.providers.pdf_file.generators.pdfkit_generator.PdfkitPdfGenerator",
  },
  png: { basename: "test", max_nb_chars: 5000 },
  pptx: { basename: "test", max_nb_chars: 10000 },
  rtf: { basename: "test", max_nb_chars: 10000 },
  svg: { basename: "test", max_nb_chars: 5000 },
  tar: { basename: "test" },
  txt: { basename: "test", max_nb_chars: 10000 },
  // webp: { basename: "test", max_nb_chars: 5000 },
  xlsx: { basename: "test", num_rows: 10 },
  xml: {
    basename: "test",
    root_element: "root",
    row_element: "row",
    num_rows: 10,
    data_columns: {
      name: "{{name}}",
      sentence: "{{sentence}}",
      address: "{{address}}",
    },
  },
  zip: { basename: "test" },
};

let selects = [
    "mp3_generator_cls",
    "pdf_generator_cls",
    "image_generator_cls",
]

beforeEach(() => {
  cy.viewport(2048, 1152);
  cy.window().then((win) => {
    win.scrollTo(0, 0)
  });
  // cy.get('#root').scrollTo('top')
})

describe("Get JSON schema", () => {
  it("passes", () => {
    cy.intercept("GET", "http://127.0.0.1:8000/openapi.json", {
      fixture: "openapi.json",
    });
  });
});

describe("Faker File UI", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:3000");
    cy.intercept("GET", "http://127.0.0.1:8000/openapi.json", {
      fixture: "openapi.json",
    }).as("fetchEndpoints");
    cy.wait("@fetchEndpoints");
  });

  Object.entries(providers).forEach(([provider, data]) => {
    it(`loads the form for ${provider}`, () => {
      cy.get("div.category").contains("span", new RegExp(`^${data["category"]}$`)).click();
      cy.get("div.subcategory").contains("span", new RegExp(`^${provider}$`)).click();
      cy.window().then((win) => {
        win.scrollTo(0, 0)
      });
      data["fields"].forEach((field) => {
        if (selects.includes(field)) {
          // Special handling for the select fields
          cy.get(`[name="${field}"]`).should('exist');
        } else {
          cy.get(`[name="${field}"]`).should('be.visible');
        }
      });
    });
  });
});

describe("Submit form data and get file download link", () => {
  Object.entries(providers).forEach(([provider, data]) => {
    it(`submits the form for ${provider}`, () => {
      // Visit the site
      cy.visit("http://127.0.0.1:3000");
      cy.intercept("GET", "http://127.0.0.1:8000/openapi.json", {
        fixture: "openapi.json",
      }).as("fetchEndpoints");
      cy.wait("@fetchEndpoints");

      cy.get("div.category").contains("span", new RegExp(`^${data["category"]}$`)).click();
      cy.get("div.subcategory").contains("span", new RegExp(`^${provider}$`)).click();
      data["fields"].forEach((field) => {
        if (selects.includes(field)) {
          // Special handling for the select fields
          cy.get(`[name="${field}"]`).should('exist');
        } else {
          cy.get(`[name="${field}"]`).should('be.visible');
        }
      });

      // Fill in the form and submit it
      const values = formValues[provider];
      for (let field in values) {
        // If value is an object, convert it to a JSON string
        const value =
          typeof values[field] === "object"
            ? JSON.stringify(values[field])
            : values[field];
        cy.get(`[name="${field}"]`).type(value, {
          parseSpecialCharSequences: false,
          force: true,
        });
      }

      const extension = values["extension"] ? values["extension"] : provider;
      cy.intercept("POST", `http://127.0.0.1:8000/${provider.replace(/ /g, "_")}_file/`, {
        fixture: "download.json",
        headers: {
          "Content-Disposition": `attachment; filename=test.${extension}`,
        },
      }).as("postRequest");

      // Submit the form
      cy.get("button").contains("Generate").click();

      // Wait for the request to resolve
      cy.wait("@postRequest", { timeout: 20000 });

      // Assert that the download link has the correct href and download attributes
      cy.get("a")
        .contains("Download")
        .should("have.attr", "href")
        .should("include", "blob:");
      cy.get("a")
        .contains("Download")
        .should("have.attr", "download", `test.${extension}`);
    });
  });
});