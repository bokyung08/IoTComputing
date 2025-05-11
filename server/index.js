const express = require('express');
const cors = require('cors');
const setupSerial = require('./serial');
const apiRoutes = require('./routes/api');  // 여기에서 'router'가 아닌 './routes/api'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);  // 여기도

setupSerial();

app.listen(3001, () => {
  console.log('Server on http://localhost:3001');
});
