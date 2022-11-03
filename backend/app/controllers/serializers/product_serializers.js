const { product } = require("../../models");

//Serialize One product
module.exports = {
    serializeOneProduct(product) {
        return {
            id: product._id,
            slug: product.slug,
            prod_nom: product.prod_nom || null,
            id_prod_typ: product.id_prod_typ || null,
            price: product.price || null,
            prod_desc: product.prod_desc || null,
            id_prod_cat: product.id_prod_cat || null,
            img_prod: product.img_prod || null,
            location: product.location || null
        }
    }

}

//Serialize all products don't have pagination
module.exports = {
    serializeAllProducts(product) {
        const data_prod = [];
        for (let i = 0; i < product.length; i++) {
            data_prod.push({
                id: product[i]._id,
                slug: product[i].slug,
                prod_nom: product[i].prod_nom || null,
                price: product[i].price || null,
                id_prod_typ: product[i].id_prod_typ || null,
                prod_desc: product[i].prod_desc || null,
                id_prod_cat: product[i].id_prod_cat || null,
                img_prod: product.img_prod || null,
                location: product.location || null
            });
        }

        return data_prod;
    }
}

//Serialize all products with pagination (offset and limit)
module.exports = {
    serializeProductsAllFilter(dataProduct, QuantityProd) {
        const data_prod = [];
        const allData = [];
        dataProduct.map(product => {
            data_prod.push({
                id: product._id,
                slug: product.slug,
                prod_nom: product.prod_nom || null,
                price: product.price || null,
                id_prod_typ: product.id_prod_typ || null,
                prod_desc: product.prod_desc || null,
                id_prod_cat: product.id_prod_cat || null,
                img_prod: product.img_prod || null,
                location: product.location || null,
                quality: product.quality || null,
                disponibility: product.disponibility || null,
                author:product.author || null,
            });
        })

        allData.push(data_prod, QuantityProd);

        return allData;
    }
}