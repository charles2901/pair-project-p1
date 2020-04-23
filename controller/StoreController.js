const Item = require('../models').Item
const Cart = require('../models').Cart
const formatMoney = require('../helpers/formatMoney')
class StoreController{
    static page(req, res){
        const alert = req.query
        Item.findAll({
            order: [ ['stock', 'DESC']]
        })
        .then( data => {
            res.render('store', {data, alert, formatMoney})
        })
        .catch( err => {
            res.send(err)
        })
    }

    static addToCartPost(req, res){
        let numAdded
        Cart.findOne({
            where: {
                ItemId : req.body.ItemId
            }
        })
        .then( obj => {
            if(obj){
                if(Number(req.body.amount) === 0){
                    numAdded = 1
                }
                return Cart.update({
                    amount : obj.amount + numAdded
                }, {
                    where : {
                        ItemId : req.body.ItemId,
                        UserId : req.session.userId,
                    }
                })
            } else {
                if(Number(req.body.amount) === 0){
                    numAdded = 1
                }
                Cart.create({
                    UserId : req.session.userId,
                    ItemId : req.body.ItemId,
                    amount : numAdded
                })
            }
        })
        .then( () => {
            const msg = `Barang berhasil ditambahkan`
            res.redirect(`/store?msg=${msg}`)
        })
        .catch( err => {
            res.send(err)
        })
    }
}

module.exports = StoreController