import { faArrowLeftLong, faArrowRightLong, faCircleQuestion, faCartArrowDown, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notification } from '../../../utilities';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../slices/cartSlices';
import { byId } from '../../../api/product';

import ReactStars from 'react-stars'
import Comment from './Comment';
import styles from '../Product/product.module.css';
import Bar from '../../Bar/Bar';


const Detail = ({ infos, isLog }) => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const params   = useParams();

   const [msg,           setMsg] = useState('');
   const [details,   setDetails] = useState({});
   const [compo,       setCompo] = useState(false);
   const [comment,   setComment] = useState(false);

   useEffect(() => {
      getDetail(params.id);
   }, [params.id]);

   const getDetail = async (id) => {
      const res = await byId(id);
      return setDetails(res.data.product);
   };


   return (
      <main className={styles.detail} >

         {details.product_name && (
            <div>
               <h1>Tablette de Chocolat <span>{details.product_name}</span></h1>
               <hr />
            </div>)}
         
{/* Display Arrow Back / Cover Bar */}
         
         {details.product_name ? <section>
            <section>

               <Bar percent={details.percent}
                  title={details.product_name}
                  category={details.category}
                  factory={details.factory}
                  item={details} />
               
               <FontAwesomeIcon onClick={() => { navigate(`/product/search/${details.product_name}`); window.scrollTo(0, 400) }}
                  icon={faArrowLeftLong}
                  size='2x' title='Revenir à la page des recherches' />

            </section>

{/* Display Datas Bar Chocolate */}
            
            <section>

               {!comment ? <>
               <div>
                     
                  <p>origine : </p>
                  <p>{details.product_name}</p>
                  <p>pourcentage en cacao :   <span>{details.percent.toFixed(2)} %</span></p>
                  <p>fabricant :              <span>{details.factory}</span></p>
                  <p>plants :                 <span>{details.species}</span></p>
                  <p>pays de production :     <span>{details.country_selling}</span></p>
                  <p>saveur : <span>{details.flavour}</span></p>
                     
                  <p>composition : <span>{details.compo}</span>&nbsp;&nbsp;
                     <FontAwesomeIcon onClick={() => !compo ? setCompo(true) : setCompo(false)}
                        icon={faCircleQuestion} size='1x' title='Afficher les explications' /></p>
                     
                  {compo && (
                     <legend>
                           <b>B</b> = Beurre de cacao, <b>S</b> = Sucre, <b>C</b> = Cacao,<br />
                           <b>La</b> = Poudre de Lait, <b>V</b> = Vanille, <b>L</b> = Lécithine, <b>Se</b> = Sel<br />
                           <b>S*</b> = Édulcorant autre que le sucre blanc de canne ou de betterave<br />
                     </legend>
                  )}
                  
                  <p>en stock : <span>{details.stock > 0 ?
                        <FontAwesomeIcon icon={faCircle} style={{ color: 'green' }} /> :
                        <FontAwesomeIcon icon={faCircle} style={{ color: 'red' }} />}</span></p>
                     
                  <p>popularité :</p>
                  <ReactStars value={+details.rating} count={5} size={24} edit={false} color2={'#f0c94b'} />
                     
               </div>
                  
{/* Btn Price / Comment */}
                     
               <div>
                     
                  <div>
                     <b>{details.price.toFixed(2)} €</b>
                        {details.stock > 0 ?
                           <button onClick={() => {
                              dispatch(addToCart(details));
                              notification(setMsg, `Vous avez ajouté 
                              ${details.product_name.charAt(0).toUpperCase()}${details.product_name.slice(1)} 
                              ${details.percent.toFixed(2)} % à votre panier.`)}}>
                              Ajouter au panier</button> : <p style={{padding: '10px'}}>Le produit n'est malheureusement plus en stock</p>}
                  </div>

                     <div onClick={() => {setComment(true); window.scrollTo(0, 1000)} } >voir les commentaires
                     <FontAwesomeIcon icon={faArrowRightLong} size='1x' />
                  </div>
                     
               </div></> :

// Display Comment Product 
                  
               <section>   
                  {<Comment infos={infos} isLog={isLog} setComment={setComment} />}
               </section>}
               
            </section>
            {msg === '' ? <></> : <p className='msg'><FontAwesomeIcon icon={faCartArrowDown} size='2x' /> {msg}</p>}

         </section> : <section>Chargement ...</section>}
      </main>
   );
};

export default Detail;