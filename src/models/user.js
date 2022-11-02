const pool = require('../configs/db')

const getData = () =>{
    return pool.query(`SELECT * FROM users`)
}

const findByEmail = (email) =>{
    return pool.query(`SELECT * FROM users WHERE email='${email}'`)
}

const insertData = (data) =>{
    const {id, name, email, password, role, phone, gender} = data
    return pool.query(`INSERT INTO users(id, name, email, password, role, phone, gender)VALUES('${id}', '${name}', '${email}', '${password}', '${role}', ${phone}, '${gender}')`)
}

const updateData = (id, data) =>{
    const {name, email, role, password, phone, gender} = data
    return pool.query(`UPDATE users SET name='${name}', email='${email}', role='${role}', password='${password}', ${phone}, '${gender}' WHERE id=${id}`)
}

const deleteData = (id) =>{
    return pool.query(`DELETE FROM users WHERE id='${id}'`)
}

module.exports = {
    getData,
    insertData,
    updateData,
    deleteData,
    findByEmail
}