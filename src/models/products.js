const pool = require('../configs/db')

const getData = ({search, limit, offset, sortBy, sortList}) =>{
    // return pool.query(`SELECT * FROM products WHERE (name) ILIKE ('%${search}%') ORDER BY ${sortBy} ${sortList} LIMIT ${limit} OFFSET ${offset}`)    
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM products WHERE (name) ILIKE ('%${search}%') ORDER BY ${sortBy} ${sortList} LIMIT ${limit} OFFSET ${offset}`, (err, result)=>{
            if(!err){
                resolve(result)
            }else{
                reject(err)
                console.log(err);
            }
        }) 
    });
}

const getDetailProduct = (id) =>{
    return pool.query(`SELECT products.*, category.name AS category FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id =${id}`)
}

// const getRelation = ({sortBy}) =>{
//     return pool.query(`SELECT products.*, category.name AS category FROM products INNER JOIN category ON products.id_category = category.id WHERE ORDER BY ${sortBy}`)
// }

const countData = () =>{
    return pool.query(`SELECT COUNT(*) AS total_products FROM products`)
}
// const getData = () =>{
//     return new Promise ((resolve, reject)=>{
//         pool.query(`SELECT * FROM products`, (err, result)=>{
//             if(!err){
//                 resolve(result)
//             }else{
//                 reject(new Error(err))
//             }
//         })
//     });
// }

// const insert = (data) => {
//     const {name,brand,condition,description,stock,id_category,price,photo} = data;
//     return pool.query(`INSERT INTO products(name,brand,condition,description,stock,id_category,price,photo)VALUES('${name}','${brand}','${condition}','${description},${stock},${id_category},${price},'${photo}')`);
// }

const insertData = (data) =>{
    const {name,brand,condition,description,stock,id_category,price,photo} = data
    return pool.query(`INSERT INTO products(name,brand,condition,description,stock,id_category,price,photo)VALUES('${name}','${brand}','{${condition}','${description}',${stock},${id_category},${price},'${photo}')`);
}

// const insertData = ({id, name, description, stock, price}) =>{
//     return new Promise ((resolve, reject)=>{
//         pool.query(`INSERT INTO products(id,name,description,stock,price)VALUES($1,$2,$3,$4,$5)`, [id, name, description, stock, price], (err, result)=>{
//             if(!err){
//                 resolve(result)
//             }else{
//                 reject(new Error(err))
//             }
//         })
//     })
// }

const update = (id, data) =>{
    const {name,brand,condition,description,stock,id_category,price} = data
    return pool.query(`UPDATE products SET name='${name}', brand='${brand}', condition='${condition}', description='${description}', stock=${stock}, id_category=${id_category}, price=${price} WHERE id=${id}`)
}

// const updateData = ({id, name, description, stock, price}) =>{
//     return new Promise ((resolve, reject)=>{
//         pool.query(`UPDATE products SET name=$2, description=$3, stock=$4, price=$5 WHERE id=$1`, [id, name, description, stock, price], (err, result)=>{
//             if(!err){
//                 resolve(result)
//             }else{
//                 reject(err)
//             }
//         })
//     })
// }

const deleteData = (id) =>{
    return pool.query(`DELETE FROM products WHERE id = ${id}`)
}

module.exports = {
    getData,
    getDetailProduct,
    insertData,
    update,
    deleteData,
    countData
    // getRelation
}