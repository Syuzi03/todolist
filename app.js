const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');

mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true });

const app = express();

app.use(bp.json());

const ItemsRouter = require('./api/items');

app.use('/', ItemsRouter);


app.listen(3000);

