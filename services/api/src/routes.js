const express = require('express');

// ...

const routes = express.Router();

// ...
// TMS API.
routes.post('/content', (req, res) => {
    res.send('OK!');
});

// ...

module.exports = routes;