"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/dependents.model");

function getAll(req, res, next) {
  let dependents = model.getAll();
  try {

    res.render("dependent-all", { dependents: dependents, title: 'All Dependents' });
    // res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting dependents ", err.message);
    next(err);
  }
}

function getAllById(req, res, next) {
  let id = req.params.id;
//   Remove the colon at the front of id
id = id.substring(1);
  try {
    let dependents = model.getAllById(id);
    res.render("dependent-details", { dependents: dependents, title: 'Dependents of #' + id, emp_id: id });
    //res.json(model.getAllById(req.params.id));
  } catch (err) {
    console.error("Error while getting dependents ", err.message);
    next(err);
  }
}


function createNew(req, res, next) {
  let assoc_emp = parseInt(req.body.assoc_emp);
  let name = req.body.name;
  let relationship = req.body.relationship;
  if (assoc_emp && name && relationship) {
    let params = [assoc_emp, name, relationship];
    try {
      model.createNew(params);
     res.redirect('/dependents/all');
    } catch (err) {
      console.error("Error while creating dependent ", err.message);
      next(err);
    }
  }
}

function update(req, res, next) {
  let SSN = parseInt(req.body.SSN);
  let Fname = req.body.Fname;
  let Minit = req.body.Minit;
  let Lname = req.body.Lname;
  let DOB = req.body.DOB;
  let address = req.body.address;
  if (SSN && Fname && Lname && DOB) {
    let params = [DOB, Fname, Minit, Lname, address, SSN];
    try {
      model.update(params);
      res.redirect('/employees/all');
    } catch (err) {
      console.error("Error while editing employee ", err.message);
      next(err);
    }
  }
}


function searchByName(req, res, next) {
  let term = req.query.term;
  let meals = [];
  if (term) {
    let searchTerm = '%' + term + '%';
    meals = model.search(searchTerm);
  }
  else {
    meals = model.getAll();
  }
  try {
    res.render("menu-all", { meals: meals, title: '' + term + ' Meals' });
  } catch (err) {
    console.error("Error while getting menu ", err.message);
    next(err);
  }
}

function deleteById(req, res, next) {
  let id = req.params.id;
  try {
    model.deleteById(id);
  } catch (err) {
    console.error("Error while getting employee ", err.message);
    next(err);
  }
}

module.exports = {
  getAll,
  getAllById,
  createNew,
  searchByName,
  deleteById,
  update,
};
