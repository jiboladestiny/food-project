
import { useState } from 'react'
import PizzaCard from './PizzaCard';


const Popupmodal = ({ pizzaList, show, onCloseModal }) => {

  const closeClick = () => {
    onCloseModal(); 
  };

  return (
    <>
      {show && (
        <div className="delete-modal">
          <div className="popup-wrapper">
            <div className="row gx-4">
              {pizzaList.map((pizza) => (
                <PizzaCard customclass="col-6" key={pizza._id} pizza={pizza} />
              ))}
            </div>
            <p className="modal-p">
              Try this freshly prepared food if you have not found anything you
              like yet.
            </p>
            <button onClick={closeClick} className="btn btn-dark">
              Continue ordering
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popupmodal
