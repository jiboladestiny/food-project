import React from "react";

const Modals = ({ proceed, cancel, action, id, price, quantity }) => {
  return (
    <div className="delete-modal">
      <div className="delete-wrapper">
        <img
          src="https://res.cloudinary.com/destiny1233/image/upload/v1672962177/uploads/warning_go3542.png"
          alt=""
          className="warning-img"
        />
        <h5 className="mb-4">Confirm your action?</h5>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-secondary btn-sm me-3"
            onClick={() => {
              cancel();
            }}
          >
            Cancel
          </button>{" "}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              proceed(action,id,price,quantity)
    
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modals;
