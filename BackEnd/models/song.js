const mongoose = require('mongoose')
const joi = require('joi')

const songSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        default:'unKnown'
    },
    duration:{
        type:Number,
        required:true
    }

})


const songValidate = (song)=>{
  const Schema = joi.object({
    name:joi.string().required(),
    img:joi.string(),
    duration:joi.number(),
    artist:joi.string()
  })

  return Schema.validate(song)
}


const Song = mongoose.model('Song',songSchema)

module.exports = {Song,songValidate}