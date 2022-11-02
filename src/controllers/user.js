/* eslint-disable no-undef */
const userModel = require('../models/user')
const {v4: uuidv4} = require('uuid')
const commonHelper = require('../helper/common')
const bcrypt = require('bcryptjs')
const { generateToken, generateRefreshToken } = require('../helper/auth')

exports.getData = async(req,res) =>{
    try {
        const result = await userModel.getData()
        res.send({status: 200, message: 'get data success', data: result.rows})
    } catch (error) {
        res.send({message: 'error', error})
    }
}

// exports.getData = (req,res,next) =>{
//     userModel.getData()
//     .then((result)=>{
//         res.send({status: 200, message: 'get data success', data: result.rows})
//     })
//     .catch((error)=>{
//         res.send({message: 'error', error})
//     })
// }

// exports.insertData = (req, res) =>{
//     const validateEmail = userModel.findByEmail()
//     console.log(validateEmail);
//     if(validateEmail){
//         res.json({message: 'Email is already exist'})
//     }
//     const {name, email, role, password, phone, gender} = req.body
//     let data = {
//         id: uuidv4(),
//         name,
//         email,
//         role,
//         password,
//         phone,
//         gender
//     }
//     userModel.insertData(data)
//     .then(()=>{
//         res.send({status: 200, message: 'add data success'})
//     })
//     .catch((error)=>{
//         res.send({message: 'error', error})
//     })
// }

exports.insertData = async(req, res) =>{
    try {
        const {name, email, role, password, phone, gender} = req.body
        const dataUser = await userModel.findByEmail(email)
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        // console.log(dataUser);
        if(!dataUser.rowCount){
            let data = {
                id: uuidv4(),
                name,
                email,
                role,
                password: passwordHash,
                phone,
                gender
            }
            await userModel.insertData(data)
            res.send({status: 200, message: 'add data success'})
        }else{
            res.send({message: 'email is already exist'})
        }
    } catch (error) {
        res.send({message: 'error'})
    }
}

exports.login = async (req,res) => {
    const {email, password} = req.body
    const {rows: [dataUser]} = await userModel.findByEmail(email)
    if(!dataUser){
        return commonHelper.response(res, null, 'failed', 403, 'login failed! wrong email or password')
    }
    // console.log(dataUser);
    const validationPassword = bcrypt.compareSync(password, dataUser.password)
    if(!validationPassword){
        return commonHelper.response(res, null, 'failed', 403, 'login failed! wrong email or password')
    }
    let payload = {
        email: dataUser.email,
        password: dataUser.password
    }
        dataUser.token = generateToken(payload)
        dataUser.refreshToken= generateRefreshToken(payload)
        commonHelper.response(res, dataUser, 'success', 200, 'login success')
}


exports.updateData = (req, res) =>{
    userModel.updateData(req.params.id, req.body)
    .then(()=>{
        res.json({status: 200, message: 'update data success'})
    })
    .catch((error)=>{
        res.json({message: 'error', error})
    })
}

exports.deleteData = (req,res) =>{
    userModel.deleteData(req.params.id)
    .then(()=>{
        res.send({status: 200, message: 'delete data success'})
    })
    .catch((error)=>{
        res.send({message: 'error', error})
    })
}