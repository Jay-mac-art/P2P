const express = require('express')
const app = express()

app.get('/:uid', (req,res) => {
const uid = req.params;


res.send({uid}).status(200)

})

app.listen(3000,console.log("server started"));

