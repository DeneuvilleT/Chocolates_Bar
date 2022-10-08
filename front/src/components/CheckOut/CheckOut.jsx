import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { setOrder, setOrderDetails } from "../../api/cart";
import { notification, URL_LOCAL } from "../../utilities";
import { clearCart } from "../../slices/cartSlices";
import { useState } from "react";

import styles from '../../components/CheckOut/checkout.module.css';
import { useDispatch } from "react-redux";

const Checkout = ({ infos, free, cartTotal, tax, cart, setMsg }) => {

   const stripe = useStripe();
   const elements = useElements();
   const dispatch = useDispatch();

   const [message, setMessage] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const finishBuying = async () => {
      const res = await setOrder(infos.id, infos.token);
      const genrate = await cart.forEach((item) => {
         setOrderDetails({
            id_product: item.id,
            item_quantity: item.item_quantity,
            price_each: item.price,
            total: !free ? (cartTotal + tax).toFixed(2) : cartTotal.toFixed(2),
            id_order: res.data.idOrder,
         }, infos.token);
      });
      notification(setMsg, res.data.msg);
      return dispatch(clearCart());
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      notification(setMessage, "Transaction en cours ...")
      if (!stripe || !elements) { return };

      setIsLoading(true);
      finishBuying();

      const { error } = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${URL_LOCAL}#/cart`,
         }
      });

      if (error.type === "card_error" || error.type === "validation_error") {
         return setMessage(error.message);
      } else {
         setIsLoading(false);
      }
   };


   return (
      <>
         <form className={styles.checkout} id="payment-form" onSubmit={(e) => handleSubmit(e)}>

            <PaymentElement id="payment-element" />

            <button disabled={isLoading || !stripe || !elements} id="submit">
               <span id="button-text">
                  {isLoading ? <div className="spinner" id="spinner"></div> : "Payer"}
               </span>
            </button>

            {message && <p id="payment-message">{message}</p>}
         </form>

         <aside>
            <p>Ne rentrez pas vos véritables coordonnées bancaires.</p>
            <p>Vous devez utiliser le numéro de carte suivant &nbsp;
               <span style={{ color: "crimson", textDecoration: "underline" }}>4242 4242 4242 4242</span>.</p>
            <p>En cliquant sur le bouton "Payer" vous allez effectuer une fausse transaction.</p>
            <p>Vous êtes libre de choisir la date d'expiration et le code de sécurité de la carte.</p>
            <p>Aucune de vos données bancaires ne seront enregistrées.</p>
            <p>Une trace de la transaction sera tout de même conservée.</p><br />
            <h2>Merci pour votre participation.</h2>
         </aside>
      </>
   );
};

export default Checkout;
