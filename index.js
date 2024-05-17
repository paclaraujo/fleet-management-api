const createError = require('http-errors');
const express = require("express");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const app = express();
const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Arif Books Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple Book API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "skills with arif",
        url: "arif.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};


const taxisRouter = require('./routes/taxis');
const swagger = swaggerjsdoc(options);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/', taxisRouter);
app.use('/docs', swaggerui.serve, swaggerui.setup(swagger));

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
