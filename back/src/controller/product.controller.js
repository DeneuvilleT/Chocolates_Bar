import Data from "../models/data.model.js";


export const getOne = async (req, res, next) => {
   try {
      const queryProduct = `SELECT * FROM product  
      WHERE product.id = ?`;
      const product = await Data.recupOne(queryProduct, req.params.id);

      const queryComment = `SELECT comment.id, content, id_product, posted, id_user, surname FROM comment 
      INNER JOIN customer ON comment.id_user = customer.id 
      WHERE comment.id_product = ?`;
      const comments = await Data.recupOne(queryComment, req.params.id);

      return res.status(200).json({
         msg: "Produit chargé !!!",
         product: product[0],
         comments: comments
      });

   } catch (error) {
      return next(error);
   };
};


export const getResult = async (req, res, next) => {
   try {
      const query = `SELECT * FROM product
      WHERE product_name LIKE '%${req.body.key.toLowerCase()}%'`;
      const products = await Data.recupAll(query);

      if (products[0] === undefined) {
         return res.status(201).json({
            msg: "Aucun produit ne correspond à votre recherche.",
         });

      } else {
         return res.status(200).json({
            msg: "Produits trouvés",
            datas: products
         });

      };

   } catch (error) {
      return next(error);
   };
};


export const getResultAdvanced = async (req, res, next) => {
   try {
      let query;
      const datas = req.body.datas;
      if (datas.product_name === '' && datas.category === '') {
         query = `SELECT * FROM product WHERE (product_name = ? OR percent = ? OR category = ?)`
      } else if (datas.product_name === '') {
         query = `SELECT * FROM product WHERE (product_name = ? OR percent >= ? AND category = ?)`
      } else if (datas.category === '') {
         query = `SELECT * FROM product WHERE (product_name = ? AND percent >= ? OR category = ?)`
      } else {
         query = `SELECT * FROM product WHERE (product_name = ? AND percent >= ? AND category = ?)`
      };
      
      const products = await Data.recupDatas(query, req.body.datas);

      if (products[0] === undefined) {
         return res.status(201).json({
            msg: "Aucun produit ne correspond à votre recherche.",
         });

      } else {
         return res.status(200).json({
            msg: "Produits trouvés",
            datas: products
         });

      };

   } catch (error) {
      return next(error);
   };
};


export const getOrigin = async (req, res, next) => {
   try {
      const query = `SELECT DISTINCT product_name FROM product ORDER BY product_name ASC`;
      const category = await Data.recupAll(query);

      return res.status(200).json({
         msg: "Catégories trouvées",
         category: category
      });

   } catch (error) {
      return next(error);
   };
};

