const htmlRoutes = require("express").Router();
const path = require("path");

htmlRoutes.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

htmlRoutes.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});


module.exports = htmlRoutes;