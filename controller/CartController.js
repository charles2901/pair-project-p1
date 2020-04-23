const User = require('../models').User
const Cart = require('../models').Cart
const Item = require('../models').Item
const formatMoney = require('../helpers/formatMoney')
const nodemailer = require('nodemailer')

class CartController{
    static sendEmail(emailReciept, arr, total){
        let templates = `<b> <h3> Daftar belanjaan online </h3>
                            <table style="border: 1px solid #ddd;text-align: left; border-collapse: collapse;">
                                <tr>
                                    <th style="border: 1px solid #ddd;text-align: left; padding: 15px; text-align: center;">Item</th>
                                    <th style="border: 1px solid #ddd;text-align: left; padding: 15px; text-align: center;">Jumlah</th>
                                </tr>
                                `
        for(let i = 0; i < arr.length; i++){
            templates += `  <tr>    
                                <td style="border: 1px solid #ddd;text-align: left; padding: 15px; text-align: center;">${arr[i].name}</td>
                                <td style="border: 1px solid #ddd;text-align: left; padding: 15px; text-align: center;">${arr[i].amount}</td>
                            </tr>`
        }
        templates += `<tr>    
            <td style="border: 1px solid #ddd;text-align: left; padding: 15px; text-align: right; font-weight : bold">Total : </td>
            <td style="border: 1px solid #ddd;text-align: left; padding: 15px; text-align: center;">${formatMoney(total)}</td>
            </tr></table></b>`
        
            let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth : {
                user: 'pairprojectP1',
                pass: 'Pairproject123'
            }
        })
        let mailOptions = {
            from: 'pairprojectP1',
            to: emailReciept,
            subject: 'Thankyou for your purchase at Toko Online',
            html: templates
        }

        transporter.sendMail(mailOptions, function(err, data) {
            if(err) console.log('Error sending email')
            else console.log('Email sent')
        })
    }

    static page(req, res){
        const alert = req.query
        User.findOne({
            include: [{model : Item}],
            where : {
                id: req.session.userId
            }
        })
        .then( data => {
            res.render('cart', {data, alert, formatMoney})
        })
        .catch( err => {
            res.send(err)
        })
    }
    
    static checkOut(req , res){
        User.findOne({
            include: [{model : Item}],
            where : {
                id: req.session.userId
            }
        })
        .then( data => {
            if(data.Items.length === 0){
                const msg = `Keranjang belanjaan anda kosong`
                res.redirect(`/cart?msg=${msg}`)
            } else {
                const excItem = []
                for(let i = 0; i < data.Items.length; i++){
                    if(data.Items[i].stock < data.Items[i].Cart.amount){
                        excItem.push(data.Items[i].name)
                    }
                }
                if(excItem.length === 0){
                    let dataObj = []
                    let totalCart = 0
                    for(let i = 0; i < data.Items.length; i++){
                        dataObj.push({
                            id: data.Items[i].id,
                            name: data.Items[i].name,
                            stock : data.Items[i].stock - data.Items[i].Cart.amount,
                            price : data.Items[i].price,
                            amount : data.Items[i].Cart.amount
                        })
                        totalCart += data.Items[i].Cart.amount * data.Items[i].price
                    }
                    Item.bulkCreate(dataObj, { updateOnDuplicate: ["stock"] })
                    .then( () => {
                        return Cart.destroy({
                            where: {
                                UserId: req.session.userId
                            }
                        })
                    })
                    .then( () => {
                        return User.findByPk(req.session.userId)
                    })
                    .then( data => {
                        CartController.sendEmail(data.email, dataObj, totalCart)
                        const msg = `Belanja berhasil. Silahkan ditunggu untuk dikirimkan`
                        res.redirect(`/store?msg=${msg}&type=success`)
                    })
                } else {
                    const msg = `${excItem.join(', ')} melebihi stock yang ada`
                    res.redirect(`/cart?msg=${msg}`)
                }
            }
        })
        .catch( err => {
            res.send(err)
        })
    }


    static delete(req, res){
        Cart.destroy({
            where: {ItemId: Number(req.params.id)}
        })
        .then( () => {
            const msg = 'Barang berhasil dihapus'
            res.redirect(`/cart?msg=${msg}`)
        })
        .catch( err =>{
            res.send(err)
        })
    }
}

module.exports = CartController