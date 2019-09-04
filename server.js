const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

// Iniciando o App
const app = express();
app.use(express.json());
app.use(cors());

// Iniciando o DB
const url = 'mongodb+srv://usuario_admin:111209@clusterapi-n3pu5.mongodb.net/test?retryWrites=true&w=majority';
const options = {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true};
const adm = require('./src/controller/AdmController');
mongoose.connect(url, options);

requireDir('./src/models');



app.use('/api', require("./src/routes"));
app.use('/adm', adm);

app.listen(3001);