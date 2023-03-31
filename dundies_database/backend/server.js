const express = require('express');
const router = require('./Routes/routes.js');
const cors = require('cors');
require('dotenv').config() 
const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

