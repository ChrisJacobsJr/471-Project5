"use strict";
const express = require("express");
const router = express.Router();

const empcontroller = require("../controllers/employee.controller");

router.get("/all", empcontroller.getAll);
router.get("/id/:id", empcontroller.getOneById);
router.post("/new", empcontroller.createNew);
router.get("/search", empcontroller.searchByName);
router.delete("/delete/:id", empcontroller.deleteById);
router.put("/update/:id", empcontroller.update)

module.exports = router;
