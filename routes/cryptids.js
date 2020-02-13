//mounted at /cryptids
const express = require("express");
const router = express.Router();
const fs = require("fs");

//index - get
router.get("/", (req,res) => {
	let allCrypts = fs.readFileSync("./cryptids.json");
	let cryptidsObj = JSON.parse(allCrypts);
	res.render("cryptids/index", {cryptids: cryptidsObj});
});
//new - get
router.get("/new", (req,res) => {
	res.render("cryptids/new");
});

router.post("/", (req,res) => {
	let allCrypts = fs.readFileSync("./cryptids.json");
	allCrypts = JSON.parse(allCrypts);
	console.log(req.body);
	allCrypts.push(req.body);
	fs.writeFileSync("./cryptids.json", JSON.stringify(allCrypts));
	res.redirect("/cryptids");
});

//show - get
router.get("/:id", (req,res) => {
	let allCrypts = fs.readFileSync("./cryptids.json");
	allCrypts = JSON.parse(allCrypts);
	let cryptIdx = parseInt(req.params.id);
	let oneCrypt = allCrypts[cryptIdx];
	oneCrypt.id = cryptIdx;
	res.render("cryptids/show", {cryptid: oneCrypt});
	//res.send(`specifc cryptids at ${req.params.id}`);
});

router.get("/edit/:id", (req,res) => {
	let allCrypts = fs.readFileSync("./cryptids.json");
	allCrypts = JSON.parse(allCrypts);
	let cryptToEdit = allCrypts[parseInt(req.params.id)];
	cryptToEdit.id = parseInt(req.params.id);
	res.render("cryptids/edit", {cryptid: cryptToEdit});
});

router.put("/edit/:id", (req,res) => {
	let allCrypts = fs.readFileSync("./cryptids.json");
	allCrypts = JSON.parse(allCrypts);
	let idx = parseInt(req.params.id);
	allCrypts[idx].name = req.body.name;
	allCrypts[idx].img_url = req.body.img_url;
	fs.writeFileSync("./cryptids.json", JSON.stringify(allCrypts));
	res.redirect("/cryptids");
});





module.exports = router;