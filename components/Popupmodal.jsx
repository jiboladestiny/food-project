
const Popupmodal = ({children,cancelbtn, show, width,padding,closeModal }) => {
return (
  <>
    {show && (
      <div className="popup-modal">
        <div
          className="popup-wrapper"
          style={{ width: width, padding: padding }}
        >
          {cancelbtn && (
            <span
              className="cancel-btn"
              onClick={() => {
                closeModal();
              }}
            >
              <i className="bx bx-x"></i>
            </span>
          )}
          {children}
        </div>
      </div>
    )}
  </>
);
};

export default Popupmodal
