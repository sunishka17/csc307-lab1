import express from "express";

const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

app.use(express.json());

const findUsersByName = (name) => {
    return users["users_list"].filter(
        (user) => user['name'] === name
    );
};

const findUsersById = (id) => 
    users["users_list"].find(
        (user) => user['id'] === id
);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
}

// const deleteUser = (user) => {
//     users["users_list"].filter
// }

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUsersById(id);
    if (result === undefined){
        res.status(404).send("Resource not found.");
    } else{
        res.send(result);
    }
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUsersByName(name);
        result = {users_list: result};
        res.send(result);
    } else{
        res.send(users);
    }
});

app.post("/users", (req, res) => {
    console.log("called");
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

// app.deleteUser("/users", (req, res) => {
//     const userToDelete = req.body;
//     delete(userToDelete);
//     res.send;
// });

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
