require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const connectDB = require('./Config/db');
const route = require('./Routes/Route')

const app = express();

connectDB();

app.use(cors())
app.use(bodyParser.json())
app.use('/career', route)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is running on the port http://localhost:${PORT}`);
})