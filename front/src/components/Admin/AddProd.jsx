import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notification } from '../../utilities';
import { addProduct } from '../../api/admin';
import { useState } from 'react';

import AddForm from '../AddForm/AddForm'


const AddProd = ({ infos, setAdd, setMsg }) => {

   const [error, setError] = useState('');

   const addItem = async (e) => {
      e.preventDefault();

      if (e.target[10].value.toLowerCase() !== "noir" && e.target[10].value.toLowerCase() !== "blanc" && e.target[10].value.toLowerCase() !== "au lait") {
         return notification(setError,"La valeur renseignée dans Catégorie est incorrect.");
      };

      for (let i = 0; i < 12; i++) {
         if (e.target[i].value.replace(/ /g, "") === '') {
            return notification(setError, "Tous les champs doivent être renseignés.");
         };
      };

      const datas = {
         factory:         e.target[0].value,
         country_selling: e.target[1].value,
         producing_year:  e.target[2].value,
         product_name:    e.target[3].value.toLowerCase(),
         species:         e.target[4].value,
         percent:        +e.target[5].value.replace(/,/g, '.'),
         compo:           e.target[6].value,
         flavour:         e.target[7].value.toLowerCase(),
         rating:         +e.target[8].value.replace(/,/g, '.'),
         stock:           e.target[9].value,
         category:        e.target[10].value.toLowerCase(),
         price:          +e.target[11].value.replace(/,/g, '.'),
      };

      const res = await addProduct(infos.token, datas);
      e.target.reset();
      setAdd(false);
      return notification(setMsg, res.data.msg);
   };

   return (
      <>
         <hr />
         <AddForm onsubmit={(e) => addItem(e)} inputs={[
               {
                  type: "text", placeholder: 'fabricant',
                  text: "Le nom du couverturier qui fabrique le chocolat."
               },
               {
                  type: "text", placeholder: 'pays de vente',
                  text: "Le nom du pays d'où sera expédié le produit."
               },
               {
                  type: "number", placeholder: 'année de production', maxLength: 4,
                  text: "L'année de sortie du produit.", min: 1900, max:2022 
               },
               {
                  type: "text", placeholder: 'nom du produit',
                  text: "Le nom de vente du produit."
               },
               {
                  type: "text", placeholder: 'variétés de cacaoyer',
                  text: "Criollo, Forastero, Trinitario, Forastero ..."
               },
               {
                  type: "number", placeholder: 'pourcentage de cacao',
                  text: "Pourcentage du chocolat en pâte de cacao.", step:"0.1", min:"20.0", max:"100"
               },
               {
                  type: "text", placeholder: 'ingrédients',
                  text: "Composition du produit."
               },
               {
                  type: "text", placeholder: 'saveurs',
                  text: "Propriétés oragnoléptiques du produit"
               },
               {
                  type: "number", placeholder: 'note', max: 5, min: 0,
                  text: "Minimum 0, maximum 5."
               },
               {
                  type: "number", placeholder: 'stock', min: 0,
                  text: "Stock du produit.", max: 1000000
               },
               {
                  type: "text", placeholder: 'catégorie',
                  text: 'Catégorie : Noir, au lait, blanc'
               },
               {
                  type: "number", placeholder: 'prix', maxLength: 4,
                  text: "Entre 3,00 € et 8,00 €", step:"0.01", min:"3.00", max:"8.00" 
               },
               { type: "submit", value: "Ajouter le produit" }]}
         />
         {error === '' ? <></> : <p className='msg'><FontAwesomeIcon icon={faTriangleExclamation} size='2x' /> {error}</p>}
      </>
   );
};

export default AddProd;