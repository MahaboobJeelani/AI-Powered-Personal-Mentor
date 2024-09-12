require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const swaggerSpec = require('./docs/Swagger')
const swaggerUi = require('swagger-ui-express')


const connectDB = require('./Config/db');
const route = require('./Routes/Route')

const app = express();

connectDB();

app.use(cors())
app.use(bodyParser.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/career', route)

// =============== Port ==================
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is running on the port http://localhost:${PORT}`);
})