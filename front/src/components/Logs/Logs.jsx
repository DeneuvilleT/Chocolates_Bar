import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { clearCart } from '../../slices/cartSlices';
import { logout } from '../../slices/authSlices';
import { Link } from 'react-router-dom';

import styles from './logs.module.css';

const Logs = () => {

   const { isLog, infos } = useSelector((state) => ({...state.auth}));

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const logOff = () => {
      dispatch(clearCart());
      dispatch(logout());
      return navigate("/");
   };

   return (
      <div className={styles.logs}>
         {isLog ? <Link onClick={() => window.scrollTo(0, 200)} to={"/customer/profil"} style={{ fontSize: '2.2rem', textDecoration:'underline' }} title="Accéder à votre page" >
            Bonjour {infos.surname}</Link> : <Link onClick={() => window.scrollTo(0, 0)} to={"/customer/login"}>connexion</Link>}
         
         {infos.status === 'admin' && (
            <Link onClick={() => window.scrollTo(0, 0)} to={"/admin"} style={{ fontSize: '2.2rem' }} title="Accéder au panneau d'administration" >
               Administration</Link>)}

         {isLog ? <FontAwesomeIcon icon={faPowerOff} size='2x'
            onClick={() => logOff()} /> : <Link onClick={() => window.scrollTo(0, 0)} to={"/customer/logup"}>inscription</Link>}  
      </div>
   );
};

export default Logs;

