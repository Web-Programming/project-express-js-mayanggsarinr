const Order = require("../models/orders");
const User = require("../models/users");
const Product = require("../models/products");

// Ambil semua pesanan (GET /api/orders)
const all = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'username email') // hanya ambil informasi dasar user
            .sort({ orderDate: -1 });

        res.status(200).json({
            status: true,
            message: "Data pesanan berhasil diambil",
            data: orders
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Gagal memuat pesanan",
            error: err.message
        });
    }
};

// Buat pesanan baru (POST /api/orders)
const create = async (req, res) => {
    try {
        const { user, orderItems } = req.body;

        if (!user || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({
                status: false,
                message: "User dan orderItems wajib diisi dan tidak boleh kosong"
            });
        }

        // Hitung totalAmount
        const totalAmount = orderItems.reduce((sum, item) => {
            return sum + item.quantity * item.priceAtOrder;
        }, 0);

        const order = new Order({
            user,
            orderItems,
            totalAmount
        });

        const savedOrder = await order.save();

        res.status(201).json({
            status: true,
            message: "Pesanan berhasil dibuat",
            data: savedOrder
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Gagal membuat pesanan",
            error: err.message
        });
    }
};

// Ambil detail satu pesanan (GET /api/orders/:id)
const detailorder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'username email')
            .populate('orderItems.product');

        if (!order) {
            return res.status(404).json({
                status: false,
                message: "Pesanan tidak ditemukan"
            });
        }

        res.status(200).json({
            status: true,
            message: "Detail pesanan berhasil diambil",
            data: order
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Gagal memuat detail pesanan",
            error: err.message
        });
    }
};

// Update status pesanan (PUT /api/orders/:id)
const update = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatus = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        if (!status || !allowedStatus.includes(status)) {
            return res.status(400).json({
                status: false,
                message: "Status tidak valid atau tidak disediakan"
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                status: false,
                message: "Pesanan tidak ditemukan"
            });
        }

        res.status(200).json({
            status: true,
            message: "Status pesanan berhasil diperbarui",
            data: updatedOrder
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Gagal memperbarui status pesanan",
            error: err.message
        });
    }
};

module.exports = {
    all,
    create,
    detailorder,
    update
};

