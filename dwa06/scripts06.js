import { books, authors, genres, BOOKS_PER_PAGE } from './data06.js';

/**
 * Helper function to create an HTML element.
 * @param {string} tag - The HTML tag name.
 * @param {Object} attributes - An object containing element attributes.
 * @param {string} innerHTML - Inner HTML content for the element.
 * @returns {HTMLElement} - The created HTML element.
 */
function createElement(tag, attributes, innerHTML) {
  const element = document.createElement(tag);
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  element.innerHTML = innerHTML;
  return element;
}

/**
 * Helper function to populate a select element with options.
 * @param {HTMLSelectElement} selectElement - The select element to populate.
 * @param {Object} options - An object containing option values and labels.
 * @param {string} defaultOptionText - The text for the default (first) option.
 */
function populateSelect(selectElement, options, defaultOptionText) {
  const selectFragment = document.createDocumentFragment();
  const defaultOption = createElement('option', { value: 'any' }, defaultOptionText);
  selectFragment.appendChild(defaultOption);

  for (const [id, name] of Object.entries(options)) {
    const option = createElement('option', { value: id }, name);
    selectFragment.appendChild(option);
  }

  selectElement.appendChild(selectFragment);
}

/**
 * Helper function to update the theme.
 * @param {string} theme - The theme ('day' or 'night').
 */
function updateTheme(theme) {
  const colorDark = theme === 'night' ? '255, 255, 255' : '10, 10, 20';
  const colorLight = theme === 'night' ? '10, 10, 20' : '255, 255, 255';
  document.documentElement.style.setProperty('--color-dark', colorDark);
  document.documentElement.style.setProperty('--color-light', colorLight);
}

/**
 * Helper function to filter books based on search criteria.
 * @param {Object} filters - The search filters including title, author, and genre.
 * @returns {Array} - An array of filtered books.
 */
function filterBooks(filters) {
  return books.filter((book) => {
    let genreMatch = filters.genre === 'any';

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    return (
      (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === 'any' || book.author === filters.author) &&
      genreMatch
    );
  });
}

/**
 * Helper function to create a preview button for a book.
 * @param {Object} book - The book object.
 * @returns {HTMLElement} - The created preview button element.
 */
function createPreviewButton(book) {
  const element = createElement('button', { class: 'preview', 'data-preview': book.id }, `
    <img class="preview__image" src="${book.image}" />
    <div class="preview__info">
      <h3 class="preview__title">${book.title}</h3>
      <div class="preview__author">${authors[book.author]}</div>
    </div>
  `);
  return element;
}

// The code execution starts when the DOM content is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
  const page = 1;
  let matches = books;

  // Create a document fragment to add initial book previews.
  const starting = document.createDocumentFragment();
  matches.slice(0, BOOKS_PER_PAGE).forEach((book) => {
    const element = createPreviewButton(book);
    starting.appendChild(element);
  });

  // Append the book previews to the page.
  document.querySelector('[data-list-items]').appendChild(starting);

  // Populate the genre and author select elements with options.
  populateSelect(document.querySelector('[data-search-genres]'), genres, 'All Genres');
  populateSelect(document.querySelector('[data-search-authors]'), authors, 'All Authors');

  // Determine the preferred theme (day or night) and set the initial theme.
  const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const settingsTheme = document.querySelector('[data-settings-theme]');
  settingsTheme.value = prefersDarkTheme ? 'night' : 'day';
  updateTheme(settingsTheme.value);

  // Set the initial "Show more" button text and enable/disable it.
  document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
  document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0;

  // Add event listeners for various user interactions.

  // Event listener for the "Cancel" button in the search overlay.
  document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false;
  });

  // Event listener for the "Cancel" button in the settings overlay.
  document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false;
  });

  // Event listener for the search icon in the header.
  document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
  });

  // Event listener for the settings icon in the header.
  document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true;
  });

  // Event listener for the "Show more" button.
  document.querySelector('[data-list-button]').addEventListener('click', () => {
    // Show more books when the button is clicked.
    const fragment = document.createDocumentFragment();
    const startIndex = page * BOOKS_PER_PAGE;
    const endIndex = (page + 1) * BOOKS_PER_PAGE;
    matches.slice(startIndex, endIndex).forEach((book) => {
      const element = createPreviewButton(book);
      fragment.appendChild(element);
    });
    document.querySelector('[data-list-items]').appendChild(fragment);
    page += 1;
  });
});
