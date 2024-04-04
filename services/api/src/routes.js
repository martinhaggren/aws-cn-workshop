const express = require('express');
const axios = require('axios');

const {
  SNSClient,
  PublishCommand
} = require('@aws-sdk/client-sns');

const env = require('./env');

const sns = new SNSClient({
  region: 'eu-north-1'
});


const routes = express.Router();

// ...
// TMS API.
routes.post('/content', async (req, res) => {

  axios.post('http://validator/resources')
      .then(async function (response) {
          console.log("Successfully received response from validator service");
          
          await sns.send(new PublishCommand({
            Message: JSON.stringify(response.data),
            TopicArn: env.requestsTopic
        }));

          res.send(response.data);
      })
      .catch(function (error) {
          console.error("Error communicating with validator service:", error.message);
          res.status(500).send('Failed to communicate with the validator service');
      });
});


routes.post('/injectfault', async (_, res) => {
  const response = await axios({
      method: 'POST',
      url: 'http://validator/503'
  });

  res.send(response.data);
});

module.exports = routes;  