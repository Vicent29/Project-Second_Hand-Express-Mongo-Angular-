// console.log("Prueba jsss");
module.exports = {
    serializeOneCategory(category) {
        return {
            id: category._id,
            slug: category.slug || null,
            id_cat: category.id_cat || null,
            cat_name: category.cat_name || null,
        }
    }

}

module.exports = {
    serializeAllCategories(category) {
        const data_cate = [];
        for (let i = 0; i < category.length; i++) {
            data_cate.push({
                id: category[i]._id,
                slug: category[i].slug || null,
                id_cat: category[i].id_cat || null,
                cat_name: category[i].cat_name || null,
                img_cat: category[i].img_cat || null,
                img_cat2: category[i].img_cat2 || null,
                products: category[i].products || null,

            });
        }

        return data_cate;
    }
}