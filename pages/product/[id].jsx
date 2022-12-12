import Head from "next/head";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import Basket from "../../components/Basket";

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };

  return (
    <>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="container">
        <Basket />
        <div className="productContainer row">
          <div className="col-md-6">
            <div className="left">
              <div className="imgContainer">
                <img
                  src={pizza.img}
                  className="singleproduct-image"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-center">
            <div className="right">
              <div className="rightContent">
                <h1 className="title">{pizza.title}</h1>
                <span className="price">${price}</span>
                <p className="desc">{pizza.desc}</p>
                <h4 className="choose mb-3">Package size?</h4>
                <div className="sizes">
                  <div
                    className={size === 0 ? "size active me-5" : "size me-5"}
                    onClick={() => handleSize(0)}
                  >
                    <Image src="/img/small.png" layout="fill" alt="" />
                    <span className="number">Small</span>
                  </div>
                  <div
                    className={size === 1 ? "size active me-5" : "size me-5"}
                    onClick={() => handleSize(1)}
                  >
                    <Image src="/img/medium.png" layout="fill" alt="" />
                    <span className="number">Medium</span>
                  </div>
                  <div
                    className={size === 2 ? "size active me-5" : "size me-5"}
                    onClick={() => handleSize(2)}
                  >
                    <Image src="/img/newlarge.png" layout="fill" alt="" />
                    <span className="number">Large</span>
                  </div>
                </div>
                <h4 className="choose mt-3">Additional sauce</h4>
                <div className="ingredents">
                  {pizza.extraOptions.map((option) => (
                    <div className="foodOption mb-1" key={option._id}>
                      <input
                        type="checkbox"
                        id={option.text}
                        name={option.text}
                        className="foodCheckbox me-1"
                        onChange={(e) => handleChange(e, option)}
                      />
                      <label htmlFor="double">{option.text}</label>
                    </div>
                  ))}
                </div>
                <div className="add mt-3">
                  <input
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    defaultValue={1}
                    className="quantity"
                  />
                  <button className="button btn" onClick={handleClick}>
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
