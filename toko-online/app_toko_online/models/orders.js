const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //referensi ke model user
        required: [true, "User harus diisi"]
    },
    //item item dalam pemesanan (relasi ke model product)
    orderItems: 
        [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product', //referensi ke model product
                    required: [true, "Produk harus diisi"]
                },
                quantity: {
                    type: Number,
                    required: [true, "Jumlah harus diisi"],
                    min: [1, "Minimal jumlah adalah 1"]
                },
                priceAtOrder: {
                    type: Number,
                    required: [true, "Harga saat pemesanan harus diisi"]
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: [true, "Total pesanan harus diisi"]
        },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending'
        },
        orderDate: {
            type: Date,
            default: Date.now
        }
    });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
