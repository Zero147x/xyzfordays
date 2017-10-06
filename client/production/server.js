const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();

app.use(serveStatic(__dirname));

app.listen(process.env.PORT || 8080)
console.log('server started on 8080');