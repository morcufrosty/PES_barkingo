const express = require('express');
const app = express();

const greeting = require('./routes/greeting')

app.post('/greeting', greeting.hello);
app.post('/greeting/', greetings.goodbye)

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
