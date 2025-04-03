// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";

// const characters = [
//     {
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ];
  
  function MyApp() {
    const [characters, setCharacter] = useState([
        {
            name: "Charlie",
            job: "Janitor"
        },
        {
          name: "Mac",
          job: "Bouncer"
        },
        {
          name: "Dee",
          job: "Aspring actress"
        },
        {
          name: "Dennis",
          job: "Bartender"
        }
    ]);
    function removeOneCharacter(index){
        const updated = characters.filter((character, i) => {
            return i != index;
        });
        setCharacter(updated);
    }
    return (
      <div className="container">
        <Table 
        characterData={characters}
        removeCharacter = {removeOneCharacter} 
        />
      </div>
    );
  }
  
export default MyApp;
