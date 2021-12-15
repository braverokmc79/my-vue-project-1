module.exports = {
    productList: {
        query: `
        SELECT tp.*, tc.category1 , tc.category2 , tc.category3 , ti.path, ti.type
            FROM t_product tp, t_category tc , t_image ti
        WHERE tp.category_id =tc.category_id  AND tp.product_id =ti.product_id AND ti.type=1
        `

    },

    productList2: {
        query: `                
            select t3.*, t4.path
            FROM
                (
                select
                    t1.*,
                    t2.category1 ,
                    t2.category2 ,
                    t2.category3
                from
                    t_product t1,
                    t_category t2
                WHERE
                    t1.category_id = t2.category_id 

            ) t3 
            left join (select * from t_image WHERE type = 1 ) t4
            on t3.product_id = t4.product_id

        `
    },


    productDetail: {
        query: `
            SELECT tp.*, tc.category1 , tc.category2 , tc.category3 , ti.path, ti.type
                FROM t_product tp, t_category tc , t_image ti
            WHERE tp.category_id =tc.category_id  AND tp.product_id =ti.product_id AND ti.type=3 AND tp.product_id=?
         `
    },

    productMainImages: {
        query: `SELECT * from t_image ti WHERE  ti.type=2 AND product_id =? `
    },


    productInsert: {
        // query: `INSERT INTO t_product
        //         (product_name, product_price,
        //              delivery_price, add_delivery_price, tags, outbound_days, seller_id, category_id)   VALUES(?, ?, ?, ?,  ?, ?, ?, ?)

        //     `
        query: `INSERT INTO t_product set ?`

    },

    productImageInsert: {
        // query: `
        //     INSERT INTO t_image (product_id, type, path)  values ( ?, ? , ?)
        // `
        query: `insert into t_image set ?`
    },

    imageList: {
        query: `select * from t_image where product_id=?`
    },
    imageDelete: {
        query: `delete from t_image where image_id=?`
    },

    sellerList: {
        query: `select * from t_seller`
    },

    signUp: {
        query: `insert into t_user set ? on duplicate key UPDATE ?`
    },


    productDelete: {
        query: `
            delete from t_product where product_id=?
        `
    }
    ,
    categoryList: {
        query: `select * from t_category`
    },








}