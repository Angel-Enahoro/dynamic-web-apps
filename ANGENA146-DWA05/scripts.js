const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);
  result.innerText = dividend / divider;

    // Scenario 4: Check for non-numeric inputs
    if (isNaN(dividend) || isNaN(divider)) {
      handleNonNumericInput();
      return;
    }
  
    // Convert inputs to integers
    const intDividend = parseInt(dividend);
    const intDivider = parseInt(divider);
  
    // Scenario 2: Check for missing values
    if (!intDividend || !intDivider) {
      handleMissingValues();
      return;
    }
  
    // Scenario 3: Check for invalid division
    if (intDivider === 0 || intDivider < 0) {
        handleInvalidDivision();
        return;
      }
  
    // Perform the division and remove decimals
    const divisionResult = Math.trunc(intDividend / intDivider);
  
    // Display the result
    result.innerText = divisionResult;
  });
  
  function handleMissingValues() {
    result.innerText = "Division not performed. Both values are required in inputs. Try again";
  }
  
  function handleInvalidDivision() {
    result.innerText = "Division not performed. Invalid number provided. Try again";
    // Scenario 3: Log an error in the console with the call stack
    console.error("Invalid division");
  }
  
  function handleNonNumericInput() {
    document.body.innerHTML = '<h1>Something critical went wrong. Please reload the page</h1>';
    // Scenario 4: Log an error in the console with the call stack
    console.error("Non-numeric input");
  };

