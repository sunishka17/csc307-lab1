import express from "express";
import cors from "cors";

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

app.use(cors());
app.use(express.json());

const findUsersByName = (name) => {
    return users["users_list"].filter(
        (user) => user['name'] === name
    );
};

const findUsersById = (id) => 
    users["users_list"].find(
        (user) => user["id"] === id
);

const findUsersByNameJob = (name, job) => 
    users["users_list"].find(
        (user) => user["name"] === name && user["job"] === job
);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

const deleteUser = (id) => {
    users["users_list"] = users["users_list"].filter(user => user["id"] !== id);
};


// getting by id
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
    const { name, job } = req.query;
    if (name && job) {
        let result = findUsersByNameJob(name, job);
        result = {users_list: result};
        res.send(result);
    } else if (name) {
        let result = findUsersByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

// putting a new user
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userToAdd["id"] = Math.random().toString();
    addUser(userToAdd);
    // res.send();
    res.status(201).send({ users_list: users.users_list });
});

// deleting
app.delete("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = deleteUser(id);
    // res.send(result);
    res.status(204).send({ message: 'User successfully deleted'});
});

app.listen(port, () => {
    console.log(
        'Example app listening at http://localhost:${port}'
    );
});


