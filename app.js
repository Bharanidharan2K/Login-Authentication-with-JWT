require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require('./api/users/user.router');

app.use(express.json());
app.use(cors({ origin : "*"}));
app.use('/api/users', userRoute);

app.listen(process.env.APP_PORT, () =>{
    console.log(`Server is Running on http://localhost/${process.env.APP_PORT}`)
});