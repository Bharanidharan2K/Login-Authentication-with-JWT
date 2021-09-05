const { create, getUsers, getUserWithId, updateUser, deleteUser, getUserWithEmail } = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');

const { sign } = require('jsonwebtoken');

module.exports = {
    createUser : (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database Connection Error..!"
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },
    getUserWithId : (req, res) => {
        const id = req.params.id;
        getUserWithId(id, (err, results) =>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success : 0,
                    message : "Records not Found"
                })
            }
            return res.json({
                success : 1,
                data : results
            });
        });
    },
    getUsers : (req, res) => {
        getUsers( (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success : 1,
                data : results
            });
        });
    },
    updateUser : (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) =>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success : 1,
                message : "Updated Successfully..!"
            });
        });
    },
    deleteUser : (req, res) => {
        const id = req.body.id;
        deleteUser(id, (err, results) =>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success : 1,
                message : "User deleted Successfully..!"
            });
        });
    },
    login : (req, res) =>{
        const body = req.body;
        getUserWithEmail(body.email, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success : 0,
                    message : "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsonToken = sign({result : results}, 'qwe123', {
                    expiresIn : '1h'
                });
                return res.json({
                    success : 1,
                    message : "Login Successfull..✔",
                    token : jsonToken
                });
            }
            else{
                return res.json({
                    success : 0,
                    message : "Invalid email or password"
                });
            }
        });
    }
}