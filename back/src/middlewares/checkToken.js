import jwt from "jsonwebtoken";
import 'dotenv/config';

const checkToken = (req, res, next) => {
   const token = req.headers['x-acess-token'];

   if (token === undefined || token === 'null') {
      return res.status(404).json({
         msg: "Aucun token trouvé."
      });

   } else {
      jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
            
         if (error) {
            return res.status(401).json({
               msg: "Token invalide."
            });
            
         } else {
            res.status(200);
            req.params.id = decoded.id;
            next();
         };
      });
   };
};


export default checkToken;