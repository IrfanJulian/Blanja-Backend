const pool = require('../configs/db')

const getData  = () =>{
    return pool.query(`SELECT * FROM transactions`)
}

const insert = (data) =>{
    const {name, total_order, price, total_price} = data
    return pool.query(`INSERT INTO transactions(name, total_order, price, total_price)VALUES('${name}', ${total_order}, ${price}, ${total_price})`)
}

const deleteData = (id) =>{
    return pool.query(`DELETE FROM transactions WHERE id=${id}`)
}

const update = (id, data) =>{
    const {name, total_order, price, total_price} = data
    return pool.query(`UPDATE transactions SET name='${name}', total_order=${total_order}, price=${price}, total_price=${total_price} WHERE id=${id}`)
}

module.exports = {
    getData,
    insert,
    deleteData,
    update
}