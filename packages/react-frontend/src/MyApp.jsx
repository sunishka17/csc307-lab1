// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

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
    const [characters, setCharacter] = useState([]);

    function fetchUsers(){
      const promise = fetch('http://localhost:8000/users');
      return promise;
    }

    function postUser(person){
      const promise = fetch('http://localhost:8000/users',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
      return promise;
    }

    function deleteUser(personID){
      const promise = fetch(`http://localhost:8000/users/${personID}`, {
        method: "DELETE",
      });
      return promise;
    }

    useEffect(() => {
      fetchUsers()
      .then((res) => res.json())
      .then((json) =>  {
        setCharacter(json["users_list"])})
      .catch((error) => { console.log(error); });
    }, [] );    

    function updateList(person){
      postUser(person)
      .then((res) => res.status == 201 ? res.json() : undefined)
      .then((json) => {
        if (json) setCharacter(json["users_list"])
        })
      .catch((error) => {
        console.log(error);
      })
    }

    function removeOneCharacter(userID){
      deleteUser(userID)
      .then((res) => {
        if (res.status == 204){
          setCharacter(prev => prev.filter(user => user.id !== userID))
        }
    })
      .catch((error) => {
        console.log(error);
      })
  }
    
    return (
      <div className="container">
        <Table 
        characterData={characters}
        removeCharacter = {removeOneCharacter} 
        />
        <Form handleSubmit = {updateList}/>
      </div>
    );
  }
  
export default MyApp;

