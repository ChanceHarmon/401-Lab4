const Categories = require('../categories/categories.js');

describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  })

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = categories.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(categories.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record.id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can update() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.update(record.id, { id: record.id, name: 'Tom' });
      })

      .then(newRecord => {
        expect(newRecord['name']).toEqual('Tom');
      })

  });

  it('can delete() a category', () => {
    //create a new object in the database
    let obj = { name: 'Test Category' };
    return categories.create(obj)

      //delete the object in the database, also get the database to check if the obj is really deleted
      .then(record => {
        console.log(record);
        return categories.delete(record.id);
      })

      .then(newDatabase => {
        expect(newDatabase).toEqual([]);
      })

  });

});