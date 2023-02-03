const express = require('express');
const router = require('./src/routes/books');
const port = 4444;
const app = express();



app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});