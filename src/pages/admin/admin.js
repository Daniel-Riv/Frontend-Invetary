import React, { useEffect, useState, useContext } from "react";
import { SessionContext } from "../../provider/sessionContext";
import Nav from "../Notes/components/Nav/Nav";
import { Alert } from "../alert/Alert";

const AllUser = () => {
    const [alert, setAlert] = useState({
        show:false,
        message:""
    })
    const { session, setSession } = useContext(SessionContext);
    const [product, setProduct] = useState();

    useEffect(() => {
        const getUser = async () => {
            await fetch('https://apiinventary.herokuapp.com/api/admin/unlock-user', {
                headers: {
                    'x-token': session.token
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const { user } = data;
                    setProduct(user);
                })
        }
        getUser();
    }, [product,setProduct])

    return (
        <>
            <Nav />

            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">correo</th>
                        <th scope="col">estado</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product?.map(user => (
                            <tr key={user._id}>
                                <th scope="col">{user.name}</th>
                                <th scope="col">{user.lastName}</th>
                                <th scope="col">{user.email}</th>
                                <th scope="col">{user.state === false ? "Desactivado" : null}</th>
                                <th scope="col"> <button type="button" className="btn btn-dark btn-rounded   " data-mdb-ripple-color="#ffffff" style={{ backgroundColor: '#3d0000' }}
                                    onClick={async () => {
                                        await fetch('https://apiinventary.herokuapp.com/api/admin/userBlock', {
                                            method: "POST",
                                            headers: {
                                                
                                                "x-token": session.token,
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                email: user.email
                                            })
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                setAlert({
                                                    show:true,
                                                    message: data.message
                                                })

                                            })
                                    }}> Activar </button></th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        {
            alert.show? <Alert message={alert.message}/>:null
        }
        </>
    )
}

export default AllUser;