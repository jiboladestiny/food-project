import { useState } from "react";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const OrderDetail = ({ total, createOrder, closeOrder, product, spinner }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mail, setMail] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });

    fetch("/api/sendEmail", {
      method: "POST",
      body: JSON.stringify({ customer, address, telephone, product, mail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to send email");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

 const closeClick = () => {
   closeOrder();
 };
 const handleEmailBlur = () => {
   if (mail && !isValidEmail(mail)) {
     setError("Please enter a valid email address.");
   } else {
     setError("");
   }
 };
  return (
    <div className="order-container">
      <div className="order-wrapper">
        <span className="cancel-btn" onClick={closeClick}>
          <i className="bx bx-x"></i>
        </span>

        <h2 className="order-title">Order details</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="order-item">
          <label className="order-label">Name</label>
          <input
            placeholder="Destiny"
            type="text"
            className="order-input form-control"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
        </div>
        <div className="order-item">
          <label className="order-label">Email:</label>
          <input
            type="Email"
            placeholder="johndoe"
            className="order-input form-control"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            onBlur={handleEmailBlur}
            required
          />
          {error && <div className="error">{error}</div>}
        </div>
        <div className="order-item">
          <label className="order-label">Telephone No:</label>
          <input
            type="telephone"
            placeholder="+2344333234234"
            className="order-input form-control"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
        </div>
        <div className="order-item">
          <label className="order-label">Address</label>
          <textarea
            rows={5}
            placeholder="No 44, Elon musk street"
            type="text"
            value={address}
            className="order-textarea form-control"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button
          className="btn btn-success"
          onClick={handleClick}
          disabled={
            customer.length < 4 || telephone.length < 6 || address.length < 8
          }
        >
          {spinner && (
            <div
              className="spinner-border me-1 text-light spinner-border-sm"
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
