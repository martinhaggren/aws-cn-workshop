const express   = require('express');
const env       = require('./env');
const routes    = require('./routes');

// ...

const app = express();
app.use(express.json());
app.use('/', routes);

// ...

app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}`)
});