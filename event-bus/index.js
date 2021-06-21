const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const event = req.body;
  // send to posts
  await axios.post('http://localhost:4000/events', event);
  // send to comments
  await axios.post('http://localhost:4001/events', event);
  // send to query service
  await axios.post('http://localhost:4002/events', event);
  // send to moderation service
  await axios.post('http://localhost:4003/events', event);
  res.send({status: 'OK'});
});

app.listen(4005, () => {
  console.log(`zavanton - listening on 4005`);
});
