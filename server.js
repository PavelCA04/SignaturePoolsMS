const express = require('express');
//const userRoutes = require('./src/db/users/routes');

const app = express();
const port = 8080;

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

//app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});