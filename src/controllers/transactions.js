const transactionsModel = require('../models/transactions')

exports.getData = (req,res,next) =>{
    transactionsModel.getData()
    .then((result)=>{
        res.json({status: 200, message: 'get data success', data: result.rows})
    })
    .catch((error)=>{
        res.json({message: 'error', error})
    })
}

exports.insert = (req,res,next) =>{
    transactionsModel.insert(req.body)
    .then((result)=>{
        res.json({status: 200, message: 'add data success'})
    })
    .catch((error)=>{
        res,json({message: 'error', error})
    })
}

exports.delete = (req,res,next) =>{
    transactionsModel.deleteData(req.params.id)
    .then((result)=>{
        res.json({status: 200, message: 'delete data success'})
    })
    .catch((error)=>{
        res.json({message: 'error', error})
    })
}

exports.update = (req,res,next) =>{
    transactionsModel.update(req.params.id, req.body)
    .then((result)=>{
        res.json({status: 200, message: 'update data success'})
    })
    .catch((error)=>{
        res.json({message: 'error', error})
    })
}

