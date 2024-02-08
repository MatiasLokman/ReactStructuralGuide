import React, { useState, useEffect } from 'react';
import { GetProducts, PostProduct, PutProduct, DeleteProduct } from '../../services/ProductService';

import Swal from "sweetalert2";

import { ReactComponent as PostSvg } from '../../assets/svgs/post.svg';
import { ReactComponent as PutSvg } from '../../assets/svgs/put.svg';
import { ReactComponent as DeleteSvg } from '../../assets/svgs/delete.svg';

import './Product.css';

const Product = () => {

  const [products, setProducts] = useState([]);

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [ocultar, setOcultar] = useState("");
  const checkbox = document.getElementById("ocultar");
  const [urlImagen, setUrlImagen] = useState("");

  const [modalTitle, setModalTitle] = useState("");

  //#region Función para cargar las productos
  async function loadProducts() {
    try {
      const productsData = await GetProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  //#endregion

  //#region Función para manejar la eliminación de un producto
  async function handleDeleteProduct(id) {
    try {
      await DeleteProduct(id);

      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado exitosamente!',
        showConfirmButton: false,
        timer: 2000
      })

      await loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire('Error', 'Ocurrió un error al eliminar la producto', 'error');
    }
  };
  //#endregion

  //#region Función para manejar la inserción de un producto
  async function handlePostProduct(event) {
    event.preventDefault();

    const isValid = IsValid();

    if (isValid) {
      try {
        await PostProduct({
          name: nombre.charAt(0).toUpperCase() + nombre.slice(1),
          imageUrl: urlImagen,
          hidden: ocultar
        });

        Swal.fire({
          icon: 'success',
          title: 'Producto registrado exitosamente!',
          showConfirmButton: false,
          timer: 2000
        });
        CloseModal();
        loadProducts();
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al registrar la producto',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f27474',
        });
      }
    }
  }
  //#endregion

  //#region Función para manejar la actualización de un producto
  async function handlePutProduct(event) {
    event.preventDefault();

    const isValid = IsValid();

    if (isValid) {
      try {
        await PutProduct(id, {
          name: nombre.charAt(0).toUpperCase() + nombre.slice(1),
          imageUrl: urlImagen,
          hidden: ocultar
        });

        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado exitosamente!',
          showConfirmButton: false,
          timer: 2000
        });
        CloseModal();
        loadProducts();
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al actualizar la producto',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#f27474',
        });
      }
    }
  }
  //#endregion

  //#region Función para cerrar el modal 
  function CloseModal() {
    const closeButton = document.getElementById("btn-close-modal");
    if (closeButton) {
      closeButton.click();
    }
  }
  //#endregion

  //#region Función para limpiar todos los valores de los inputs del formulario
  function ClearProductInputs() {
    setId("");
    setNombre("");
    setOcultar("");
    setUrlImagen("");
  }
  //#endregion

  //#region Función para obtener los valores almacenados de un producto y cargar cada uno de ellos en su input correspondiente
  function RetrieveProductInputs(product) {
    setId(product.id);
    setNombre(product.name);
    setOcultar(product.hidden);
    setUrlImagen(product.imageUrl);
  }
  //#endregion

  //#region Función para verificar si los valores ingresados a través de los inputs son correctos
  function IsValid() {
    if (nombre === "") {
      Swal.fire({
        icon: 'error',
        title: 'El nombre no puede estar vacío',
        text: 'Complete el campo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }).then(function () {
        setTimeout(function () {
          document.getElementById('nombre').focus();
        }, 500);
      });
      return false;
    } else if (ocultar === "") {
      Swal.fire({
        icon: 'error',
        title: 'Debe indicar si se encuentra oculta',
        text: 'Clickeé el botón en caso de que la misma se encuentre oculta',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      });
      return false;
    } else if (urlImagen === "") {
      Swal.fire({
        icon: 'error',
        title: 'La URL de la imagen no puede estar vacía',
        text: 'Complete el campo',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#f27474',
      }).then(function () {
        setTimeout(function () {
          document.getElementById('urlImagenInput').focus();
        }, 500);
      });
      return false;
    }
    return true;
  }
  //#endregion

  //#region Función para verificar si los valores de los inputs están vacíos
  function IsEmpty() {
    if (nombre !== "") {
      return false
    } else if (ocultar !== false) {
      return false
    } else if (urlImagen !== "") {
      return false
    }
    return true
  }
  //#endregion

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className='global-container'>
      <div className='title-btn-container'>
        <h1>Administrar Productos</h1>

        <button type="button" className="btn btn-success svg-btn" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => { ClearProductInputs(); setModalTitle("Registrar Producto"); setTimeout(function () { document.getElementById('nombre').focus(); }, 500); setOcultar(false) }}>
          <PostSvg className="svg" />
        </button>

      </div>

      <table className="table table-striped table-bordered table-hover table-custom" align="center">
        <thead className="thead-dark">
          <tr className="table-header">
            <th className="table-title" scope="col">#</th>
            <th className="table-title" scope="col">Nombre</th>
            <th className="table-title" scope="col">Oculta</th>
            <th className="table-title" scope="col">Imagen</th>
            <th className="table-title" scope="col">Acciones</th>
          </tr>
        </thead>

        {products.length > 0 ? (
          products.map(function fn(product, index) {
            return (
              <tbody key={1 + product.id}>
                <tr>
                  <th scope="row" className="table-name">{(index + 1)}</th>
                  <td className="table-name">{product.name}</td>
                  {product.hidden ? (
                    <td className="table-name">Si</td>
                  ) : (
                    <td className="table-name">No</td>
                  )}
                  <td className="table-name">
                    <img src={product.imageUrl} className="table-img" onClick={() => Swal.fire({
                      title: product.name,
                      imageUrl: `${product.imageUrl}`,
                      imageWidth: 400,
                      imageHeight: 400,
                      imageAlt: 'Vista Producto',
                      confirmButtonColor: '#6c757d',
                      confirmButtonText: 'Cerrar',
                      focusConfirm: true
                    })} alt="Producto" />
                  </td>

                  <td className="table-name">
                    <button type="button" className="btn btn-warning svg-btn" data-bs-toggle="modal" data-bs-target="#modal" onClick={() => { RetrieveProductInputs(product); setModalTitle("Actualizar Producto") }}>
                      <PutSvg className="svg" />
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger svg-btn"
                      onClick={() => Swal.fire({
                        title: 'Esta seguro de que desea eliminar la siguiente producto: ' + (product.name) + '?',
                        imageUrl: `${product.imageUrl}`,
                        imageWidth: 200,
                        imageHeight: 200,
                        imageAlt: 'Producto a eliminar',
                        text: "Una vez eliminado, no se podrá recuperar",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#F8BB86',
                        cancelButtonColor: '#6c757d',
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                        focusCancel: true
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDeleteProduct(product.id)
                        }
                      })
                      }
                    >
                      <DeleteSvg className="svg" />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : (
          <tbody>
            <tr>
              <td className="table-name" colSpan={5}>Sin registros</td>
            </tr>
          </tbody>

        )}
      </table>


      {/* Modal con el formulario para registrar/actualizar un producto */}
      <div className="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header justify-content-center">
              <h1 className="modal-title" id="exampleModalLabel">{modalTitle}</h1>
            </div>
            <div className="modal-body">
              <div className="container">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="id"
                      hidden
                      value={id}
                      onChange={(event) => {
                        setId(event.target.value);
                      }}
                    />

                    <label className="label">Nombre:</label>
                    <div className="form-group-input">
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="nombre"
                        value={nombre}
                        onChange={(event) => {
                          setNombre(event.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group d-flex flex-column align-items-start gap-1 mb-3">
                    <label className="form-check-label">Oculto:</label>
                    <input
                      type="checkbox"
                      className="form-check-label"
                      id="ocultar"
                      checked={ocultar}
                      onChange={() => {
                        setOcultar(checkbox.checked);
                      }}
                    />
                  </div>

                  <div className="form-group">

                    <label id="urlImagenLabel" className="label">URL Imagen:</label>
                    <div id="urlImagen">
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="urlImagenInput"
                        value={urlImagen}
                        onChange={(event) => {
                          setUrlImagen(event.target.value);
                        }}
                      />
                    </div>


                  </div>
                  <div>
                    {modalTitle === "Registrar Producto" ? (
                      <div id="div-btn-save">
                        <button className="btn btn-success" id="btn-save" onClick={handlePostProduct}>
                          <div>
                            <p className="fw-semibold">Guardar</p>
                          </div>
                        </button>
                      </div>
                    ) : (
                      <div id="div-btn-update">
                        <button className="btn btn-warning" id="btn-update" onClick={handlePutProduct}>
                          <div>

                            <p className="fw-semibold text-white">Actualizar</p>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>

                </form>
              </div>
            </div>
            <div className="modal-footer">

              <button type="button" className="btn btn-secondary"
                onClick={() => {
                  if (modalTitle === 'Registrar Producto') {
                    if (IsEmpty() === true) {
                      ClearProductInputs();
                      CloseModal()
                    } else {
                      Swal.fire({
                        icon: 'warning',
                        title: '¿Está seguro de que desea cerrar el formulario?',
                        text: "Se perderán todos los datos cargados",
                        confirmButtonText: 'Aceptar',
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        confirmButtonColor: '#f8bb86',
                        cancelButtonColor: '#6c757d',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          ClearProductInputs();
                          CloseModal();
                        }
                      })
                    }
                  } else if (modalTitle === 'Actualizar Producto') {
                    Swal.fire({
                      icon: 'warning',
                      title: '¿Está seguro de que desea cerrar el formulario?',
                      text: "Se perderán todos los datos modificados",
                      confirmButtonText: 'Aceptar',
                      showCancelButton: true,
                      cancelButtonText: 'Cancelar',
                      confirmButtonColor: '#f8bb86',
                      cancelButtonColor: '#6c757d',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        ClearProductInputs();
                        CloseModal();
                      }
                    })
                  }
                }}
              >
                <div>
                  <p className="fw-semibold">X Cerrar</p>
                </div>
              </button>

              <button type="button" hidden className="btn-close-modal" id="btn-close-modal" data-bs-dismiss="modal"></button>

            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Product;
