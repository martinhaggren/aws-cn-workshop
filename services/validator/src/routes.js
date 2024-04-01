const crypto    = require('crypto');
const express   = require('express');

// ...

const routes = express.Router();

// ...

routes.post('/resources', (_, res) => {
    console.log('tms-validator: Creating resource.');

    // ...

    const id = crypto.randomUUID();
    
    // ...

    res.status(201).send({
        id
    });
});

// ...

module.exports = routes;