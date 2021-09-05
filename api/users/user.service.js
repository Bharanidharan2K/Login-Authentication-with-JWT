const pool = require('../../config/database');

module.exports = {
    create : (data, callBack) =>{
        pool.query(
            `INSERT INTO registration(first_name, last_name, gender, email, password, mobile_no)
                VALUES(?,?,?,?,?,?)`, 
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.mobile_no,
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getUsers : callBack => {
        pool.query(
            `SELECT * FROM registration`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserWithId : (id, callBack) => {
        pool.query(
            `SELECT * FROM registration WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser : (data, callBack) =>{
        pool.query(
            `UPDATE registration SET first_name=?, last_name=?, gender=?, email=?, password=?, mobile_no=? WHERE id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.mobile_no,
                data.id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser : (id, callBack) =>{
        pool.query(
            `DELETE FROM registration WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserWithEmail : (email, callBack) => {
        pool.query(
            `SELECT * FROM registration WHERE email = ?`,
            [email],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
};