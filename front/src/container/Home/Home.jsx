import { useDispatch } from 'react-redux';
import { saveDetail } from '../../slices/datasSlices';
import { useEffect } from 'react';
import { wakeUp } from '../../api/user';
import { Link } from 'react-router-dom';

import styles from './home.module.css';


const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    wake();
  }, []);
  
  const wake = async () => {
    const res = await wakeUp()
    console.log(res.data.msg);
    return console.clear();
  };

  return (
    <main className={styles.home}>
      
      <div>
      <h1>Bienvenue <span>sur le</span></h1>
      <h1> Chocolate's Bar</h1>
      </div>

      <figure>
        <figcaption>Venez découvrir plus de 2500 références de tablettes de chocolat de toutes origines !</figcaption>
      </figure>

      <Link onClick={() => {
        dispatch(saveDetail(null)); window.scrollTo(0, 400)}} to={"/product/search"}>Nos Produits</Link>

    </main>
  );
};

export default Home;