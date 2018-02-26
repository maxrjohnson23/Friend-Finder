const apiRoutes = require("express").Router();
const friendList = require("../data/friends");

apiRoutes.get("/friends", (req, res) => {
    res.send(friendList);
});

apiRoutes.post("/friends", (req, res) => {

});

module.exports = apiRoutes;