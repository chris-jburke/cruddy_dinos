//Mounted at "/dinos"

const express = require("express");
const router = express.Router();
const fs = require("fs");

//index - get
router.get("/", (req, res) => {
	//TODO get all dinos, pass to page
	let allDinos = fs.readFileSync("./dinosaurs.json");
	console.log(allDinos);
	res.render("dinos/index", {dinos: [] });
});
//new - get
router.get("/new", (req, res) => {
	res.render("dinos/new");
});
//create - post

//show - get
router.get("/:id", (req, res) => {
	//TODO get actual dino at id of req.params.id
	res.render("dinos/show", {dino: {id: req.params.id} });
});
//edit - get
router.get("/edit/:id", (req, res) => {
	//TODO: get dino info and pass it in
	res.render("dinos/edit", {dino: {id: req.params.id} });
});
//update - put

//destroy - delete

module.exports = router;
