const express = require("express");
const userRoute = express.Router();
const {
    getUsers,
    postUser,
    putUser,
    deleteUser,
    getOneUser,
    signIn,
} = require("../Controllers/userController");
const isAuth = require("../middleware/isauth")
const isAutho = require('../middleware/isAutho')
userRoute.get("/users", getUsers);
userRoute.get("/users/:id", isAuth, isAutho(['job_poster', 'job_seeker','admin']), getOneUser);
userRoute.post("/users", postUser);
userRoute.put("/users/:id", putUser);
userRoute.delete("/users/:id", isAuth, isAutho(['admin']), deleteUser);
userRoute.post("/signIn", signIn);
module.exports = userRoute;