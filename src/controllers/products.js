/* eslint-disable no-undef */
const productModel = require('../models/products')
const commonHelper = require('../helpers/common')
const cloudinary = require('cloudinary').v2
// const client = require('../configs/redis')

cloudinary.config({ 
  cloud_name: 'ddpo9zxts', 
  api_key: '713177134711193', 
  api_secret: 'LPrYJjwuotkDzsvBwCDlsUoIycw' 
});

    exports.getData = async(req,res,next) =>{
      try {
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit || 0;
        const sortBy = req.query.sortBy || 'id';
        const sortList = req.query.sortList || 'asc';
        const {rows} = await productModel.getData({search, page, limit, offset, sortBy, sortList})

        //Pagination
        const {rows: [count]} = await productModel.countData()
        const totalData = parseInt(count.total_products)
        const totalPage = Math.ceil(totalData / limit)
        const pagination = {
          currentPage: page,
          limit,
          totalData,
          totalPage
        }
        // console.log(res);
        commonHelper.response(res, rows, 'success', 200, 'Get Data Success', pagination)
        // res.send({status: 200, message: 'get data success', pagination, data: result.rows})
      } catch (err) {
        next(err)
      }
    }

    exports.getDetailData = async (req,res) =>{
      try {
        const id = req.params.id
        const {rows} = await productModel.getDetailProduct(id)
        // client.setEx(`products/${req.params.id}`,60*60,JSON.stringify(rows))
        commonHelper.response(res, rows, 'success', 200, 'Get Detail Data Success')
      } catch (error) {
        res.send({message: 'error', error})
      }
    }

    // exports.get = (req,res,next) =>{
    //     const search = req.query.search || "";
    //     const page = parseInt(req.query.page) || 1;
    //     const limit = parseInt(req.query.limit) || 20;
    //     const offset = (page - 1) * limit || 0;
    
    //     const sortBy = req.query.sortBy || "id";
    //     const sortOrder = req.query.sortOrder || "asc";
    //     productModel.getData({search, page, limit, offset, sortBy, sortOrder})

    //     .then(result => res.send({status: 200, message: 'get data success', data: result}))
    //     .catch(err => next(errorServer))
    // },

    // exports.getProduct = async(req,res,next) =>{
    //     try {
    //         const {rows} = await productModel.getData()
    //         res.json({status: 200, message: 'berhasil menampilkan data', data: rows})
    //     } catch (error) {
    //         res.json('error')
    //     }
    // },

    exports.insertProduct = async(req,res) =>{
      try {
        const {name,brand,condition,description,stock,id_category,price} = req.body
        const images = req.files.photo
        // console.log(images);
        let poto = []
        if(req.files.photo){
          const image = await Promise.all(
            images.map(async(item)=>{
              poto.push(await cloudinary.uploader.upload(item.path, { folder: 'Backend Blanja/products' }))
            })
          )
          // console.log(image);
          // console.log('============================================================');
        } 
 
        const pics = poto.map((item)=>{
          console.log(item);
          return item.secure_url
        })
        // console.log(pics);
        const data = {name,brand,condition,description,stock,id_category,price,images: req.files.photo ? JSON.stringify(pics).replace('[', '{').replace(']', '}') : false }
        await productModel.insertData(data)
        return commonHelper.response(res, data, 'sucess', 200, 'Add data sucess')
      } catch (error) {
        console.log(error);
        res.send({message: 'error', error})
      }
    }

    // exports.insertProduct = (req,res) =>{
    //     const Port = process.env.PORT
    //     const Host = process.env.DB_HOST
    //     const photo = req.file
    //     const uri = `http://${Host}:${Port}/img/${photo}`
    //     req.body.photo = uri
    //     req.body.stock = parseInt(req.body.stock)
    //     req.body.id_category = parseInt(req.body.id_category)
    //     req.body.price = parseInt(req.body.price)
    //     console.log(req.body);
    //     productModel.insertData(req.body)
    //     .then((result) =>
    //     commonHelper.response(res, result, 'sucess', 200, 'Add data sucess'))
    //   .catch(() =>commonHelper.response(res, null, 'failed', 404, 'error'));
    // }

    // exports.insert = async(req,res,next) =>{
    //     try {
    //         const {id, name, description, stock, price} = req.body
    //         data = {id,name,description, stock, price}
    //         await productModel.insertData(data)
    //         res.json({status: 200, message: 'data berhasil di tambahkan', data: data})
    //     } catch (error) {
    //         res.json('error')
    //     }
    //     // data = [...data,req.body]
    //     // res.json({status: 200, message: 'data berhasil di tambahkan', data: data})
    // },

    exports.update = async(req, res) => {
      try {
          const id = req.params.id
          const {name,brand,condition,description,stock,id_category,price} = req.body
          let pics = req.file.path
          const image = await cloudinary.uploader.upload(pics, { folder: 'Backend Blanja/products' })
          // console.log(req.file);
          // const pics = await cloudinary.uploader.upload(photo.path, { folder: 'Backend Blanja/products' })
          const data = {name,brand,condition,description,stock,id_category,price,photo: image.url} 
          productModel.update(id, data)
            return commonHelper.response(res, data, 'success', 200, 'data updated')
        } catch (error) {
          console.log(error);
            // res.send({message: 'error', error})
        }
      },

    // exports.update = (req,res,next) =>{
    //     productModel.update()
        // let newData = data.map((item)=>{
        //     if(item.id == req.params.id){
        //         return req.body
        //     }else{
        //         return item
        //     }
        // })
        // data = [...newData]
        // res.json({status: 200, message: 'data berhasil di ubah', data: data})
    // },

    exports.delete = (req,res, next) =>{
        productModel.deleteData(req.params.id)
        .then((result)=>{
          return commonHelper.response(res, null, 'sucess', 203, 'Add data sucess')
        })
        .catch((error)=>{
            next(error)
        })
    }
    // exports.delete = (req,res,next) =>{
    //     let id = req.params.id
    //     let newData = data.filter((item)=>{
    //         if(item.id != id){
    //             return item
    //         }
    //     })
    //     data = [...newData]
    //     res.json({status: 200, message: 'data berhasil di hapus', data: data})
    // }