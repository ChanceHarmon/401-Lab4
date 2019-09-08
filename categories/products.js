'use strict';

const DataModel = require('../memory.js');

class Products extends DataModel {
  constructor() {
    super();
    this.schema = {
      id: { type: 'string' },
      product_id: { required: true, type: 'number' },
      name: { required: true, type: 'string' },
      price: { type: 'number' },
      weight: { type: 'number' },
      quantity_in_stock: { type: 'number' },
    };
  }
}

module.exports = Products;