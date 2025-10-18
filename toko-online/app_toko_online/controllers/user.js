var users = require('../../data/products.json');
var User = require("../models/users");

const index = async (req, res) => {
  try {
    const users = await User.find({});
    res.render('index', {
      title: 'Daftar User - Dari MongoDB',
      users: users
    });
  } catch (err) {
    res.status(500).send("Gagal memuat user");
  }
};

const detail = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User tidak ditemukan!');
    }

    res.render('user-detail', {
      title: user.name,
      user: user
    });
  } catch (err) {
    res.status(404).send("Gagal memuat detail user");
  }
};

// CRUD API controllers

const all = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: true,
      message: "Data user berhasil diambil",
      data: users
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal memuat user"
    });
  }
};

const create = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password // Pastikan password di-hash sebelum disimpan di model sebenarnya
    });

    const user = await newUser.save();

    res.status(200).json({
      status: true,
      message: "User berhasil disimpan",
      data: user
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({
        status: false,
        message: err.message
      });
    } else {
      res.status(500).json({
        status: false,
        message: 'Internal server error'
      });
    }
  }
};

const detailuser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User tidak ditemukan"
      });
    }

    res.status(200).json({
      status: true,
      message: "Detail user berhasil diambil",
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Gagal memuat detail user"
    });
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User tidak ditemukan"
      });
    }

    res.status(200).json({
      status: true,
      message: "User berhasil diupdate",
      data: user
    });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).json({
        status: false,
        message: "Format ID tidak valid"
      });
    } else if (err.name === 'ValidationError') {
      res.status(400).json({
        status: false,
        message: err.message
      });
    } else {
      res.status(500).json({
        status: false,
        message: 'Internal server error'
      });
    }
  }
};

const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User tidak ditemukan"
      });
    }

    res.status(200).json({
      status: true,
      message: "User berhasil dihapus"
    });
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).json({
        status: false,
        message: "Format ID tidak valid"
      });
    } else {
      res.status(500).json({
        status: false,
        message: 'Internal server error'
      });
    }
  }
};

module.exports = {
  index,
  detail,
  all,
  create,
  detailuser,
  update,
  remove
};
