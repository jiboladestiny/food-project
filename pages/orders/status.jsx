import { React, useState } from "react";

import axios from "axios";

const Status = ({ pizzaList }) => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(0);
  const [statusdetail, setStatusDetail] = useState();

  const check = () => {
    const order = pizzaList.filter((item) => {
      return item._id === code;
    });
    setStatusDetail(order[0]);
    console.log(order[0])
    if (order.length > 0) {
      setStatus(1);
    } else {
      setStatus(2);
    }

    // setStatus(0);
    // try {
    //   const res = await axios.get(
    //     `http://food-project-ruddy.vercel.app/api/orders/${code}`
    //   );
    //   console.log(res.data)
    //   setStatusDetail(res.data);

    //   setStatus(1);
    // } catch (error) {
    //   setStatus(2);
    //   console.log(error);
    // }
  };

  return (
    <div className="container order-status-cont">
      <h4 className="pt-5">Check your order status</h4>

      <div className="form-group col-md-6 col-lg-4 col-12 mt-4 d-flex">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          className="btn btn-secondary"
          onClick={check}
          disabled={code === ""}
        >
          Check
        </button>
      </div>

      <div className="row mt-5">
        <div className="col-md-10 col-lg-6">
          {status === 0 && <div className="lds-hourglass"></div>}
          {status === 1 && (
            <div>
              <div className="table-responsive">
                <table className="table table-striped align-middle" id="cart">
                  <thead>
                    <tr className="">
                      <th>Name</th>
                      <th>Address</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="cart-tr">
                      <td>
                        <span className="cart-name">
                          {statusdetail.customer}
                        </span>
                      </td>
                      <td>
                        <span className="cart-address">
                          {statusdetail.address}
                        </span>
                      </td>
                      <td>
                        <span className="cart-price">
                          &#8358;{statusdetail.total}
                        </span>
                      </td>
                      <td>
                        <span className="cart-price">
                          {statusdetail.status === 0 && (
                            <button className="btn d-flex align-items-center btn-secondary btn-sm">
                              <span className="me-1">Preparing</span>{" "}
                              <i className="bx bx-bowl-hot bx-flashing"></i>
                            </button>
                          )}
                          {statusdetail.status === 1 && (
                            <button className="btn">On the Way</button>
                          )}
                          {statusdetail.status === 2 && (
                            <button className="btn btn-success btn-sm">
                              Delivered
                            </button>
                          )}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mobile-order">
                <div className="left-order">
                  <h5 className="name-order">{statusdetail.customer}</h5>
                  <h5 className="address-order">{statusdetail.address}</h5>
                </div>
                <div>
                  <h5 className="total-order">&#8358;{statusdetail.total}</h5>
                  {statusdetail.status === 0 && (
                    <button className="btn d-flex align-items-center btn-secondary btn-sm">
                      <span className="me-1">Preparing</span>{" "}
                      <i className="bx bx-bowl-hot bx-flashing"></i>
                    </button>
                  )}
                  {statusdetail.status === 1 && (
                    <button className="btn">On the Way</button>
                  )}
                  {statusdetail.status === 2 && (
                    <button className="btn btn-success btn-sm">
                      Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          {status == 2 && (
            <div className="invalid-id">
              !!! Invalid ID, Please re type the Order ID or Contact the
              administrator
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(
    "http://food-project-ruddy.vercel.app/api/orders"
  );
  return {
    props: {
      pizzaList: res.data,
    },
  };
};
export default Status;
