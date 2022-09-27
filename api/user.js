const express = require("express");
const usersRouter = express.Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const authorizeUser = require("./auth");
module.exports = usersRouter;

usersRouter.get("/", async (req, res, next) => {
    try {
        const users = await User.getAllUsers();
        res.send({ users });
    } catch (error) {
        next(error);
    }
});

//get admin access
usersRouter.get("/me", authorizeUser, async (req, res, next) => {
    try {
        const user = await User.getUserById(req.user.id);
        res.send({ user });
    } catch (err) {
        next(err);
    }
});

//register *create user*
usersRouter.post("/register", async (req, res, next) => {
    try {
        const { username, password } =
            req.body;
        console.log(
            "Username:",
            username
        );
        if (password.length < 8) {
            throw new Error("Password length must be 8 characters");
        }
        const user = await User.createUser({
            username,
            password,
        });

        console.log("created user!", user);

        res.status(201).send({ user });
    } catch (error) {
        next(error);
    }
});

//login *auth user*
usersRouter.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.getUser({ username, password });

        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET
        );

        console.log({ "logged in user successfully": user });

        res.send({ "logged in user successfully": user, token });
    } catch (error) {
        next(error);
    }
});

// get user by id
usersRouter.get("/:id", async (req, res, next) => {
    try {
        const user = await User.getUserById(req.params.id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

//update user by id
usersRouter.patch("/:id", async (req, res, next) => {
    try {
        const { username, password, firstName, lastName, email, phoneNumber } =
            req.body;

        const users = await User.updateUser({
            id: req.params.id,
            username,
            password,
            firstName,
            lastName,
            email,
            phoneNumber,
        });

        res.send(users);
    } catch (error) {
        next(error);
    }
});



//delete a current user by id
usersRouter.delete("/:id", async (req, res, next) => {
    try {
        const user = await User.deleteUser(req.params.id);
        res.send(user);
    } catch (error) {
        next(error);
    }
});