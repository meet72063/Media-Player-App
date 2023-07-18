const {StatusCodes} = require('http-status-codes')


const errorHandler = (err,req,res,next)=>{

    // console.log(err)
    if(err.code===11000){
        res.status(StatusCodes.BAD_REQUEST).json({error:'Email already registered'})
    }
    if(err.code===400){
        res.status(StatusCodes.NOT_FOUND).json({error:'Route not exist '})
        return
    }
    //any other error
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('something went wrong')

}

module.exports = errorHandler