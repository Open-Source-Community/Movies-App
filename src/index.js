const express = require('express');
const mongoose = require('mongoose');
const categoryRouter = require('./routes/categoryRoutes');
const favMoviesRouter = require('./routes/favMoviesRoutes');

const app = express();
const port = 3000;
const mongoURI = '';

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(categoryRouter);
app.use(favMoviesRouter);

async function main() {

  try {

    // connect to mongodb
    await mongoose.connect(
      mongoURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      () => {
        console.log("connected to database");
      }
    );

    // 404 handler
    app.use((req, res, next) => {
      res.status(404).json({
        status: 404,
        message: "Page not found!"
      });
    });

    // error handler
    app.use(((err, req, res, next) => {
      if (err.status < 500) {
        res.status(err.status).json({
          status: err.status,
          message: err.message
        });
      }
      else {
        res.status(500).json({
          status: 500,
          message: err.message
        });
      }

    }));


    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });

  } catch (error) {
    console.log(`Error! ${error}`);
  }
}

main();
