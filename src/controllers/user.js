/* eslint-disable no-undef */
const userModel = require('../models/user')
const {v4: uuidv4} = require('uuid')
const commonHelper = require('../helpers/common')
const bcrypt = require('bcryptjs')
const { generateToken, generateRefreshToken } = require('../helpers/auth')
const cloudinary = require('cloudinary').v2
// const client = require('../configs/redis')

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });


exports.getData = async(req,res) =>{
    try {
        const result = await userModel.getData()
        res.send({status: 200, message: 'get data success', data: result.rows})
    } catch (error) {
        res.send({message: 'error', error})
    }
}

exports.insertData = async(req, res) =>{
        try {
            const { name, email, role, password } = req.body
            console.log(req.body);
            // const image = await cloudinary.uploader.upload(photo.path, { folder: 'Recipes/User' })
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                const filterEmail = await userModel.findByEmail(email);
                if(!filterEmail.rowCount){
                    let dataUser = { id: uuidv4(), name, email, role, password: passwordHash }
                    const {data} = await userModel.insertData(dataUser)
                    commonHelper.response(res, data, 'success', 200, 'Insert Data Success')
                }else{
                    res.send({message: 'Email is Already Exist'})
                }
        } catch (error) {
            console.log(error);
            res.send({message: 'error'})
        }
}

exports.login = async(req,res) => {
    const {email, password} = req.body
    console.log(req.body);
    const {rows: [dataUser]} = await userModel.findByEmail(email)
    console.log(dataUser);
    if(!dataUser){
        return commonHelper.response(res, null, 'failed', 403, 'login failed! register')
    }
    // console.log(dataUser);
    const validationPassword = bcrypt.compareSync(password, dataUser.password)
    if(!validationPassword){
        return commonHelper.response(res, null, 'failed', 403, 'login failed! password doesn`t match')
    }
    let payload = {
        id: dataUser.id,
        email: dataUser.email,
        password: dataUser.password,
        photo: dataUser.photo
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