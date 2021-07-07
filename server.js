const app = require('./app');

const PORT = process.env.PORT || 3000;

console.log(`file: server.js\n dir: ${__dirname}\n`);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});