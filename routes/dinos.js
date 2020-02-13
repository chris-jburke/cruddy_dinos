//Mounted at "/dinos"

const express = require("express");
const router = express.Router();
const fs = require("fs");

//index - get
router.get("/", (req, res) => {
	//get all dinos, pass to page
	let allDinos = fs.readFileSync("./dinosaurs.json");
	let dinoData = JSON.parse(allDinos);
	res.render("dinos/index", {dinos: dinoData});
});
//new - get
router.get("/new", (req, res) => {
	res.render("dinos/new");
});
//create - post
router.post("/", (req, res) => {
	//add new dino to the dinosaurs.json file
	let dinos = fs.readFileSync("./dinosaurs.json");
	let dinoData = JSON.parse(dinos);
	dinoData.push(req.body);
	let newDinos = JSON.stringify(dinoData);
	fs.writeFileSync("./dinosaurs.json", newDinos);
	res.redirect(`/dinos/${dinoData.length - 1}`);
})

//show - get
router.get("/:id", (req, res) => {
	let dinos = fs.readFileSync("./dinosaurs.json");
	let dinoData = JSON.parse(dinos);
	let dinoIndex = parseInt(req.params.id);
	let oneDino = dinoData[dinoIndex];
	oneDino.id = dinoIndex;
	//TODO get actual dino at id of req.params.id
	res.render("dinos/show", {dino: oneDino});
});
//edit - get
router.get("/edit/:id", (req, res) => {
	//TODO: get dino info and pass it in
	let dinos = fs.readFileSync("./dinosaurs.json");
	let dinoData = JSON.parse(dinos);
	let dinoIndex = parseInt(req.params.id);
	let oneDino = dinoData[dinoIndex];
	oneDino.id = dinoIndex;
	res.render("dinos/edit", {dino: oneDino});
});
//update - put
router.put("/edit/:id", (req,res) => {
	let dinos = fs.readFileSync("./dinosaurs.json");
	let dinoData = JSON.parse(dinos);
	let dinoIndex = parseInt(req.params.id);
	dinoData.splice(dinoIndex, 1, req.body);
	let newDinos = JSON.stringify(dinoData);
	fs.writeFileSync("./dinosaurs.json",newDinos);
	res.redirect(`/dinos/${dinoIndex}`);

});
//destroy - delete
router.delete("/:id", (req,res) => {
	console.log(`deleting dino at ${req.params.id}`);
	let dinos = fs.readFileSync("./dinosaurs.json");
	dinos = JSON.parse(dinos);
	let deadDino = dinos.splice(req.params.id, 1);
	console.log(`Press F to pay respects to ${deadDino[0].name}`);
	fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos));
	res.redirect("/dinos");
});

module.exports = router;
