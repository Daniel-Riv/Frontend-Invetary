import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../alert/Alert";
import '../SingUp/signUp.css'
import { useForm } from "../../hook/useForm";

const SingUp = () => {

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const [formValues, handleInputChange] = useForm({
    name: '',
    lastName: '',
    email: ''
  });
  const { name, lastName, email } = formValues;

  function handleAdd() {
    navigate('/')
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formValues)
    if (name !== "" && lastName !== "" && email !== "") {
      await fetch("https://apiinventary.herokuapp.com/api/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastName,
          email,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const { user } = data; //respuesta del back
          if (data.success === false) {
            setError(data.error)
            setShowError(true)
          } else {
            
            localStorage.setItem("token", data.token); //guardar token en localStorage
            localStorage.setItem("token-init-date", new Date().getTime()); //guarda hora actual
            //window.location.reload(); //recargar la pagina
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">

                      <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: 185 + 'px' }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Registrarse</h4>
                      </div>

                      <form>
                        <p>Ingrese los datos requeridos</p>

                        <div className="form-outline mb-4">
                          <label className="form-label" >Nombre</label>
                          <input id="name" name="name" type="text" className="form-control"
                            placeholder="Ejm: Daniel" onChange={handleInputChange} />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" >Apellido</label>
                          <input id="lastName" name="lastName" type="text" className="form-control"
                            onChange={handleInputChange} placeholder="Ejm: Rivas" />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" >Correo Electronico</label>
                          <input id="email" name="email" type="email" className="form-control"
                            placeholder="Ejm: daniel@gmail.com" onChange={handleInputChange} />

                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={handleSubmit}>
                            Register</button>
                          <br />

                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">ya estas registrado?</p>
                          <button type="button" className="btn btn-outline-danger" onClick={handleAdd}>Log In</button>
                        </div>

                      </form>

                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Invetario de Productos</h4>
                      <p className="small mb-0">Mejora tu rendimiento
                        y tiempo de proceso, Organiza mejor tu almacén con el eficiente sistema de inventario de doble entrada..</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showError ? <Alert message={error} /> : null}
    </>
  );
};

export default SingUp;
