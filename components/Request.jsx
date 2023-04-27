import React, { useState } from "react";
import Popupmodal from "./Popupmodal";

const Request = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [foodNameError, setFoodNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(false);
  const cancel=true

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError || foodNameError || descriptionError || availabilityError) {
      // Don't submit the form if any of the fields have errors
      return;
    } else {
      // handle form submission here
      alert("form submitted succesfully");
    }
  };

  return (
    <div className="row justify-content-center request-wrapper">
      <div className="col-lg-6 col-10">
        <Popupmodal show={modalVisible} closeModal={closeModal} width="30rem" padding="1.5rem" cancelbtn={cancel}>
          <div className="orders-input">
            <h4 className="mb-3">Request Form</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-wrapper">
                <div className="order-item">
                  <label className="order-label">Email:</label>
                  <input
                    type="email"
                    placeholder="E.g jaybee@gmail.com"
                    className={`order-input form-control ${
                      emailError ? "is-invalid" : ""
                    }`}
                    required
                    onBlur={() => {
                      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      setEmailError(!regex.test(email));
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <div className="invalid-feedback">
                      Please enter a valid email address
                    </div>
                  )}
                </div>
                <div className="order-item">
                  <label className="order-label">Food Name:</label>
                  <input
                    type="text"
                    placeholder="E.g Chicken wing"
                    className={`order-input form-control ${
                      foodNameError ? "is-invalid" : ""
                    }`}
                    required
                    onBlur={() => {
                      setFoodNameError(foodName.length < 3);
                    }}
                    onChange={(e) => setFoodName(e.target.value)}
                  />
                  {foodNameError && (
                    <div className="invalid-feedback">
                      Please enter a food name with at least 3 characters
                    </div>
                  )}
                </div>
                <div className="order-item">
                  <label className="order-label">Description:</label>
                  <textarea
                    type="text"
                    placeholder=""
                    className={`order-input form-control ${
                      descriptionError ? "is-invalid" : ""
                    }`}
                    required
                    onBlur={() => {
                      setDescriptionError(description.length < 8);
                    }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {descriptionError && (
                    <div className="invalid-feedback">
                      Please enter a description with at least 10 characters
                    </div>
                  )}
                </div>
                <div className="order-item">
                  <label className="order-label">Expected availability:</label>
                  <select
                    className={`form-select ${
                      availabilityError ? "is-invalid" : ""
                    }`}
                    aria-label="Default select example"
                    onBlur={() => {
                      setAvailabilityError(availability === "");
                    }}
                    value={availability}
                    onChange={(e) => {
                      setAvailability(e.target.value);
                    }}
                    required
                  >
                    <option value="">None</option>
                    <option value="24 hours">24 hours</option>
                    <option value="within a week">within a week</option>
                    <option value="less than a month">less than a month</option>
                  </select>
                  {availabilityError && (
                    <div className="invalid-feedback">
                      Please select an availability option
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                {" "}
                <button
                  type="submit"
                  className="btn btn-dark"
                  onClick={handleSubmit}
                >
                  <div className="d-flex align-items-center">
                    Submit <i className="bx ms-1 bxs-chevrons-right"></i>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </Popupmodal>
        <div className="request text-center">
          <p>
            If you cannot find your desired diet option, there is no need to
            worry. Simply request it, and our team will promptly respond by
            adding it to the list.
          </p>
          <button
            className="btn btn-dark"
            onClick={() => setModalVisible(true)}
          >
            <div className="d-flex align-items-center">
              <span className="me-1">Request </span>
              <i className="bx bxs-right-arrow-circle bx-flashing"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Request;
