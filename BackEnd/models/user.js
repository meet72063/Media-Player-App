const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const bcrypt= require('bcrypt')
require('dotenv').config()


const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
       type:String,
       require:true,
       unique:true
    },
    password:{
        type:String,
        require:true
    },
    Date:{
        type:String,
        required:true
    },
    month:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        requied:true
    },
    likedSongs:{
        type:Array,
        default:[]
    },
    Playlists:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})


userSchema.methods.generateToken = function(){
   
    return  jwt.sign({userId:this._id,name:this.name,isAdmin:this.isAdmin},process.env.JWT_PRIVATE_KEY,{expiresIn:'7d'})
    }

userSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)

})

userSchema.methods.comparePassword = async function(password){
    
   const  isMatched = await bcrypt.compare(String(password),this.password)
   return isMatched
}


const validation = (user)=>{
    const Schema = joi.object({
        name:joi.string().required(),
        password:joi.string().min(6).required(),
        month:joi.string().required(),
        Date:joi.required(),
        year:joi.string().required(),
        gender:joi.string().valid('male','female','non-binary').required(),
        email:joi.string().email().required(),
        isAdmin:joi.allow(),
        likedSongs:joi.array(),
        Playlists:joi.array()
    
    
    })

  return  Schema.validate(user)
}

const User= mongoose.model('users',userSchema)

module.exports ={validation,User}


