
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import Basket from "../../components/Basket";
import PizzaCard from "../../components/PizzaCard";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
const Product = ({ pizza, pizzalist }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);

  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };
  const International = pizzalist.filter((item) => {
    return item.category === pizza.category;
  });

    const Internal = International.filter((item) => {
    return item._id !== pizza._id;
  });


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
    const uniqueId = Math.floor(Math.random() * 12345678943434343545454454);

    dispatch(addProduct({ ...pizza, extras, price, quantity, id:uniqueId }));
    toast.success("Added to Basket");
  };

  return (
    <>
      <div className="container">
        <Basket />
        <ToastContainer autoClose={1000} />
        <div className="productContainer row">
          <div className="col-md-6">
            <div className="left">
              <div className="imgContainer">
                <img src={pizza.img} className="singleproduct-image" alt="" />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="button-cont">
                <div
                  className="minus"
                  onClick={() => {
                    setQuantity(function (prevCount) {
                      if (prevCount > 0) {
                        return (prevCount -= 1);
                      } else {
                        return (prevCount = 0);
                      }
                    });
                  }}
                >
                  -
                </div>
                <div className="quantity-name">{quantity}</div>
                <div
                  className="plus"
                  onClick={() => setQuantity((quantity) => quantity + 1)}
                >
                  +
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex align-items-center">
            <div className="right">
              <div className="rightContent">
                <h2 className="title">{pizza.title}</h2>
                <span className="price">&#8358;{price}</span>
                <p className="product-desc">{pizza.desc}</p>
                <h5 className="choose mb-3">Package size?</h5>
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
                      <div
                        className="minus"
                        onClick={() => {
                          setQuantity(function (prevCount) {
                            if (prevCount > 0) {
                              return (prevCount -= 1);
                            } else {
                              return (prevCount = 0);
                            }
                          });
                        }}
                      >
                        -
                      </div>
                      <div className="quantity-name">{quantity}</div>
                      <div
                        className="plus"
                        onClick={() => setQuantity((quantity) => quantity + 1)}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <button className="product-button btn" onClick={handleClick}>
                    Add to basket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="related">
          <h3 className="mb-4">Related Foods</h3>

          <div className="row gy-4">
            {Internal.map((pizza) => (
              <PizzaCard key={pizza._id} pizza={pizza} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://food-project-ruddy.vercel.app/api/products/${params.id}`
  );

  const response = await axios.get(
    "http://food-project-ruddy.vercel.app/api/products"
  );
  return {
    props: {
      pizza: res.data,
      pizzalist: response.data,
    },
  };
};

export default Product;
