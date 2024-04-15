"use strict";
const express = require("express");
const router = express.Router();

const menucontroller = require("../controllers/menu.controller");

router.get("/all", menucontroller.getAll);
router.get("/category/:category", menucontroller.getAllByCategory);
router.get("/item/:id", menucontroller.getOneById);
router.post("/new", menucontroller.createNew);
router.get("/search", menucontroller.searchByName);
router.delete("/delete/:id", menucontroller.deleteById);
router.put("/update/:id", menucontroller.update)

module.exports = router;
