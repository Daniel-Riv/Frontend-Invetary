import React, { useState, useContext } from "react";

import Input from '../../../commons/Input/Input';
import '../../../commons/TextArea/TextArea.css';
import TextArea from '../../../commons/TextArea/TextArea'
import { useForm } from "../../../hook/useForm";
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from "../../alert/Alert";


const EditNotes = ({ id, modal }) => {


    const[error,setError] =useState("");
    const [showError,setShowError] = useState(false)
    const navigate = useNavigate();
    const [formValues, handleInputChange] = useForm({
        name:'',
        description:'',
        stock:'',
        amount:''
       });
       const {name,description,stock,amount}= formValues;

    async function handleSubmit(e) {
        e.preventDefault();
        if (name !=="" && description !=="" && stock !== "" && amount !== "") {
            await fetch(`https://apiinventary.herokuapp.com/api/product/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name, description,stock,amount
                })
            })
                .then(res => res.json())
                .then((data) => {
                    const { productId } = data;
                    if (data === false) {
                        console.log(data)
                        setError(data.error)
                        setShowError(true)

                    } else {
                        window.location.reload()
                        navigate('/Notes');
                    }


                })
        }


    };

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
                                    <label className="col-form-label">Nombre:</label>
                                    <input id="name" name="name" type="text" className="form-control"
                                        onChange={handleInputChange} placeholder="Ejm: Rivas" />
                                    
                                </div>
                                <div className="mb-1">
                                    <label className="col-form-label">Precio:</label>
                                    <input id="stock" name="stock" type="text" className="form-control"
                                        onChange={handleInputChange} placeholder="Ejm: Rivas" />
                                </div>
                                <div className="mb-1">
                                    <label className="col-form-label">Cantidad:</label>
                                    <input id="amount" name="amount" type="text" className="form-control"
                                        onChange={handleInputChange} placeholder="Ejm: Rivas" />
                                </div>
                                <div className="mb-1">
                                    <label  className="col-form-label">Description:</label>
                                    <input id="description" name="description" type="text" className="form-control"
                                        onChange={handleInputChange} placeholder="Ejm: Rivas" />

                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => modal(false)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </div>
     {showError?<Alert message={error}/>:null}
     </>
                                                


    )
};

export default EditNotes;