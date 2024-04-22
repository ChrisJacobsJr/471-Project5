"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/employee.model");

function getAll(req, res, next) {
  let employees = model.getAll();
  try {

    res.render("employee-all", { employees: employees, title: 'All Employees' });
    // res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting employees ", err.message);
    next(err);
  }
}

function getOneById(req, res, next) {
  let id = req.params.id;
//   Remove the colon at the front of id
id = id.substring(1);
  try {
    let employee = model.getOneById(id);
    res.render("employee-details", { employee: employee, title: 'Employee #' + id });
    //res.json(model.getOneById(req.params.id));
  } catch (err) {
    console.error("Error while getting employee ", err.message);
    next(err);
  }
}


function createNew(req, res, next) {
  let SSN = parseInt(req.body.SSN);
  let Fname = req.body.Fname;
  let Minit = req.body.Minit;
  let Lname = req.body.Lname;
  let DOB = req.body.DOB;
  let address = req.body.address;
  if (SSN && Fname && Lname && DOB) {
    let params = [SSN, DOB, Fname, Minit, Lname, address];
    try {
      model.createNew(params);
     res.redirect('/employees/all');
    } catch (err) {
      console.error("Error while creating employee ", err.message);
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
  getOneById,
  createNew,
  searchByName,
  deleteById,
  update,
};
