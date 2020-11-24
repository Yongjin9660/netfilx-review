//const Content = require('../../models/movie');
const Movie = require('../../models/movie');

const express = require('express');
const router = express.Router();

// router.get('/api', (req, res) => {
//     console.log('http://localhost:3001/api/');
//     res.send({title: 'hello react!'});
// });
router.get('/api', async (req, res, next) => {
    console.log('http://localhost:3001/api/');
    const movies = await Movie.find({});
    console.log(movies);
    res.json(movies);
});

module.exports = router;