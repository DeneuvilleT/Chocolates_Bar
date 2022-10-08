import Data from "../models/data.model.js";


export const postComment = async (req, res, next) => {

   try {
      const query = `INSERT INTO comment (id_product, content, posted, id_user) VALUES (?,?,NOW(),?)`;
      const comment = await Data.saveDatas(query, req.body.datas);

      return res.status(200).json({ msg: "Votre commentaire a été posté." });
      
   } catch (error) {
      return next(error);
   };
};

export const editComment = async (req, res, next) => {

   try {
      const query = `UPDATE comment SET content = ? WHERE id = ?`;
      const comment = await Data.saveDatas(query, req.body.datas);

      return res.status(200).json({ msg: "Votre avis a été mis à jour." });
      
   } catch (error) {
      return next(error);
   };
};