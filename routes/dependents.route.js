"use strict";
const express = require("express");
const router = express.Router();

const depcontroller = require("../controllers/dependents.controller");

router.get("/all", depcontroller.getAll);
router.get("/id/:id", depcontroller.getAllById);
router.post("/new", depcontroller.createNew);
router.get("/search", depcontroller.searchByName);
router.delete("/delete/:id", depcontroller.deleteById);
router.put("/update/:id", depcontroller.update)

module.exports = router;
