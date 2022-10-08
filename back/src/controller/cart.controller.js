import Data from "../models/data.model.js";
import Stripe from "stripe";
import 'dotenv/config';


export const setOrderDetails = async (req, res, next) => {
   try {
      const query = `INSERT INTO order_details (id_product, quantity, price_each, total, id_order) VALUES (?,?,?,?,?)`;
      const order = await Data.saveDatas(query, req.body.datas);

      return res.status(200);

   } catch (error) {
      return next(error);
   };
};


export const setOrder = async (req, res, next) => {
   try {
      const query = `INSERT INTO order_resume(order_date, status, id_buyer) VALUES (NOW(),"en cours de préparation",${req.params.id})`;
      const order = await Data.generateOrder(query);

      return res.status(200).json({
         msg: "Commande générée. Vous pouvez la consulter sur votre page de profil",
         idOrder: order.insertId,
      });

   } catch (error) {
      return next(error);
   };
};


export const checkOut = async (req, res, next) => {
   try {
      const stripe = new Stripe(process.env.SECRET_KEY);
      const price = req.body.datas.replace(/[^0-9|-]/g, '');

      const paymentIntent = await stripe.paymentIntents.create({
         amount: +price,
         currency: "EUR",
         automatic_payment_methods: {
            enabled: true,
         },
      });
      
      return res.status(200).json({
         clientSecret: paymentIntent.client_secret,
      });

   } catch (error) {
      return next(error);
   };
};