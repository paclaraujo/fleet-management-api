const createError = require('http-errors');
const express = require("express");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const app = express();
const port = process.env.PORT || 3000;
const swaggerDocument = require('./swagger.json'); 

const taxisRouter = require('./routes/taxis');
const swagger = swaggerjsdoc({definition: swaggerDocument, apis: ["./routes/*.js"],});
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/', taxisRouter);
app.use('/docs', swaggerui.serve, swaggerui.setup(swagger, { customCssUrl: CSS_URL }));

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
