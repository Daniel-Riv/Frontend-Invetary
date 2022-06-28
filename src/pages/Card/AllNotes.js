import React, { useState, useEffect,useContext } from "react";
import Card from "./Components/Card";
import { SessionContext } from "../../provider/sessionContext";

const AllNotes = () => {
    const { session, setSession } = useContext(SessionContext);
    const [notes, setNotes] = useState();
    useEffect(() => {
        const getAllnotes = async () => {
            await fetch('https://apiinventary.herokuapp.com/api/product/all')
                .then(response => response.json())
                .then(data => {
                    const { product } = data;
                    setNotes(product);
                });
        }
        getAllnotes()
    }, [])

    
    return (
        <div className="overflow-scroll">
        {
        notes?.map(note=>(
            <Card key={note._id} name={note.name} description={note.description} stock={note.stock} amount={note.amount} id={note._id}/>
        ))
        }
        </div>
    )
}

export default AllNotes;