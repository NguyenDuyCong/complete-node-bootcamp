const express = require("express");
const fs = require("fs");

const app = express();

// middleware
app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).send('Hello from sever side');
// });

const PATHFILE = `${__dirname}/dev-data/data/tours-simple.json`;

const tours = JSON.parse(fs.readFileSync(PATHFILE));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

const getTour = (req, res) => {
  let id = req.params.id * 1;
  // console.log(typeof id);
  let tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      error: "invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: tour
    }
  });
};

const createTour = (req, res) => {
  let newId = tours[tours.length - 1].id + 1;
  let newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  console.log(tours);
  // save to file
  fs.writeFile(PATHFILE, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    });
  });
  // res.send("Done");
};

const updateTour = (req, res) => {
  let id = req.params.id * 1;
  let tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      error: "invalid ID"
    });
  }

  let tourUpdated = Object.assign(tour, req.body);
  res.status(200).json({
    status: "success",
    data: {
      tour: tourUpdated
    }
  });
};

const deletetour = (req, res) => {
  let id = req.params.id * 1;
  let tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      error: "invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: null
  });
};

// get full list tours
// app.get("/api/v1/tours", getAllTours);

// create new tour
// app.post("/api/v1/tours", createTour);

// get a tour
// app.get("/api/v1/tours/:id", getTour);

// update
// app.patch("/api/v1/tours/:id", updateTour);

// delete
// app.delete("/api/v1/tours/:id", deletetour);

// use app.route() to create chainable route handlers for a route path
app.route("/api/v1/tours").get(getAllTours).post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deletetour);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
