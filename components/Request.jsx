import React, { useState } from "react";
import Popupmodal from "./Popupmodal";
import { ToastContainer, toast } from "react-toastify";

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
  const [spinner, setSpinner] = useState(false);

  const cancel = true;

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let emailErr = false;
    let foodNameErr = false;
    let descriptionErr = false;
    let availabilityErr = false;

    if (!email) {
      setEmailError(true);
      emailErr = true;
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!regex.test(email));
      emailErr = !regex.test(email);
    }

    if (!foodName || foodName.length < 3) {
      setFoodNameError(true);
      foodNameErr = true;
    } else {
      setFoodNameError(false);
      foodNameErr = false;
    }

    if (!description || description.length < 10) {
      setDescriptionError(true);
      descriptionErr = true;
    } else {
      setDescriptionError(false);
      descriptionErr = false;
    }

    if (!availability) {
      setAvailabilityError(true);
      availabilityErr = true;
    } else {
      setAvailabilityError(false);
      availabilityErr = false;
    }

    if (!emailErr && !foodNameErr && !descriptionErr && !availabilityErr) {
      setSpinner(true);

      fetch("/api/request", {
        method: "POST",
        body: JSON.stringify({ email, foodName, description, availability }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Request delivered successfully");
            closeModal();
            setSpinner(false);
            return response.json();
          } else {
            throw new Error("Failed to send email");
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          setSpinner(false);
          console.error(error);
        });
    }
  };

  return (
    <div className="row justify-content-center request-wrapper">
      <ToastContainer autoClose={1000} />

      <div className="col-lg-6 col-10">
        <Popupmodal
          show={modalVisible}
          closeModal={closeModal}
          width="30rem"
          padding="1.5rem"
          cancelbtn={cancel}
        >
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
                  disabled={spinner}
                >
                  <div className="d-flex align-items-center">
                    Submit{" "}
                    {!spinner && <i className="bx ms-1 bxs-chevrons-right"></i>}
                    {spinner && (
                      <div
                        className="spinner-border ms-1 text-light spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
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
