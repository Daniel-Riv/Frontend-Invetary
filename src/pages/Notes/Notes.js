import React, { useState } from "react";
import Nav from "./components/Nav/Nav";
import AllNotes from "../Card/AllNotes";

const Notes = () => {
  return (
    <div>
      <Nav/>
      <AllNotes/>
    </div>
    

  );
};

export default Notes;
