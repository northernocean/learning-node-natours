const app = require('express')();

const PORT = process.env.PORT || 3000;

// Sending a Text Response
app.get('/text', (req, res) => {
  res
    .status(200)
    .send('Hello\n');
});

// Sending a Json Response
app.get('/json', (req, res) => {
  res
    .status(200)
    .json({message: 'Hello'});
});

app.post("/post", (req, res) => {
  res
    .send('Testing a post method!\n');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

