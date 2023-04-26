const fs = require('fs');
const Tour = require('./../models/tourModel');
// const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name or Price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  // console.log(req.requestTime);
  res.status(200).json({
    status: 'Success',
    // requestedAt: req.requestTime,
    // result: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // if (!tour) {
  //   res.status(404).json({
  //     status: 'Failed',
  //     message: 'Invalid',
  //   });
  // }
  // res.status(200).json({
  //   status: 'Success',
  //   result: tours.length,
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = (req, res) => {
  //
};

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
