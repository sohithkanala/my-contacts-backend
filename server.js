const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDb = require('./configs/dbConnection');

//dotenv is the package through which we can get environment configuration.
const dotenv = require("dotenv").config();

//connect the database.
connectDb();

const app = express();

const port = process.env.PORT || 3000;

//this middleware use to get the json data from the client side.
app.use(express.json());

//Get API - API route, two arguments are request and response.
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));


//This is a middleware where we have define all the error handling methods.
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})