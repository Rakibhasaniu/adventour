const fs = require('fs');
const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});
//TODO: IF I NEED TIME WHEN THE REQ HANDLER....
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

const getAllTours = (req, res) => {
  // console.log(req.requestTime);
  res.status(200).json({
    status: 'Success',
    // requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid',
    });
  }
  res.status(200).json({
    status: 'Success',
    result: tours.length,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(204).json({
      status: 'fail',
      message: 'invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
};

//TODO: USERS ROUTES HANDLER

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This routes is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This routes is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This routes is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This routes is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This routes is not yet defined',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
