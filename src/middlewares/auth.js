const {response} = require('../helper/common')
const jwt = require('jsonwebtoken')
// eslint-disable-next-line no-undef
let key = process.env.JWT_KEY

const seller = (req,res,next) =>{
    let token
        let auth = req.headers.authorization
        token = auth.split(" ")[1]
        let decode = jwt.verify(token,key)
        req.payload = decode.role
        if(req.payload !== seller){
            return response(res, null, 'failed', 404, 'Just Seller can process this')
        }
        return next()
}

const user = (req,res,next) =>{
    if(req.params.role == 'user'){
        return next()
    }
    return response(res, null, 'failed', 404, 'Just User can Proses')
}

const protect = (req,res,next) =>{
    try{
        let token
        if(req.headers.authorization){
            let auth = req.headers.authorization
            token = auth.split(" ")[1]
            let decode = jwt.verify(token,key)
            req.payload = decode
            next()
        } else {
            return response(res, null, 'failed', 404, 'Server Need Token')
        }
    } catch(err) {
        console.log(err)
        if(err && err.name == 'JsonWebTokenError'){
            return response(res, null, 'failed', 404, 'Invalid Token')
        } else if (err && err.name == 'TokenExpriredError'){
            return response(res, null, 'failed', 404, 'Invalid Token')
        } else {
            return response(res, null, 'failed', 404, 'Invalid Token')
        }
    }
}

module.exports = {
    seller,
    user,
    protect
}