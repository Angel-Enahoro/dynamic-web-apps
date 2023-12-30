const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

// Exercise 1
console.log("Exercise 1:");
names.forEach(name => console.log(name));

// Exercise 2
console.log("\nExercise 2:");
names.forEach((name, index) => console.log(`${name} (${provinces[index]})`));

// Exercise 3
console.log("\nExercise 3:");
const upperCaseProvinces = provinces.map(province => province.toUpperCase());
console.log(upperCaseProvinces);

// Exercise 4
console.log("\nExercise 4:");
const nameLengths = names.map(name => name.length);
console.log(nameLengths);

// Exercise 5
console.log("\nExercise 5:");
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// Exercise 6
console.log("\nExercise 6:");
const filteredProvinces = provinces.filter(province => !province.includes("Cape"));
console.log(filteredProvinces.length);

// Exercise 7 
console.log("\nExercise 7:");
const containsS = names.map(name => Array.from(name).some(char => char === 'S'));
console.log(containsS);


// Exercise 8 
console.log("\nExercise 8:");
const provinceObject = names.reduce((acc, name, index) => {
  acc[name] = provinces[index];
  return acc;
}, {});
console.log(provinceObject);


// Additional Exercises

const products = [
  { product: 'banana', price: "2" },
  { product: 'mango', price: 6 },
  { product: 'potato', price: ' ' },
  { product: 'avocado', price: "8" },
  { product: 'coffee', price: 10 },
  { product: 'tea', price: '' },
];
// Exercises 9-13
console.log(
    // Exercise 9
    '\nExercise 9:',
    (() => {
        const productNames = [];
        products.forEach(product => {
          productNames.push(product.product);
        });
        return productNames;
      })().join(', '),
    
    // Exercise 10
    '\nExercise 10:',
    products.filter(product => product.product.length <= 5),
  
    // Exercise 11
    '\nExercise 11:',
    products
      .filter(product => product.price !== '')
      .map(product => ({ ...product, price: Number(product.price) }))
      .reduce((total, product) => total + product.price, 0),
  
    // Exercise 12
    '\nExercise 12:',
    products.reduce((concatenatedNames, product) => `${concatenatedNames}${product.product}, `, '').slice(0, -2),
  
    //Exercise 13
  
    '\nExercise 13:',
    products.reduce(
      (result, product) => {
        if (product.price !== '' && !isNaN(product.price)) {
          const productPrice = Number(product.price);
  
          if (!result.highest || productPrice > result.highest.price) {
            result.highest = { name: product.product };
          }
  
          if (!result.lowest || productPrice < result.lowest.price) {
            result.lowest = { name: product.product };
          }
        }
        return result;
      },
      { highest: null, lowest: null }
    ),
  
    
// Exercise 14 

    '\nExercise 14:',
    products.map(product =>
      Object.fromEntries(
        Object.entries(product).map(([key, value]) => [
          key === 'product' ? 'name' : (key === 'price' ? 'cost' : key),
          value
        ])
      )
    )
    );




    