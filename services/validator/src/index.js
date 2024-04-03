const express = require('express');
const env = require('./env');
const createFaultMiddleware = require('./middleware');
const routes = require('./routes');

const app = express();
const injectFault = { flag: false }; // Object to maintain the injectFault state

const fault = createFaultMiddleware(injectFault); // Create the middleware

app.use(express.json());
app.use(fault);
app.use('/', routes);

app.get('/healthz', (req, res) => {
    if (injectFault.flag) {
        return res.status(503).send('Unhealthy due to fault injection');
    }
    res.status(200).send('OK');
});


const server = app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}`)
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received, validator service shut down');

    server.close(() => {
        console.log('Validator service shut down gracefully');

        // other connections and resources to clean up...

        process.exit(0);
    });
   
});
