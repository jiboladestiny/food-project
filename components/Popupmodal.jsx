
import { useState } from 'react'


const Popupmodal = ({ pizzaList }) => {
  const [show, setShow] = useState(true);

  const closeClick = () => {
    // setShow(false);
    console.log(pizzaList)
  };
  return (
    <>
      {show && (
        <div className="delete-modal">
          <div className="delete-wrapper">
            <span className="cancel-btn" onClick={closeClick}>
              {" "}
              <i className="bx bx-x"></i>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Popupmodal
