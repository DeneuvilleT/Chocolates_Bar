import Customer from "../models/customer.model.js";
import nodeMail from "../lib/nodeMailing.js";
import Data from "../models/data.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';


export const getOne = async (req, res, next) => {
   try {
      const query = `SELECT * FROM customer
      WHERE customer.id = ?`;

      const customer = await Data.recupOne(query, req.params.id);

      return res.status(200).json({
         msg: "Données clients chargées",
         datas: customer[0]
      });

   } catch (error) {
      return next(error);
   };
};


export const signIn = async (req, res, next) => {
   try {

      const query = `SELECT * FROM customer WHERE email = ?`;
      const identity = await Data.recupOne(query, req.body.email);

      if (!identity.length) {
         return res.status(404).json({ msg: "Utilisateur inconnu." });
      };

      if (identity[0].validate === 0) {
         return res.status(406).json({ msg: "Votre email n'a pas été activé. Vérifiez le contenu de votre boite mail." });
      };

      const checkPass = await bcrypt.compare(req.body.password, identity[0].password);
      if (checkPass) {
         const generateToken = jwt.sign(identity[0], process.env.SECRET_TOKEN);
         return res.status(200).json({ datas: identity[0], token: generateToken });

      } else {
         return res.status(401).json({ msg: "Mot de passe érroné." });
      };

   } catch (error) {
      return next(error);
   };
};


export const signUp = async (req, res, next) => {
   try {
      const queryCheck = `SELECT * FROM customer WHERE email = ?`;
      const checkMail = await Data.recupOne(queryCheck, req.body.email);

      if (checkMail.length) {
         return res.status(409).json({ msg: "Adresse mail déjà existante." });
      };

      const generatePassHash = await bcrypt.hash(req.body.password, +process.env.SALT);
      const datasCustomer = {
         surname: req.body.surname,
         email: req.body.email,
         password: generatePassHash,
         picture:''
      };

      const queryCreate = `INSERT INTO customer (surname, email, password, picture) VALUES (?,?,?,?)`;
      const createUser = await Data.saveDatas(queryCreate, datasCustomer);

      nodeMail(req.body.email);

      return res.status(200).json({ msg: "Félicitations pour la création de votre compte, un email de vérification vous a été envoyé. Pensez à vérifier vos spams." });


   } catch (error) {
      return next(error);
   };
};


export const updateInfos = async (req, res, next) => {
   try {
      let query;
      const datas = req.body.datas;

      if (datas.password) {
         const generatePassHash = await bcrypt.hash(req.body.datas.password, +process.env.SALT);
         
         req.body.datas.password = generatePassHash;
         query = `UPDATE customer SET 
         email = ?, password = ?, firstname = ?, 
         lastname = ?, address = ?, city = ?, zip_code = ?, phone = ?
         WHERE id = ${req.params.id}`;
      } else {
         query = `UPDATE customer SET 
         email = ?, firstname = ?, 
         lastname = ?, address = ?, city = ?, zip_code = ?, phone = ?
         WHERE id = ${req.params.id}`;
      };

      const updateUser = await Data.saveDatas(query, req.body.datas);

      const queryUser = `SELECT * FROM customer
      WHERE customer.id = ?`;
      const newDatas = await Data.recupOne(queryUser, req.params.id)

      return res.status(200).json({
         msg: "Votre profil a été mis à jour.",
         newDatas: newDatas[0]
      });

   } catch (error) {
      return next(error);
   };
};


export const updateEmail = async (req, res, next) => {
   try {

      const queryCheck = `SELECT validate FROM customer WHERE email = "${req.params.email}"`;
      const identity = await Data.recupOne(queryCheck, req.params.email);

      if (identity[0].validate === 1) {
         return res.status(201).json({ msg: "Votre compte a déjà été activé." });
      };

      const query = `UPDATE customer SET validate = 1 WHERE email = "${req.params.email}"`;
      const updateMail = await Customer.validate(query);

      return res.status(200).json({ msg: "Votre compte a été activé." });

   } catch (error) {
      return next(error);
   };
};


export const updatePicture = async (req, res, next) => {
   try {
      const datas = {
         picture: req.body.data
      };
      
      const query = `UPDATE customer SET picture = ? WHERE id = ${req.params.id}`;
      const updateUser = await Data.saveDatas(query, datas);
      
      const queryUser = `SELECT * FROM customer
      WHERE customer.id = ?`;
      const newDatas = await Data.recupOne(queryUser, req.params.id);
      res.header(
         "Access-Control-Allow-Headers",
         "Origin, X-Requested-With, Content-Type, Accept"
      );
      return res.status(200).json({
         msg: "Votre photo a été mise à jour.",
         newDatas: newDatas[0]
      });

   } catch (error) {
      return next(error);
   };
};


export const loadPicture = async (req, res, next) => {
   try {
      if (!req.files || !Object.keys(req.files).length) res.status(400);

      req.files.image.mv(`public/images/${req.files.image.name}`, (error) => {
         if (error) {
            console.log(error, "L'image n'a pas été enregistré");
            return res.status(500).json({
               msg: "L'image n'a pas été enregistré"
            });
         };
      });

      const image = `${process.env.URL_BACK}/public/images/${req.files.image.name}`;
      console.log("Voici l'image",image)
      return res.status(200).json({
         url:  image,
      });

   } catch (error) {
      return next(error);
   };
};


export const loadDatas = async (req, res, next) => {
   try {
      const queryCom = `SELECT * FROM comment
      WHERE comment.id_user = ?`;
      const comments = await Customer.datas(queryCom, req.params.id);

      const queryOrder = `SELECT * FROM order_resume
      WHERE order_resume.id_buyer = ?`;
      const orders = await Customer.datas(queryOrder, req.params.id);

      return res.status(200).json({
         msg: "Données clients chargées",
         comments: comments,
         orders: orders
      });

   } catch (error) {
      return next(error);
   };
};


export const loadOrder = async (req, res, next) => {
   try {
      const query = `
      SELECT order_details.id, id_order, quantity, price_each, total, product_name, price, order_date, status FROM order_details 
      JOIN product ON product.id = order_details.id_product
      JOIN order_resume ON order_resume.id = order_details.id_order
      WHERE order_details.id_order = ?`;

      const order = await Customer.order(query, req.body.id);
      return res.status(200).json({
         msg: "Commande chargée",
         order: order[0]
      });

   } catch (error) {
      return next(error);
   };
};   


export const wakeup = async (req, res, next) => {
   try {
      return res.status(200).json({ msg: "Coucou heroku, il est l'heure de se réveiller ^__^" });
   } catch (error) {
      return next(error);
   };
};
