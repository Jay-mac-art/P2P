const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const testimonialschema = new Schema({
    testimonial_ID : {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
   photo : String,
    name : String, 
   post : String,
   testimonial_Description : String,
   
   active  :  { type: Number, default: 0 }
},
{ timestamps: { createdAt: 'createdDate',updatedAt: 'updatedDate' } }

)

 

module.exports = testimonialschema;