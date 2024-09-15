const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
server = app.listen(3000, () => console.log(`Started on port 3000`));
