const fs = require('fs');

let writeLocation = `${__dirname}/dinner.db.json`;
let data = JSON.parse(fs.readFileSync(writeLocation));

const db = {};

db.sync = (newData) => {
  db.write(newData);
  db.reset();
  return data;
};

db.write = (newData) => {
  fs.writeFileSync(writeLocation, JSON.stringify(newData, null, 2));
};

db.reset = () => {
  data = JSON.parse(fs.readFileSync(writeLocation));
};

export default db;
