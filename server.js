const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const PORT = process.env.PORT || 3000;

const app = require('./app');

console.log(`file: server.js\n dir: ${__dirname}\n`);

console.log('----------------------------');
console.log('-----WELCOME TO EXPRESS-----');
console.log('----------------------------\n');

console.log(app.get('env')); //default express environment
console.log(process.env); // lots of environment variables


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
