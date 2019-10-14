const bcrypt = require('bcrypt');


// Require models folder 
const User = require('../models/User');


// Registration 
const registerController = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            res.json ({
                error: err 
            })
        }
        let user = new User ({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: hash
        })
        user.save()
            .then(result => {
                res.status(201).json ({
                    message: 'User created Successfully',
                    user: result
                })
            })
            .catch((err) => {
                res.json ({
                    err
                })
            })
    })
}

// Login
const loginController = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne ({
        email
    }).then((user) => {
        if(user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) {
                    res.json ({
                        message: 'Error Occured'
                    })
                }
                if(result) {
                    res.json ({
                        message: 'Login successfull'
                    })
                } else {
                    res.json ({
                        message: 'Login failed. password doesn\'t match' 
                    })
                }
            })
        } else {
            res.json ({
                message: 'User not found'
            })
        }
    })
}


const getAllUser = (req, res, next) => {
    User.find()
        .then(users => {
            res.json ({
                users
            })
        })
        .catch(error => {
            res.json ({
                error
            })
        })
}

module.exports = {
    registerController,  
    loginController,  
    getAllUser
}

