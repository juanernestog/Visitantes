require('dotenv').config(`dotenv`);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.urlencoded());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1',
    {
      useNewUrlParser: true,
    },
  );
}

const visitorSchema = new mongoose.Schema({
  name: String,
  date: Date,
});

const Visitor = mongoose.model('Visitor', visitorSchema);

app.get('/', function (req, res) {
  const nowDate = new Date();
  const visitor_n = new Visitor({
    name: req.query.name || 'Anónimo',
    date: nowDate,
  });
  console.log(`GET Request Received ${req.query.name} Added`);
  res.send(`<h1>El visitante fue almacenado con éxito</h1>`);
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening on port ${process.env.PORT || 3000}!`),
);
