===============
`faker-file-ui`
===============
.. External references

.. _faker-file: https://github.com/barseghyanartur/faker-file
.. _faker-file-api: https://github.com/barseghyanartur/faker-file-api
.. _ReactJS: https://reactjs.org/
.. _MaterialUI: https://mui.com/material-ui/

`ReactJS`_/`MaterialUI`_ based UI frontend for `faker-file-api`_ REST API.

.. image:: https://github.com/barseghyanartur/faker-file-ui/actions/workflows/node.js.yml/badge.svg?branch=main
   :target: https://github.com/barseghyanartur/faker-file-ui/actions
   :alt: Build Status

.. image:: https://coveralls.io/repos/github/barseghyanartur/faker-file-ui/badge.svg?branch=main&service=github
    :target: https://coveralls.io/github/barseghyanartur/faker-file-ui?branch=main
    :alt: Coverage

Prerequisites
=============
- Running `faker-file-api`_ REST API service.
- NodeJS

Installation
============

.. code-block:: sh

    npm install

Running
=======

.. code-block:: sh

    npm start

How it is supposed to work?
===========================
The wizard
----------
Three column design:

.. code-block:: text

    | File type             | Options               | Result                |
    | --------------------- | --------------------- | --------------------- |
    |  - bin                | basename ____________ | -> Download           |
    |  - csv                | prefix ______________ |                       |
    |  -> docx              | max_nb_chars ________ |                       |
    |  - eml                | wrap_chars_after ____ |                       |
    |  - epub               | content _____________ |                       |
    |  - epub               |                       |                       |
    |  - generic            |                       |                       |
    |  - ico                | -> Generate           |                       |
    |  - jpeg               |                       |                       |
    |  - mp3                |                       |                       |
    |  - odp                |                       |                       |
    |  - ods                |                       |                       |
    |  - odt                |                       |                       |
    |  - pdf                |                       |                       |
    |  - png                |                       |                       |
    |  - pptx               |                       |                       |
    |  - rtf                |                       |                       |
    |  - svg                |                       |                       |
    |  - tar                |                       |                       |
    |  - txt                |                       |                       |
    |  - xlsx               |                       |                       |
    |  - xml                |                       |                       |
    |  - zip                |                       |                       |

**Step 1: Choose File type**

- File type

**Step 2: Fine tune the Options (specific for each File type)**

- All options of `faker-file`_ are be supported, except for a very specific
  ones, such as ``storage``.

**Step 3: Generate file**

- Clicking on ``Generate`` button, should generate the file and
  render ``Download`` link in the ``Result`` column.

Supported file types
--------------------
- ``BIN``
- ``CSV``
- ``DOCX``
- ``EML``
- ``EPUB``
- ``ICO``
- ``JPEG``
- ``MP3``
- ``ODS``
- ``ODT``
- ``ODP``
- ``PDF``
- ``PNG``
- ``RTF``
- ``PPTX``
- ``SVG``
- ``TAR``
- ``TXT``
- ``XLSX``
- ``XML``
- ``ZIP``

Writing documentation
=====================

Keep the following hierarchy.

.. code-block:: text

    =====
    title
    =====

    header
    ======

    sub-header
    ----------

    sub-sub-header
    ~~~~~~~~~~~~~~

    sub-sub-sub-header
    ^^^^^^^^^^^^^^^^^^

    sub-sub-sub-sub-header
    ++++++++++++++++++++++

    sub-sub-sub-sub-sub-header
    **************************

Testing
=======
Run tests against running instance
---------------------------------
Run all tests:

.. code-block:: sh

    npx cypress open

Run all tests in headless mode:

.. code-block:: sh

    npx cypress run --headless

Run tests instance and tests
---------------------------
Run all tests:

.. code-block:: sh

    npm run cy:test

Run all tests in headless mode:

.. code-block:: sh

    npm run cy:test-headless

License
=======
MIT

Support
=======
For security issues contact me at the e-mail given in the `Author`_ section.

For overall issues, go to `GitHub <https://github.com/barseghyanartur/faker-file-ui/issues>`_.

Author
======
Artur Barseghyan <artur.barseghyan@gmail.com>
