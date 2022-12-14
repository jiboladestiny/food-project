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
    

      <div className="container">
        <Basket />

        <div className="productContainer row">
          <div className="col-md-6">
            <div className="left">
              <div className="imgContainer">
                <img src={pizza.img} className="singleproduct-image" alt="" />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="button-cont">
                <div className="minus">-</div>
                <div>1</div>
                <div className="plus">+</div>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-center">
            <div className="right">
              <div className="rightContent">
                <h2 className="title">{pizza.title}</h2>
                <span className="price">${price}</span>
                <p className="product-desc">{pizza.desc}</p>
                <h5 className="choose mb-3">size?</h5>
                <div className="sizes">
                  <div
                    className={size === 0 ? "size active me-3" : "size me-3"}
                    onClick={() => handleSize(0)}
                  >
                    S
                  </div>
                  <div
                    className={size === 1 ? "size active me-3" : "size me-3"}
                    onClick={() => handleSize(1)}
                  >
                    M
                  </div>
                  <div
                    className={size === 2 ? "size active me-3" : "size me-3"}
                    onClick={() => handleSize(2)}
                  >
                    L
                  </div>
                </div>
                <h5 className="choose mt-3">Additional sauce</h5>
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
              
                  <div className="">
                    <div className="button-cont-desktop">
                      <div className="minus">-</div>
                      <div>1</div>
                      <div className="plus">+</div>
                    </div>
                  </div>
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
