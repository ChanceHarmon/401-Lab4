'use strict';

const uuid = require('uuid/v4');

class Model {

  constructor() {
    this.database = [];
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve(this.database);
  }

  sanitize(entry) {
    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach(field => {
      if (this.schema[field].required) {
        if (entry[field]) {
          if (typeof entry[field] === this.schema[field].type) {
            record[field] = entry[field];
          } else {
            valid = false;
          }
        } else {
          valid = false;
        }
      }
      else {
        if (typeof entry[field] === this.schema[field].type) {
          record[field] = entry[field];
        }
      }
    });
    return valid ? record : undefined;
  }

}

module.exports = Model;