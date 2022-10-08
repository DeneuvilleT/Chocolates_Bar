import Data from "../models/data.model.js";


export const getAllCustomers = async (req, res, next) => {
   try {
      const query = `SELECT * FROM customer`;
      const customers = await Data.recupAll(query);
      return res.status(200).json({
         msg: "Clients chargés",
         datas: customers
      });

   } catch (error) {
      return next(error);
   };
};


export const getAllComments = async (req, res, next) => {

   try {
      const query = `SELECT comment.id, content, id_product, posted, id_user, surname FROM comment 
      INNER JOIN customer ON comment.id_user = customer.id `;
      const comments = await Data.recupAll(query);
      return res.status(200).json({
         msg: "Commentaires chargés",
         datas: comments
      });

   } catch (error) {
      return next(error);
   };
};


export const getAllProducts = async (req, res, next) => {
   try {
      const query = `SELECT * FROM product`;
      const products = await Data.recupAll(query);

      return res.status(200).json({
         msg: "Produits chargés",
         datas: products
      });

   } catch (error) {
      return next(error);
   };
};


export const getAllOrders = async (req, res, next) => {
   try {
      const query = `SELECT * FROM order_resume`;
      const orders = await Data.recupAll(query);

      return res.status(200).json({
         msg: "Commandes chargées",
         datas: orders
      });

   } catch (error) {
      return next(error);
   };
};


export const updateStatus = async (req, res, next) => {
   try {
      const query = `UPDATE customer SET status = ? WHERE id = ?`;
      const updateUser = await Data.saveDatas(query, req.body.data);
      
      return res.status(200).json({
         msg: "Le statut a été mis à jour."
      });

   } catch (error) {
      return next(error);
   };
};


export const updateOrder = async (req, res, next) => {
   try {
      const query = `UPDATE order_resume SET status = ? WHERE id = ?`;
      const updateOrder = await Data.saveDatas(query, req.body.data);
      
      return res.status(200).json({
         msg: "Le statut a été mis à jour."
      });

   } catch (error) {
      return next(error);
   };
};


export const deleteComment = async (req, res, next) => {
   try {
      const query = `DELETE FROM comment WHERE id = ${req.body.id}`;
      const comment = await Data.deleteData(query);
      
      return res.status(200).json({
         msg: "Le commentaire a été supprimé."
      });

   } catch (error) {
      return next(error);
   };
};


export const deleteProduct = async (req, res, next) => {
   try {
      const query = `DELETE FROM product WHERE id = ${req.body.id}`;
      const product = await Data.deleteData(query);
      
      return res.status(200).json({
         msg: "Le produit a été supprimé."
      });

   } catch (error) {
      return next(error);
   };
};


export const addProduct = async (req, res, next) => {
   try {
      const query = `INSERT INTO product (factory, country_selling, producing_year, product_name, species, percent, compo, flavour, rating, stock, category, price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
      const createProduct = await Data.saveDatas(query, req.body.datas);

      return res.status(200).json({
         msg: "Le produit a été ajouté à la base de données."
      });

   } catch (error) {
      return next(error);
   };
};