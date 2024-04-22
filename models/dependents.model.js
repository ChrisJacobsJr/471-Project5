"use strict";
const db = require("../models/db-conn");
const path = require("path");

function getAll() {
  let sql = "SELECT * FROM dependent;";
  const data = db.all(sql);
  return data;
};

function getAllById(id) {
  let sql = "SELECT * FROM dependent WHERE dependent.assoc_emp =? ORDER BY name;";
  const item = db.all(sql, id);
  return item;
};

function createNew(params) {
  let sql =
    'INSERT INTO dependent ("assoc_emp","name","relationship") ' +
    "VALUES(?, ?, ?);";
  const item = db.run(sql, params);
  return item;
};

function search(params) {
  let sql = 'SELECT * FROM menu WHERE name LIKE ?;';
  let menu = db.all(sql, params);
  return menu;
};

function deleteById(id) {
  let sql = 'DELETE FROM dependent WHERE assoc_emp =?';
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
  getAllById,
  createNew,
  search,
  deleteById,
  update,
};
