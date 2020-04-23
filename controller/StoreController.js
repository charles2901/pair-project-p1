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
        if(Number(req.body.amount) === 0){
            req.body.amount = 1
        } else  if(isNaN(req.body.amount) || Number(req.body.amount) < 0){
            const msg = 'Invalid input amount'
            res.redirect(`/store?msg=${msg}&type=danger`)
        }
        Cart.findOne({
            where: {
                ItemId : req.body.ItemId
            }
        })
        .then( obj => {
            if(obj){
                return Cart.update({
                    amount : obj.amount + Number(req.body.amount)
                }, {
                    where : {
                        ItemId : req.body.ItemId,
                        UserId : req.session.userId,
                    }
                })
            } else {
                Cart.create({
                    UserId : req.session.userId,
                    ItemId : req.body.ItemId,
                    amount : Number(req.body.amount)
                })
            }
        })
        .then( () => {
            const msg = `Barang berhasil ditambahkan`
            res.redirect(`/store?msg=${msg}&type=success`)
        })
        .catch( err => {
            res.send(err)
        })
    }
}

module.exports = StoreController