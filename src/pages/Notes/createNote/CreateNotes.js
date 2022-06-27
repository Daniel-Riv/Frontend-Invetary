import React, { useState, useContext } from "react";
import "../../../commons/TextArea/TextArea.css";
import Nav from "../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../alert/Alert";
import { useForm } from "../../../hook/useForm";

const CreateNotes = () => {

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate();

  const [formValues, handleInputChange] = useForm({
    name: '',
    description: '',
    stock: '',
    amount: ''
  });
  const { name, description, stock, amount } = formValues;

  async function handleSubmit(e) {
    e.preventDefault();
    if (name !== "" && description !== "" && stock !== "" && amount !== "") {

      await fetch("https://apiinventary.herokuapp.com/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          stock,
          amount
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const { newProduct } = data; //respuesta del back
          if (data.succes === false) {
            console.log(data);
            setError(data.error)
            setShowError(true)
          } else {
            navigate("/Notes")
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <div>
        <Nav />
        <div className="card  text-white " style={{backgroundColor:'#110e0e'}}>
          <div className="card-header ">Agregar Producto</div>
          <div className="card-body">
            <h5 className="card-title">Nombre del Producto</h5>
            <input id="name" name="name" type="text" className="form-control card-text" onChange={handleInputChange} />
            <h5 className="card-title">Descripcion del Producto</h5>
            <input id="description" name="description" type="text" className="form-control card-text" onChange={handleInputChange} />
            <h5 className="card-title">Precio del Producto</h5>
            <input id="stock" name="stock" type="text" className="form-control card-text" onChange={handleInputChange} />
            <h5 className="card-title">Cantidad de produtos en el inventario</h5>
            <input id="amount" name="amount" type="text" className="form-control card-text" onChange={handleInputChange} />
          </div>
          <button type="button" className="btn btn-light" onClick={handleSubmit} >Agregar</button>
        </div>
      </div>
      {showError ? <Alert message={error} /> : null}
    </>
  );
};

export default CreateNotes;
