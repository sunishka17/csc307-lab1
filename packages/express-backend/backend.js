import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userModel from './user.js';
const app = express();
const port = 8000;

mongoose.set("debug", true);

mongoose
    .connect("mongodb://localhost:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

function getUsers(name, job) {
    let promise;
    if (name && job) {
        return userModel.find({ name: name, job: job });
    } else if (name === undefined && job === undefined) {
        promise = userModel.find();
    } else if (name && !job) {
        promise = findUserByName(name);
    } else if (job && !name) {
        promise = findUserByJob(job);
    }
    return promise;
}

function findUserById(id) {
    return userModel.findById(id);
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function findUserByName(name) {
    return userModel.find({ name: name });
}

function findUserByJob(job) {
    return userModel.find({ job: job });
}

function findByIdAndDelete(id) {
    return userModel.findByIdAndDelete(id);
}

app.get("/users", (req, res) => {
    const { name, job } = req.query;
    getUsers(name, job)
        .then(users => {
            res.send({ users_list: users });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error");
        });
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    findUserById(id)
        .then(user => {
            if (!user) {
                res.status(404).send("Resource not found.");
            } else {
                res.send(user);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error");
        });
});

// putting a new user
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd)
        .then(user => {
            res.status(201).send({ user });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error");
        });

});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"]; 
    findByIdAndDelete(id)
        .then(user => {
            if (user) {
                res.status(204).send({ message: 'User successfully deleted' });
            } else {
                res.status(404).send({ message: 'Unsuccessful in deletion' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error");
        });
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

export default {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    findByIdAndDelete,
};

