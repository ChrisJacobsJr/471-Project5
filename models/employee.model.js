"use strict";
const db = require("../models/db-conn");
const path = require("path");

function getAll() {
  let sql = "SELECT * FROM employee;";
  const data = db.all(sql);
  return data;
};

function getOneById(id) {
  let sql = "SELECT * FROM employee WHERE employee.SSN =? ;";
  const item = db.get(sql, id);
  return item;
};

function createNew(params) {
  let sql =
    'INSERT INTO employee ("SSN","DOB","Fname","Minit","Lname","address") ' +
    "VALUES(?, ?, ?, ?, ?, ?);";
  const item = db.run(sql, params);
  return item;
};

function search(params) {
  let sql = 'SELECT * FROM menu WHERE name LIKE ?;';
  let menu = db.all(sql, params);
  return menu;
};

function deleteById(id) {
  let sql = 'DELETE FROM employee WHERE SSN =?';
  const response = db.run(sql, id);
  return response;
};


function update(params) {
  let sql = 'UPDATE employee SET DOB =?, Fname =?, Minit =?, Lname =?, address =? WHERE SSN =?;';
  const response = db.run(sql, params);
  return response;
};



module.exports = {
  getAll,
  getOneById,
  createNew,
  search,
  deleteById,
  update,
};
