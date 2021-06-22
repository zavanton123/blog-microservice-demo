const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// in-memory storage for posts
const posts = {};

app.get('/posts', (req, res) => {
  console.log(`zavanton - get all posts`);
  res.send(posts);
});


app.post('/posts/create', async (req, res) => {
  console.log(`zavanton - create a post`);
  // generate a random id
  const id = randomBytes(4).toString('hex');
  const {title} = req.body;
  posts[id] = {id, title};

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: {
      id, title
    }
  })

  res.status(201).send(posts[id]);
});
app.post('/events', (req, res) => {
  console.log(`zavanton - received event in posts`, req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log(`zavanton - version 60`);
  console.log(`zavanton - listening on 4000`);
});
