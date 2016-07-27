/**
 * Created by richard on 16/7/9.
 */
const Order = require('../models/task/reviewOrder');

exports = module.exports = {
    postOrder: function (req, res) {
        console.log("orderOwner:" + req.user);
        var order = new Order(
            {
                orderNo: new Date().getTime(),
                url: req.body.url,
                reviewNumber: req.body.reviewNumber,
                owner: req.user._id,
                totalPrice: req.body.totalPrice
            }
        );
        order.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'New order has been add to reviewzup', data: order});
        })
    },
    listOrder: function (req, res) {
        var user = req.user;
        Order.find(
            {
                owner: user._id
            },
            function (err, orders) {
                if (err) throw err;
                if (!orders || orders.length == 0) {
                    res.json('can not find any order');
                } else {
                    res.json(orders);
                }


            }
        );
    }
}
