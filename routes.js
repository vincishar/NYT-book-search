const express = require('express');
const Book = require('./bookModel');
const app = express.Router();

app.post('/books', (req, res) => {
    Book.create(req.body).then(book => res.send(book))
        .catch(error => res.send(error));
});

app.get('/books', (req, res) => {
    Book.find().then(books => res.send(books))
        .catch(error => res.send(error));
});

app.delete('/books/:id', (req, res) => {
    Book.deleteOne({ _id: req.params.id }).then(book => res.send(book))
        .catch(error => res.send(error));
});

module.exports = app;

