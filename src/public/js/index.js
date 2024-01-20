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
      const id = product._id.toString();
      productContainer.innerHTML = `      
      <h4>${product.code}: ${product.title}</h4>
      <p>ID de producto: ${id}</p>
      <p>${product.description} - $${product.price} - Stock: ${product.stock}</p>
      <button type="button" onclick="deleteProduct('${id}')">Eliminar producto</button>
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

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !thumbnail ||
    !stock ||
    !category
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, complete todos los campos.",
    });
    return;
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

  clear();
}

function clear() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("code").value = "";
  document.getElementById("price").value = "";
  document.getElementById("thumbnail").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("category").value = "";
}

function updateProduct(idProduct) {
  console.log(idProduct);
  Swal.fire({
    title: "¿Desea actualizar este producto?",
    text: "Esta acción no se puede deshacer.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, actualizar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Lógica para actualizar el producto
      // Puedes emitir un evento al servidor o realizar una solicitud HTTP
      // utilizando el ID del producto (productId) para identificar el producto a actualizar.
      // Ejemplo:
      // socket.emit("updateProduct", { productId });
      // o realizar una solicitud HTTP con fetch o axios.

      // Después de actualizar, puedes mostrar un mensaje de éxito.

      Swal.fire({
        title: "Actualizar producto",
        html: `
        <label >ID: ${idProduct}</label><br>
          <label for="updateCode">Código:</label>
          <input type="text" id="updateCode" value="${code}" required><br>
          <label for="updateTitle">Título:</label>
          <input type="text" id="updateTitle" value="${title}" required><br>
          <label for="updateDescription">Descripción:</label>
          <input type="text" id="updateDescription" value="${description}" required><br>
          <label for="updatePrice">Precio:</label>
          <input type="number" id="updatePrice" value="${price}" required><br>
          <label for="updateThumbnail">Thumbnail:</label>
          <input type="text" id="updateThumbnail" value="${thumbnail}" required><br>
          <label for="updateStock">Stock:</label>
          <input type="number" id="updateStock" value="${stock}" required><br>
          <label for="updateCategory">Categoría:</label>
          <input type="text" id="updateCategory" value="${category}" required><br>
        `,
        showCancelButton: true,
        confirmButtonText: "Actualizar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          // Obtener los valores actualizados del formulario
          const updatedCode = document.getElementById("updateCode").value;
          const updatedTitle = document.getElementById("updateTitle").value;
          const updatedDescription =
            document.getElementById("updateDescription").value;
          const updatedPrice = document.getElementById("updatePrice").value;
          const updatedThumbnail =
            document.getElementById("updateThumbnail").value;
          const updatedStock = document.getElementById("updateStock").value;
          const updatedCategory =
            document.getElementById("updateCategory").value;

          // Lógica para realizar la actualización con los valores obtenidos
          // socket.emit("updateProduct", { productId: id, updatedFields });
          // o realizar una solicitud HTTP con fetch o axios.
          // ...
        },
      });
      //Swal.fire('Actualizado', 'El producto ha sido actualizado correctamente.', 'success');
    }
  });
}

function deleteProduct(idProduct) {
  socket.emit("deleteProduct", { idProduct });
}
