const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log('DB connected successfully');
});

// const testTour = new Tour({
//   name: 'The forest Hiker',
//   rating: 4.6,
//   price: 566,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
