const { Product } = require('../../db')

const createProduct = async({name, image, price, sales, stock}) => {
 const product = {name, image, price, sales, stock}

 const create = await Product.create(product)
return create

}

module.exports = {
    createProduct
}