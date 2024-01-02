const socket = io();

socket.on('updateProducts', (data) => {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  data.products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.innerHTML = `
      <h4>${product.code}: ${product.title}</h4>
      <p>${product.description} - $${product.price} - Stock: ${product.stock}</p>
    `;
    productList.appendChild(productElement);
  });
});
