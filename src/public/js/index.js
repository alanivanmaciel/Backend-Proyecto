const socket = io();

socket.on("updateProducts", (data) => {
  const productList = document.getElementById("productList");

  if (productList && Array.isArray(data.products)) {
    productList.innerHTML = "";
    const h1 = document.createElement("h1");
    h1.textContent = "Lista de productos:";
    productList.appendChild(h1);
    data.products.forEach((product) => {
      const productContainer = document.createElement("div");
      productContainer.innerHTML = `      
      <h4>${product.code}: ${product.title}</h4>
      <p>ID de producto: ${product.id}</p>
      <p>${product.description} - $${product.price} - Stock: ${product.stock}</p>
      <button type="button" onclick="deleteProduct('${product.id}')">Eliminar producto</button>
    `;
      productList.appendChild(productContainer);
    });
  } else {
    console.log("Error: La estructura de datos de 'data' no es válida.");
  }
});

function addProduct() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;

  if(!title){
    console.log('vacio');
    return
  }
  socket.emit("addProduct", {
    title,
    description,
    code,
    price,
    thumbnail,
    stock,
    category,
  });
}

function deleteProduct(idProduct) {
  socket.emit("deleteProduct", { idProduct });
}
