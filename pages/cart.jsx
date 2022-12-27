import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import Success from "../components/Success";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        // router.push(`/orders/${res.data._id}`);
        setOrder(res.data._id);
        setCash(false);
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const closeOrder = () => {
    setCash(false);
  };

  return (
    <div className="container cart-container">
      <h3 className="mt-5 mb-3">My Orders</h3>
      {cart.products.length === 0 && (
        <div>
          <div className="empty-cart">Basket is Empty</div>

          <Link href="/" passHref>
            <button className="btn btn-secondary btn-sm mt-5">
              Start shopping
            </button>
          </Link>
        </div>
      )}
      {cart.products.length > 0 && (
        <div className="row">
          <div className="col-lg-8">
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
                      <div className="minus">-</div>
                      <div>1</div>
                      <div className="plus">+</div>
                    </div>

                    <div className="cart-mobile-price">
                      <h6>&#8358;5,000</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}


            <div className="table-responsive">              
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
                    <tr className="cart-tr" key={product._id}>
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
                        <span className="cart-price">${product.price}</span>
                      </td>
                      <td>
                        <span className="cart-quantity">
                          <div className="cart-cont">
                            <div className="minus">-</div>
                            <div>1</div>
                            <div className="plus">+</div>
                          </div>
                        </span>
                      </td>
                      <td>
                        <span className="cart-total">
                          ${product.price * product.quantity}
                        </span>
                      </td>
                      <td>
                        <div className="cart-delete" onClick={()=>{
                          cart.products.filter((item)=>{
                            return item.id !== product._id;
                          })
                        }}>
                          X
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/" passHref>
              <button className="btn btn-secondary btn-sm">
                Continue ordering
              </button>
            </Link>
          </div>
          <div className="col-lg-3">
            <div className="cart-wrapper">
              <h4 className="cart-title">Payment summary</h4>
              <div className="cart-totalText mb-1">
                <b className="cart-totalTextTitle">Subtotal:</b>
                <span>${cart.total}</span>
              </div>
              <div className="cart-totalText mb-1">
                <b className="cart-totalTextTitle">Delivery:</b>
                <span>$0.00</span>
              </div>
              <div className="cart-totalText">
                <b className="cart-totalTextTitle">Total:</b>
                <span>${cart.total}</span>
              </div>
              {open ? (
                <div className="cart-paymentMethods">
                  <button
                    className="cart-button btn"
                    onClick={() => setCash(true)}
                  >
                    Pay on delivery
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setOpen(true)}
                  className="cart-button btn"
                >
                  Checkout{" "}
                </button>
              )}
            </div>
          </div>

          {cash && (
            <OrderDetail
              total={cart.total}
              closeOrder={closeOrder}
              createOrder={createOrder}
            />
          )}
          {success && <Success id={order} />}
        </div>
      )}
    </div>
  );
};

export default Cart;
