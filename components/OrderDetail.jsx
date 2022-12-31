import { useState } from "react";

const OrderDetail = ({ total, createOrder, closeOrder,spinner }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };

  const closeClick = () => {
    closeOrder();
  };

  return (
    <div className="order-container">
      <div className="order-wrapper">
        <span className="cancel-btn" onClick={closeClick}>
          <i className="bx bx-x"></i>
        </span>

        <h2 className="order-title">Order details</h2>
        <div className="order-item">
          <label className="order-label">Name</label>
          <input
            placeholder="Destiny"
            type="text"
            className="order-input form-control"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="order-item">
          <label className="order-label">Telephone No:</label>
          <input
            type="text"
            placeholder="+234 873 455"
            className="order-input form-control"
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div className="order-item">
          <label className="order-label">Address</label>
          <textarea
            rows={5}
            placeholder="No 44, Elon musk street"
            type="text"
            className="order-textarea form-control"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className="btn btn-success"
          onClick={handleClick}
          disabled={customer === "" && address === "" && telephone === ""}
        >
          {spinner && (
            <div
              className="spinner-border text-light spinner-border-sm"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          Proceed
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
