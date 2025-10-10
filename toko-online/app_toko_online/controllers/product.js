var products = require('../../data/products.json');
var Product = require("../models/products");
const index = async (req, res) => {
 	try {
        //gunakan find({})
        //untuk mengambil seluruh data dari collection
        const prod = await Product.find({}); 
        res.render('index', {
            title: 'Toko Online Sederhana - Ini Dari Mongo DB',
            products: prod
        });
    }catch(err){
        res.status(500).send("Gagal memuat produk");
    }
}; 

const detail = async (req, res) => {
    try{
        //const productId = parseInt(req.params.id); //Tangkap ID dari URL
        //const product = products.find(p => p.id === productId); //Cari produk by id
        
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if(!product){ //jika produk tidak ditemukan
            return res.status(404).send('Produk tidak ditemukan!');
        }
        res.render('product-detail',
            {
                title : product.name,
                product : product
            }
        );
    }catch(err){
        res.status(404).send("Gagal memuat detail produk");
    }
}; 

//membuat rest api
const apiall = async (req, res) => {
 	try {
        const prod = await Product.find({}); 
        res.status(200).json(
            {
                status: true,
                message: "Data produk berhasil diambil",
                data: prod
            });
    }catch(err){
        res.status(500).json({
            status : false,
            message: "Gagal memuat produk"
        });
    }
}; 

module.exports = { index, detail, apiall }; 