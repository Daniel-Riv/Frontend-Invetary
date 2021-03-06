import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from "../../../../provider/sessionContext";

const Nav = () => {
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();
  function handleSubmit() {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    navigate("/");
  }

  function handleAll() {
    navigate('/Notes')
  }
  function handleAdd() {
    navigate('/CreateNote')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid justify-content-center">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-dark" onClick={handleAll}>
              Productos
            </button>
            <button type="button" className="btn btn-dark" onClick={handleAdd}>
              Agregar Productos
            </button>
            {
              session?.role === "ADMIN" ? <Link  className="btn btn-dark" to={'/unlock-user'}>Usuarios</Link> : null
            }
            <button type="button" className="btn btn-dark" onClick={handleSubmit}>
              Salir
            </button>
          </div>
          <div className="collapse navbar-collapse " >


          </div>
        </div>
      </nav>
    </>
  );
};
export default Nav;
