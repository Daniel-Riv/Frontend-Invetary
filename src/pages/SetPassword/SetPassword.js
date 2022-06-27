import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hook/useForm";
import { SessionContext } from "../../provider/sessionContext";
import { Alert } from "../alert/Alert";

const SetPassword = () => {

  const { session, setSession } = useContext(SessionContext);
  const[error,setError] =useState("");
  const [showError,setShowError] = useState(false)
  const navigate = useNavigate();
  const [formValues, handleInputChange] = useForm({
   newPassword:''
  });
  const {newPassword}= formValues;
  async function handleSubmit(e) {
    e.preventDefault();
    if (newPassword !=="") {
      //console.log(account);
      await fetch(
        `https://apiinventary.herokuapp.com/api/user/firsLogin/${session.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const { newPassword } = data; //respuesta del back
          if (data.success === false) {
            setError(data.error.errors[0].msg)
            setShowError(true)
          } else {
            navigate("/Notes");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
    <div className="card text-center">
  <div className="card-header">Ingresa los datos</div>
  <div className="card-body">
    <h5 className="card-title">Nueva contraseña</h5>
    <input id="newPassword" name="newPassword" type="password" className="form-control" onChange={handleInputChange} />
    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={handleSubmit}>
                            Confirmar</button>
  </div>
  <div className="card-footer text-muted">Recuerda que debe ser alfanumerica</div>
</div>
    {showError?<Alert message={error}/>:null}
    </>
  );
};

export default SetPassword;
