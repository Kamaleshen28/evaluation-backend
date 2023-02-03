const express = require('express');
const router = require('./src/routes/routes');
const port = 5000;
const app = express();



app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});