import pool from "../config/connection.js";

class Customer {

   static async order(query, id) {
      const [datas] = await pool.execute(query, [id]);
      return [datas];
   };

   static async validate(query) {
      const [datas] = await pool.execute(query);
      return datas;
   };

   static async datas(query, id) {
      const [datas] = await pool.execute(query, [id]);
      return datas;
   };
};

export default Customer;