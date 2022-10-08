import { faCartShopping, faAddressCard, faUpRightFromSquare, faCamera, faUser } from '@fortawesome/free-solid-svg-icons';
import { loadDatas, addNewPicture, saveNewPicture, updateInfos } from '../../../api/user';
import { notification, URL_LOCAL, valueOk } from '../../../utilities';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setAllOrders } from '../../../slices/datasSlices';
import { update } from '../../../slices/authSlices';

import noPicture from '../../../assets/no_photo.webp';
import Notfound from '../../PageNotFound/Notfound';
import AddForm from '../../AddForm/AddForm';
import styles from '../Customer/customer.module.css';
import dayjs from 'dayjs';


const Profil = ({ isLog }) => {

  const { infos, orders } = useSelector((state) => ({ ...state.datas, ...state.auth }));

  const file = useRef();

  const [msg,         setMsg] = useState('');
  const [modif,     setModif] = useState(false);
  const [pick,       setPick] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
    if (infos.token) checkOrder();
  }, [infos.token]);


  // Load Order
  const checkOrder = async () => {
    const res = await loadDatas(infos.id, infos.token)
    return dispatch(setAllOrders(res.data.orders));
  };

  // Update Datas User
  const updateDatas = async (e) => {
    e.preventDefault();

    if (e.target[1].value.replace(/ /g, "") === "") {
      e.target[1].value = infos.password;
    };

    if (!e.target[1].value.replace(/ /g, "").match(valueOk)) {
      return notification(setMsg, 'Le mot de passe ne correspond pas aux exigences.');
    };

    const datas = {
      email:     e.target[0].value.replace(/ /g, "") === "" ? infos.email : e.target[0].value,
      password:  e.target[1].value.replace(/ /g, ""),
      firstname: e.target[2].value.charAt(0).replace(/ /, "") === "" ? infos.firstname : e.target[2].value,
      lastname:  e.target[3].value.charAt(0).replace(/ /, "") === "" ? infos.lastname  : e.target[3].value,
      address:   e.target[4].value.charAt(0).replace(/ /, "") === "" ? infos.address   : e.target[4].value,
      city:      e.target[5].value.charAt(0).replace(/ /, "") === "" ? infos.city      : e.target[5].value,
      zip_code:  e.target[6].value === "" ? infos.zip_code  : +e.target[6].value,
      phone:     e.target[7].value.replace(/ /g, "") === "" ? infos.phone : +e.target[7].value
    };

    if (infos.password === datas.password) delete datas.password;

    const res = await updateInfos(datas, infos.id, infos.token);
    if (res.status === 200) {
      setModif(false);

      const updateUser = res.data.newDatas;
      updateUser.token = infos.token
      dispatch(update(updateUser));
      return notification(setMsg, res.data.msg);
    };
  };

  // Picture Profile
  const changePicture = async () => {
    setPick(false);
    setLoading(true);

    const res = await addNewPicture(file.current.files[0]);
    const save = await saveNewPicture(res.data.url.trim(), infos.id, infos.token);

    const updateUser = save.data.newDatas;
    updateUser.token = infos.token;
    dispatch(update(updateUser));

    return setLoading(false);
  };


  return (
    <main className={styles.customer} >

{/* Banner */}

      {isLog ? <><h1>Bienvenue sur ta page de profil {infos.firstname}</h1>
        <div>
          <figure>

            {!loading ?
              <img src={infos.picture === '' ? noPicture : infos.picture}
                onClick={() => !pick ? setPick(true) : setPick(false)}
                alt="photo de profil" title="Modifier votre photo de profil" />
              :
              <iframe src="https://giphy.com/embed/uFymrKF1jQZ9K"
                style={{ borderRadius: '50%', border: '5px #000000 outset', backgroundColor:"white" }}
                width="300" height="300" frameBorder="0"
                className="giphy-embed" allowFullScreen></iframe>}

            <FontAwesomeIcon icon={faCamera} title="Modifier votre photo de profil" size="2x"
              onClick={() => !pick ? setPick(true) : setPick(false)} />

            {pick ? <input onInput={() => changePicture()} ref={file} type="file" /> : <></>}

          </figure>
        </div>

        <div>
          <h4>vos coordonées</h4><hr />
          <FontAwesomeIcon icon={faAddressCard} size="2x" />
        </div>

{/* Datas User */}

        {!modif ?
          <section title='Modifier vos coordonnées' onClick={() => !modif ? setModif(true) : setModif(false)} >

            <p>{infos.email}</p><p>*************</p>
            <div>
              <p>{infos.firstname === null ? 'Prénom non spécifié'      : infos.firstname}</p>
              <p>{infos.lastname  === null ? 'Nom non spécifié'         : infos.lastname}</p>
            </div>
            <p>{infos.address     === null ? 'Adresse non spécifié'     : infos.address}</p>
            <div>
              <p>{infos.city      === null ? 'Ville non spécifié'       : infos.city}</p>
              <p>{infos.zip_code  === null ? 'Code Postal non spécifié' : infos.zip_code}</p>
            </div>
            <p>{infos.phone       === null ? 'Téléphone non spécifié'   : `0${infos.phone}`}</p>

          </section> :

          // Form Datas User 
          <AddForm onsubmit={(e) => updateDatas(e)} inputs={[
            { type: "text",     placeholder: infos.email  },
            { type: "password", placeholder: '**********' },
            { type: "text",     placeholder: infos.firstname || 'prénom' },
            { type: "text",     placeholder: infos.lastname  || 'nom' },
            { type: "text",     placeholder: infos.address   || 'adresse' },
            { type: "text",     placeholder: infos.city      || 'ville' },
            { type: "number",   placeholder: infos.zip_code  || 'code postal', min:10000, max: 99999, minLength:5},
            { type: "phone",    placeholder: infos.phone     || 'téléphone', minLength:8 },
            { type: "submit",   value: "Enregistrer" }]} />}

        <em>{msg === '' ? null : msg}</em>

        <div>
          <h4>vos commandes</h4><hr />
          <FontAwesomeIcon icon={faCartShopping} size="2x" />
        </div>

{/* Display Order */}

        <section>

          {orders.length ? orders?.map(order =>

            <article key={order.id} onClick={() => window.open(`${URL_LOCAL}/#/customer/order/${order.id}`)}>

              <h3>Commande numéro : {order.id}</h3>
              <p>{order.status}</p>
              <p>{dayjs(order.order_date).format('DD MMM YYYY')}</p>
              <FontAwesomeIcon icon={faUpRightFromSquare} />

            </article>) : <h2>Vous n'avez pas encore passé de commande.</h2>}

        </section></> : <Notfound />}
      {msg === '' ? <></> : <p className='msg'><FontAwesomeIcon icon={faUser} size='2x' /> {msg}</p>}
    </main>
  );
};

export default Profil;