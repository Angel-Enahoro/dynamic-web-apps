/**
 * BookPreview Web Component.
 */
export class BookPreview extends HTMLElement {
    constructor() {
        super();

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Define the HTML template for the component
        this.shadowRoot.innerHTML = `
            <style>
                /* Add your component styling here */
                .preview {
                    /* Your styling for the preview class */
                }

                .preview__image {
                    /* Your styling for the preview image */
                    max-width: 100%; /* Example: Make the image responsive */
                    height: auto;
                }

                .preview__title {
                    /* Your styling for the preview title */
                    font-size: 1.2em; /* Example: Set the font size */
                    font-weight: bold;
                }

                .preview__author {
                    /* Your styling for the preview author */
                    color: #555; /* Example: Set text color */
                }
            </style>
            <div class="preview">
                <img class="preview__image" alt="">
                <div class="preview__title"></div>
                <div class="preview__author"></div>
            </div>
        `;
    }

    /**
     * Invoked when the custom element is first connected to the document's DOM.
     */
    connectedCallback() {
        // Retrieve attributes
        const author = this.getAttribute('author');
        const id = this.getAttribute('id');
        const image = this.getAttribute('image');
        const title = this.getAttribute('title');

        // Set content
        this.shadowRoot.querySelector('.preview__image').src = image;
        this.shadowRoot.querySelector('.preview__image').alt = title;
        this.shadowRoot.querySelector('.preview__title').textContent = title;
        this.shadowRoot.querySelector('.preview__author').textContent = ` ${author}`;

        // Note: I replaced authors[author] with the direct use of author
    }
}

// Define the custom element
customElements.define('book-preview', BookPreview);
