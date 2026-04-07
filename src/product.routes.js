const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');
const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
  return response.json(products);
});

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
  const { brand } = request.params; // Access the brand parameter from the URL
  
  // Filter products based on the brand parameter
  const filteredProducts = products.filter(product => product.brand === brand);
  response.json(filteredProducts); // Send the filtered products as a JSON response
});

// додатковий роут: get product by id
router.get('/products/id/:id', (request, response) => {
  const { id } = request.params; // отримуємо id з URL

  // знаходимо продукт із таким id
  const product = products.find(p => p.id === Number(id));

  // якщо продукт не знайдено
  if (!product) {
    return response.status(404).json({ message: "Product not found" });
  }

  // повертаємо товар
  response.json(product);
});

// test route that throws an error
router.get('/productswitherror', (request, response) => {
  let err = new Error("processing error ");
  err.statusCode = 400;
  throw err;
});

module.exports = router;
