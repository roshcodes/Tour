const express = require('express');

const cors = require('cors')
const path = require('path');

const api = require('./routes/api');
const port = 3000;

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));



app.use('/api', api);

app.listen(port, function(){
    console.log("Roshan Jadhav : Server running on localhost:" + port);
});