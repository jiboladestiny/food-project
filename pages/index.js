import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Add from "../components/Add";
import Basket from "../components/Basket";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import Popupmodal from "../components/Popupmodal";
import styles from "../styles/Home.module.css";

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [random, setRandom] = useState([]);

  useEffect(() => {
    const hasTimerTriggered = localStorage.getItem("hasTimerTriggered");

    if (!hasTimerTriggered) {
      const timer = setTimeout(() => {
        const shuffledArr = pizzaList.sort(() => Math.random() - 0.5);

        // Get the first 2 elements of the shuffled array
        const randomThree = shuffledArr.slice(0, 2);
        setRandom(randomThree);
        setModalVisible(true);
        localStorage.setItem("hasTimerTriggered", "true");
      }, 10000);

      return () => clearTimeout(timer); 
    }

    // Set the localStorage item to null every 6 hours
    const clearLocalStorage = setInterval(() => {
      localStorage.setItem("myLocalStorageItem", null);
    }, 6 * 60 * 60 * 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(clearLocalStorage);
  }, [pizzaList]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <Featured />
      <Popupmodal
        pizzaList={random}
        show={modalVisible}
        onCloseModal={handleCloseModal}
      />
      <Basket />
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(
    "http://food-project-ruddy.vercel.app/api/products"
  );
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
