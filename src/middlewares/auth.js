const jwt = require('jsonwebtoken')
const { response } = require('../helpers/common')
// eslint-disable-next-line no-undef
let key = process.env.JWT_KEY

const protect = (req,res,next) => {
    try {
        let token
        if(req.headers.authorization){
            let auth = req.headers.authorization
            token = auth.split(' ')[1]
            let decode = jwt.verify(token, key)
            req.payload = decode
            next()
        } else {
            return response(res, null, 'failed', 404, 'Server Need Token')
        }
    } catch (error) {
        console.log(error)
        if(error && error.name == 'JsonWebTokenError'){
            return response(res, null, 'failed', 404, 'Invalid Token')
        } else if (error && error.name == 'TokenExpriredError'){
            return response(res, null, 'failed', 404, 'Token Expired')
        } else {
            return response(res, null, 'failed', 404, 'Invalid Token')
        }
    }
}

module.exports = {
    protect
}

// const user = (req,res,next) =>{
//     let token
//         let auth = req.headers.authorization
//         token = auth.split(" ")[1]
//         let decode = jwt.verify(token,key)
//         let dataRole = decode.role
//         console.log(dataRole);
//         if(dataRole !== 'user'){
//             return response(res, null, 'failed', 404, 'Just User can process')
//         }
//         return next()
// }