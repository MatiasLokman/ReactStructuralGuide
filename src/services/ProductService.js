//#region Función para obtener todos los productos
async function GetProducts() {
  return fetch("http://localhost:3001/products").then(response => response.json());
}
//#endregion

//#region Función para guardar un producto
async function PostProduct(body) {
  return fetch("http://localhost:3001/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
}
//#endregion

//#region Función para actualizar un producto
async function PutProduct(id, body) {
  return fetch(`http://localhost:3001/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
}
//#endregion

//#region Función para eliminar un producto
async function DeleteProduct(id) {
  return fetch(`http://localhost:3001/products/${id}`, {
    method: "DELETE"
  });
}
//#endregion

export {
  GetProducts,
  PostProduct,
  PutProduct,
  DeleteProduct
}