import pool from '../config/connection.js';

class Data {

   static async recupAll(query) {
      const [datas] = await pool.execute(query);
      return datas;
   };

   static async recupOne(query, id) {
      const [datas] = await pool.execute(query, [id]);
      return datas;
   };

   static async recupByKey(query, datas) {
      const [result] = await pool.execute(query, [datas]);
      return result;
   };

   static async recupDatas(query, datas) {
      const [newDatas] = await pool.execute(query, [...Object.values(datas)]);
      return newDatas;
   };

   static async saveDatas(query, datas) {
      const [newDatas] = await pool.execute(query, [...Object.values(datas)]);
      return newDatas;
   };

   static async generateOrder(query) {
      const [order] = await pool.execute(query);
      return order;
   };

   static async deleteData(query) {
      const [item] = await pool.execute(query);
      return item;
   };

};


export default Data;