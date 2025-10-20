const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User harus diisi"]
    },
    orderItems: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
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
                }
            }
        ],
        required: [true, "Item pesanan harus diisi"],
        validate: [array => array.length > 0, "Minimal satu item harus dipesan"]
    },
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
