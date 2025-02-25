import path from 'path';
import express from 'express';
// const db = require('./db/dinner.js');
import dinnerController from './controllers/dinnerController.js';
import CORS from 'cors';

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'client')));
// app.use('/client', express.static(path.join(__dirname, '../client')));
// app.use('/', express.static(path.resolve(__dirname, '../')));
app.use(express.json());
app.use(CORS());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './index.html'));
// });

app.get('/', (req, res) => {
  res.status(200).send('Hello from the backend!');
});

app.get('/dinner', dinnerController.getDinners, (req, res) => {
  res.status(200).json(res.locals.dinners);
});

app.post('/dinner', dinnerController.newDinner, (req, res) => {
  res.status(200).json(res.locals.new);
});

app.patch('/dinner', dinnerController.updateDinner, (req, res) => {
  res.status(200).json(res.locals.updates);
});

app.use((req, res) => res.status(404).send('Page not found.'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
