const express = require('express');
const cors = require('cors');
const config = require('./env');

const routes = require('./backend/routes/index');

const app = express();
const port = config.serverPort;

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});