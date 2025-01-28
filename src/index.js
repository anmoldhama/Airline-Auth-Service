const express = require('express');
const { PORT } = require('./config/serverConfig');

const apiRoutes = require('./routes/index');
const app = express();
const bodyParser = require('body-parser');

function prepareAndStartServer() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);
    app.listen(PORT, () => {
        console.log('Server started at port: ', PORT);
    })
}

prepareAndStartServer();