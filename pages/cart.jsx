import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { reset, deleteProduct } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import Success from "../components/Success";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [cash, setCash] = useState(false);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState("");
  const [spinner, setSpinner] = useState(false);

  const dispatch = useDispatch();


  const createOrder = async (data) => {
    const response = await fetch(
      "http://food-project-ruddy.vercel.app/api/orders",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
        setOrder(result._id);
        setCash(false);
        setSuccess(true);
    // try {
    //   const res = await axios.post("http://localhost:3000/api/orders", data);
    //   setSpinner(true)
    //   if (res.status === 201) {
    //     setOrder(res.data._id);
    //     setCash(false);
    //     setSuccess(true);
    //     setSpinner(false)
    //   }
    // } catch (err) {
    //   console.log(err);
    //   setSpinner(false)
    // }
  };

  const closeOrder = () => {
    setCash(false);
  };

  const resetOrder = () => {
    dispatch(reset());
  };

  return (
    <div className="container cart-container">
      <ToastContainer autoClose={1000} />

      <h3 className="mt-5 mb-3">My Orders</h3>
      {cart.products.length === 0 && (
        <div>
          <div className="empty-cart">Basket is Empty</div>

          <Link href="/" passHref>
            <button className="btn btn-secondary d-flex align-items-center btn-sm mt-5">
              Start ordering
            </button>
          </Link>
        </div>
      )}
      {cart.products.length > 0 && (
        <div className="row">
          <div className="col-lg-8">
            <button
              className="btn btn-sm clear-cart-mobile"
              onClick={() => {
                dispatch(reset());
                toast.error("Basket Cleared");
              }}
            >
              <i className="bx bx-trash"></i> Clear cart
            </button>
            {cart.products.map((product) => (
              <div className="cart-mobile" key={product.id}>
                <div>
                  <img src={product.img} className="cart-image" alt="" />
                </div>
                <div className="ms-4">
                  <h5 className="cart-mobile-title">{product.title}</h5>
                  <h6>
                    {product.extras.map((extra) => (
                      <button
                        className="btn btn-sm extra-btn me-2"
                        key={extra._id}
                      >
                        {extra.text}
                      </button>
                    ))}
                  </h6>
                  <div className="d-flex">
                    <div className="cart-cont">
                      <div>{product.quantity}</div>
                    </div>
                    <i
                      className="bx bx-trash"
                      onClick={() => {
                        dispatch(
                          deleteProduct({
                            id: product.id,
                            price: product.price * product.quantity,
                          })
                        );
                        toast.error("Order Deleted");
                      }}
                    ></i>

                    <div className="cart-mobile-price">
                      <h6>&#8358;5,000</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="table-responsive">
              <button
                className="btn btn-sm clear-cart-desktop"
                onClick={() => {
                  dispatch(reset());
                  toast.error("Basket Cleared");
                }}
              >
                <i className="bx bx-trash"></i> Clear cart
              </button>
              <table className="table table-striped align-middle" id="cart">
                <thead>
                  <tr className="">
                    <th>Product</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((product) => (
                    <tr className="cart-tr" key={product.id}>
                      <td>
                        <div className="cart-imgContainer">
                          <img
                            src={product.img}
                            className="cart-image"
                            alt=""
                          />
                        </div>
                      </td>
                      <td>
                        <span className="cart-name">{product.title}</span>
                      </td>
                      <td>
                        <span className="cart-extras">
                          {product.extras.map((extra) => (
                            <button
                              className="btn btn-sm extra-btn me-1"
                              key={extra._id}
                            >
                              {extra.text}
                            </button>
                          ))}
                        </span>
                      </td>
                      <td>
                        <span className="cart-price">
                          &#8358;{product.price}
                        </span>
                      </td>
                      <td>
                        <span className="cart-quantity">
                          <div className="cart-cont">
                            <div>{product.quantity}</div>
                          </div>
                        </span>
                      </td>
                      <td>
                        <span className="cart-total">
                          &#8358;{product.price * product.quantity}
                        </span>
                      </td>
                      <td>
                        <div className="cart-delete">
                          <i
                            className="bx bx-trash"
                            onClick={() => {
                              dispatch(
                                deleteProduct({
                                  id: product.id,
                                  price: product.price * product.quantity,
                                })
                              );
                              toast.error("Order Deleted");
                            }}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/" passHref>
              <button className="btn btn-secondary btn-sm d-flex align-items-center">
                Continue ordering
              </button>
            </Link>
          </div>
          <div className="col-lg-3">
            <div className="cart-wrapper">
              <h4 className="cart-title">Payment summary</h4>
              <div className="cart-totalText mb-1">
                <b className="cart-totalTextTitle">Subtotal:</b>
                <span>&#8358;{cart.total}</span>
              </div>
              <div className="cart-totalText mb-1">
                <b className="cart-totalTextTitle">Delivery:</b>
                <span>&#8358;700</span>
              </div>
              <div className="cart-totalText">
                <b className="cart-totalTextTitle">Total:</b>
                <span>&#8358;{cart.total + 700}</span>
              </div>

              <div className="cart-paymentMethods">
                <button
                  className="cart-button btn shadow-none"
                  onClick={() => setCash(true)}
                >
                  Pay on delivery
                </button>
              </div>
            </div>
          </div>

          {cash && (
            <OrderDetail
              total={cart.total}
              closeOrder={closeOrder}
              createOrder={createOrder}
              spinner={spinner}
            />
          )}
          {success && <Success resetOrder={resetOrder} id={order} />}
        </div>
      )}
    </div>
  );
};

export default Cart;
