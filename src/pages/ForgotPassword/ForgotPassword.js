import React, { useState, useContext } from "react";
import { useForm } from "../../hook/useForm";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../provider/sessionContext";
import { Alert } from "../alert/Alert";

const ForgotPassword = () => {



  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate();

  const [formValues, handleInputChange] = useForm({
    email:''
   });
   const {email}= formValues;


  async function handleSubmit(e) {
    e.preventDefault();
    if (email !=="") {
      await fetch("https://apiinventary.herokuapp.com/api/user/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const { message } = data; //respuesta del back
          if (data.success === false) {
            console.log(data);
            setError(data.error)
            setShowError(true)
          } else {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
     <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Actualizar</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                        <div className="row">
                            <form>
                                <div className="mb-1">
                                    <label  className="col-form-label">Ingrese el correo</label>
                                    <input id="email" name="email" type="email" className="form-control"
                                        onChange={handleInputChange} placeholder="Ejm: daniel@gmail.com" />

                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
                </div>
            </div>
        </div>
    {/*   <div>
        <form className="loginBox">
          <Title text=" Forgot Password" />
          <br></br>
          <Input
            atribute={{
              id: "email",
              name: "email",
              type: "text",
              placeholder: "email",
            }}
            handleChange={handleChange}
          />
          <br></br>
          <button onClick={handleSubmit}>Forgot</button>

          <br></br>
        </form>
      </div> */}
      {showError ? <Alert message={error} /> : null}
    </>
  );
};

export default ForgotPassword; 