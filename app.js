const express = require('express');
const app = express();
const server = require('http').Server(app);

app.use(express.static('public'));


app.get('/', function(req, res){
    res.send('Hello World');
})

server.listen(8080, function(){
    console.log(`app listening on ${server.address().port}`);
})
