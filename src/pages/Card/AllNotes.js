import React, { useState, useEffect } from "react";
import Card from "./Components/Card";


const AllNotes = () => {
    const [notes, setNotes] = useState();
    useEffect(() => {
        const getAllnotes = async () => {
            await fetch('https://apiinventary.herokuapp.com/api/product/all')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
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