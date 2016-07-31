const userController = require('../controller/user');
const authController = require('../controller/authenticate');
const orderController = require('../controller/order');
const express = require('express');


module.exports = function (app, passport) {
    var isAuthenticated = passport.authenticate('jwt', {session: false});

    app.get("/json", function (req, res) {
        res.json({text: "hello world"});
    });
    var router = express.Router();
    router.post('/authenticate', authController.authenticate);
    router.post('/register', authController.register);
    router.get('/verify', authController.emailVerify);
    
    
    
    router.route('/users')
        .get(isAuthenticated, userController.getUsers)
        .post(userController.postUsers);

    router.route('/order')
        .post(isAuthenticated, orderController.postOrder);
    router.route('/orders')
        .get(isAuthenticated, orderController.listOrder);
    app.use('/api', router);
}
