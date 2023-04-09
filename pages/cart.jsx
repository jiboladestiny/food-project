import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { reset, deleteProduct, increase, decrease } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import Success from "../components/Success";
import Modals from "../components/Modals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [cash, setCash] = useState(false);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState("");
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState(false);
  const [id, setId] = useState(false);
  const [price, setPrice] = useState(false);
  const [quantity, setquantity] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const dispatch = useDispatch();

  const createOrder = async (data) => {
    setSpinner(true);
    const response = await fetch(
      "https://food-project-ruddy.vercel.app/api/orders",
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
    setSpinner(false);
    toast.success("Order Process Successfully");
  };

  const closeOrder = () => {
    setCash(false);
  };

  const resetOrder = () => {
    dispatch(reset());
  };

  const proceed = (action, id = 0, price = 0, quantity = 0) => {
    setModal(false);

    if (action === "clear") {
      dispatch(reset());

      toast.error("Basket Cleared");
    } else {
      dispatch(
        deleteProduct({
          id: id,
          price: price * quantity,
        })
      );
      toast.error("Order Deleted");
    }
  };

  const cancel = () => {
    setModal(false);
  };

  return (
    <div className="container cart-container">
      <ToastContainer autoClose={1000} />
      {modal && (
        <Modals
          proceed={proceed}
          cancel={cancel}
          action={action}
          id={id}
          price={price}
          quantity={quantity}
        />
      )}
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
                setModal(true);

                setAction("clear");
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
                  <div className="d-flex align-items-center">
                    <h5 className="cart-mobile-title me-2">{product.title}</h5>

                    <h6 className="mt-1">&#8358;{product.price}</h6>
                  </div>
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

                  <div className="cart-cont">
                    <div
                      className="minus"
                      onClick={() => {
                        dispatch(
                          decrease({
                            id: product.id,
                          })
                        );
                      }}
                    >
                      -
                    </div>
                    <div>{product.quantity}</div>
                    <div
                      className="plus"
                      onClick={() => {
                        dispatch(
                          increase({
                            id: product.id,
                          })
                        );
                      }}
                    >
                      +
                    </div>
                  </div>

                  <i
                    className="bx bx-trash"
                    onClick={() => {
                      setModal(true);

                      setAction("delete");
                      setId(product.id);
                      setPrice(product.price);
                      setquantity(product.quantity);
                    }}
                  ></i>

                  <div className="cart-mobile-price">
                    <h6 className="cart-total-cont">
                      &#8358;{product.price * product.quantity}
                    </h6>
                  </div>
                </div>
              </div>
            ))}

            <div className="table-responsive">
              <button
                className="btn btn-sm clear-cart-desktop"
                onClick={() => {
                  setModal(true);

                  setAction("clear");
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
                            <div
                              className="minus"
                              onClick={() => {
                                dispatch(
                                  decrease({
                                    id: product.id,
                                  })
                                );
                              }}
                            >
                              -
                            </div>
                            <div>{product.quantity}</div>
                            <div
                              className="plus"
                              onClick={() => {
                                dispatch(
                                  increase({
                                    id: product.id,
                                  })
                                );
                              }}
                            >
                              +
                            </div>
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
                              setModal(true);

                              setAction("delete");
                              setId(product.id);
                              setPrice(product.price);
                              setquantity(product.quantity);
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
              product={cart}
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
