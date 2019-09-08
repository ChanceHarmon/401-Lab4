'use strict';

class Validate {
  sanitize(entry) {
    console.log('got in sanitize', entry);
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

module.exports = Validate;