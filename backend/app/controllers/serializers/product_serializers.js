
module.exports = {
    serializeOneProcuct(product) {
        return {
            id: product._id,
            slug: product.slug,
            prod_nom: product.prod_nom || null,
            id_prod_typ: product.id_prod_typ || null,
            precio: product.precio || null,
            prod_desc: product.prod_desc || null,
            id_prod_cat: product.id_prod_cat || null
        }
    }

}

module.exports = {
    serializeAllProcucts(product) {
        console.log(product);
        const data_prod = [];
        for (let i = 0; i < product.length; i++) {
            data_prod.push({
                id: product[i]._id,
                slug: product[i].slug,
                prod_nom: product[i].prod_nom || null,
                precio: product[i].precio || null,
                id_prod_typ: product[i].id_prod_typ || null,
                prod_desc: product[i].prod_desc || null,
                id_prod_cat: product[i].id_prod_cat || null
            });
        }

        return data_prod;
    }
}