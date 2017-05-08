import {init, countBy} from '.';
import {MongoClient} from 'mongodb';
import mockgo from 'mockgo';

MongoClient.connect = () => {
  return new Promise((resolve, reject) => {
    mockgo.getConnection((error, connection) => {
      if (error) {
        return reject(error);
      }

      return resolve(connection);
    });
  }).then(connection => {
    return connection.collection('items')
      .insertMany([
        {_id: 'id-1-0', type: 'type-1'},
        {_id: 'id-2-0', type: 'type-2'},
        {_id: 'id-2-1', type: 'type-2'},
        {_id: 'id-2-2', type: 'type-2'},
        {_id: 'id-3-1', type: 'type-3'},
        {_id: 'id-3-2', type: 'type-3'}
      ])
      .then(() => {
        return connection;
      });
  });
};

afterAll(mockgo.shutDown);

it('should export init function', () => {
  expect(init).toBeInstanceOf(Function);
});

it('should export countBy function', () => {
  expect(countBy).toBeInstanceOf(Function);
});

it('should get object with counts of field', async () => {
  const url = 'mongodb://localhost:27017';

  await init(url);
  const counts = await countBy('items', 'type');

  expect(counts).toEqual({
    'type-2': 3,
    'type-3': 2,
    'type-1': 1
  });
});
