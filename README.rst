===============
`faker-file-ui`
===============
.. _faker-file: https://github.com/barseghyanartur/faker-file
.. _faker-file-api: https://github.com/barseghyanartur/faker-file-api
.. _ReactJS: https://reactjs.org/
.. _MaterialUI: https://mui.com/material-ui/

`ReactJS`_/`MaterialUI`_ based UI frontend for `faker-file-api`_ REST API.

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
    |  - bin                | prefix ______________ | -> Download           |
    |  - csv                | max_nb_chars ________ |                       |
    |  -> docx              | wrap_chars_after ____ |                       |
    |  - eml                | content _____________ |                       |
    |  - epub               |                       |                       |
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
    |  - webp               |                       |                       |
    |  - xlsx               |                       |                       |
    |  - zip                |                       |                       |

**Step 1: Choose File type**

- File type

**Step 2: Fine tune the Options (specific for each File type)**

- All options of `faker-file`_ are be supported, except for a very specific
  ones, like ``storage`` or ``mp3_generator_cls``.

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
- ``WEBP``
- ``XLSX``
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
