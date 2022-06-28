import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditNotes from "../../Notes/editNote/EditNotes";
import './Card.css'



const Card = ({ id, name, description, stock, amount }) => {
    //const { session, setSession } = useContext(SessionContext);
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const handleDelete = async () => {
        await fetch(`https://apiinventary.herokuapp.com/api/product/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.location.reload();
            })
    }

    return (
        <>

            <div className="container">
                <div className="grid">
                    <section className="mx-auto my-5" style={{ maxWidth: 23 + 'rem' }}>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-header">{name}</div>
                                <table >
                                    <tbody>
                                        <tr>
                                            <td className="font-weight-normal align-middle" style={{ height: 75 + 'px' }}>Descripcion</td>
                                            <td className="float-end font-weight-normal">
                                                <br />
                                                <p className="card-header  mb-1" style={{ padding: 1 + 'px', width: 250 + 'px' }}>{description}</p>
                                            </td>
                                            <td className="float-end me-3">
                                                <i className="fas fa-sun fa-lg text-warning"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-weight-normal align-middle">Precio</td>
                                            <td className="float-end font-weight-normal">
                                                <p className="card-header mb-1" style={{ padding: 1 + 'px', width: 250 + 'px' }}>{stock}</p>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td className="font-weight-normal align-middle">Cantidad</td>
                                            <td className="float-end font-weight-normal">
                                                <p className="card-header mb-1" style={{ padding: 1 + 'px', width: 250 + 'px' }}>{amount}</p>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                                <hr />
                                <div className="container">
                                    <button type="button" className="btn btn-dark btn-rounded   " data-mdb-ripple-color="#ffffff" style={{ backgroundColor: '#3d0000' }} onClick={() => setModal(!modal)}> Actualizar </button>
                                    <button type="button" className="btn btn-dark btn-rounded   " data-mdb-ripple-color="#ffffff" style={{ backgroundColor: '#3d0000', marginLeft: 10 + 'px' }} onClick={handleDelete}> Eliminar </button>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </div>

            {modal ? <EditNotes id={id} modal={setModal} /> : null}
        </>
    )
}

export default Card;