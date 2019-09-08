const Products = require('../categories/products');

describe('Products Model', () => {

  let products;

  beforeEach(() => {
    products = new Products();
  })

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = products.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(products.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new product', () => {
    let obj = { name: 'Test product', product_id: 1, price: 20 };
    console.log('got in create', products.create(obj));
    return products.create(obj)

      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })

      .catch(e => console.error('ERR', e));
  });

  it('can get() a product', () => {
    let obj = { name: 'Test Product', product_id: 2, price: 30 };
    return products.create(obj)
      .then(record => {
        return products.get(record.id)
          .then(product => {
            Object.keys(obj).forEach(key => {
              expect(product[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can update() a product', () => {
    let obj = { name: 'Test Product', product_id: 3, price: 40 };
    return products.create(obj)

      .then(record => {
        // console.log('update and its record',record);
        return products.update(record.id, { name: 'apple', product_id: 3, price: 40 });
      })

      .then(newRecord => {
        expect(newRecord['name']).toEqual('apple');
      })

  });

  it('can delete() a product', () => {
    //create a new object in the database
    let obj = { name: 'Test Product', product_id: 4, price: 50 };
    return products.create(obj)

      //delete the object in the database, also get the database to check if the obj is really deleted
      .then(record => {
        // console.log(record);
        return products.delete(record.id);
      })

      .then(newDatabase => {
        expect(newDatabase).toEqual([]);
      })

  });
});