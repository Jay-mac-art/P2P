const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const db = "mongodb+srv://jaymac:jayantkumar7722@cluster0.nwvbroe.mongodb.net/p2p?retryWrites=true&w=majority";
const testimonialschema = require('./testimonialschema.js')
mongoose.connect(db).then(() => {
    console.log('Connection successful');
}).catch((err) => { console.log('error'); })

const testimonial = new mongoose.model("Testimonial", testimonialschema);


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });


//   const upload = multer({ storage: storage });



const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, '../frontend/public/uploads');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });

  const upload = multer({
    storage: storage,
    
  });
  

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/get/testimonials', async (req, res) => {

    try {
      
        const data = await testimonial.find();

        res.send(data).status(200)
    }
    catch (error) {
        res.send(error).status(400)

    }

})



app.post('/add/testimonial', upload.single('photo'), async (req, res) => {

    try {

        const obj = {
            photo :  !(req.file.filename) ? undefined : req.file.filename,
            name : req.body.name ,
            post: req.body.post ,
            active: req.body.active ,
            testimonial_Description: req.body.testimonial_Description
        }
        console.log(obj,"hello")



        const newvalue = new testimonial(obj);
        newvalue.save().then(() => { res.send({ "msg": "testimonial added successfully" }).status(200) }).catch((error) => { console.log(error); });
    }
    catch (error) {
        res.send(error).status(400)

    }

})


app.put('/edit/testimonial/:testimonial_ID', async (req, res) => {
    try {
        const id = req.params.testimonial_ID;

        const obj = {
            photo: req.file.filename,
            name: req.body.name,
            post: req.body.post,
            active: req.body.active,
            testimonial_Description: req.body.testimonial_Description
        }

        await testimonial.updateOne({ testimonial_ID: id }, obj).then(() => { res.send({ "msg": "testimonial edited successfully" }).status(200) }).catch((error) => { console.log(error); });

    }
    catch (error) {
        res.send(error).status(400)

    }

})

app.delete('/delete/testimonial/:testimonial_ID', async (req, res) => {

    const id = req.params.testimonial_ID;



    try {
        let newvalue = await testimonial.remove({ testimonial_ID: id }).then(() => { res.send({ "msg": "testimonial deleted successfully" }).status(200) }).catch((err) => { console.log('error'); });
    }
    catch (error) {
        res.send(error).status(400)

    }

})




app.listen(3000, console.log("server started"));

