// script.js

/**
 * The maximum allowed number for the counter.
 * @type {number}
 */
const MAX_NUMBER = 15;

/**
 * The minimum allowed number for the counter.
 * @type {number}
 */
const MIN_NUMBER = -5;

const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const reset = document.querySelector('[data-key="reset"]');
const confirmationMessage = document.getElementById('confirmationMessage');

/**
 * Handles the subtraction button click event.
 */
const subtractHandler = () => {
    const newValue = parseInt(number.value) - 1;
    number.value = newValue;

    if (add.disabled === true) {
        add.disabled = false;
    }

    if (newValue <= MIN_NUMBER) {
        subtract.disabled = true;
    }
};

/**
 * Handles the addition button click event.
 */
const addHandler = () => {
    const newValue = parseInt(number.value) + 1;
    number.value = newValue;

    if (subtract.disabled === true) {
        subtract.disabled = false;
    }

    if (newValue >= MAX_NUMBER) {
        add.disabled = true;
    }
};

/**
 * Handles the reset button click event.
 */
const resetHandler = () => {
    number.value = 0;
    subtract.disabled = true;
    add.disabled = false;
    confirmationMessage.innerText = "Counter has been reset to 0";
    confirmationMessage.style.display = 'block';
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 2000); // Hide the message after 2 seconds
};

subtract.addEventListener('click', subtractHandler);
add.addEventListener('click', addHandler);
reset.addEventListener('click', resetHandler);
