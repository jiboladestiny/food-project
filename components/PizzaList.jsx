import PizzaCard from "./PizzaCard";
import { useState } from "react";

const PizzaList = ({ pizzaList }) => {
  const tabs = [
    {
      name: "All",
      icon: "bx bxs-star",
    },
    {
      name: "Local",
      icon: "bx bx-bowl-hot",
    },
    {
      name: "internation",
      icon: "bx bxs-pizza",
    },
    {
      name: "Snacks",
      icon: "bx bxs-baguette",
    },
  ];
  const [show, setShow] = useState(0);
  const local = pizzaList.filter((item) => {
    return item.category === "local";
  });

  const International = pizzaList.filter((item) => {
    return item.category === "international";
  });

  const snacks = pizzaList.filter((item) => {
    return item.category === "snacks";
  });

  const tabses = tabs.map((item, i) => (
    <button
      onClick={() => {
        setShow(i);
      }}
      className={i === show ? "btn me-2 active" : "btn me-2"}
      key={item.name}
    >
      <i className={item.icon}></i> {item.name}
    </button>
  ));
  return (
    <div className="containers container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="foodie-wrapper">
            {" "}
            <h4 className="titles mb-3">WELOCME TO FOODIE</h4>
            <p className="descs">
              Choose from ranges of food and dishes below, if you cannot find
              your preffered choice do not panic. Make your direct order for
              your custom dish.
            </p>
          </div>
        </div>
      </div>

      <div className="food-wrapper-container" id="food">
        <div className="food-wrapper">
          <div className="d-flex justify-content-md-center">
            <div className="tab-wrapper">{tabses}</div>
          </div>

          <div className="tab-content-wrapper container">
            {show === 0 && (
              <div className="tab-content">
                <div className="wrappers row gy-5 justify-content-center">
                  {pizzaList.map((pizza) => (
                    <PizzaCard key={pizza._id} pizza={pizza} />
                  ))}
                </div>
              </div>
            )}

            {show === 1 && (
              <div className="tab-content">
                <div className="wrappers row gy-4 justify-content-center">
                  {local.map((pizza) => (
                    <PizzaCard key={pizza._id} pizza={pizza} />
                  ))}
                </div>
              </div>
            )}

            {show === 2 && (
              <div className="tab-content">
                <div className="wrappers row gy-5 justify-content-center">
                  {International.map((pizza) => (
                    <PizzaCard key={pizza._id} pizza={pizza} />
                  ))}
                </div>
              </div>
            )}

            {show === 3 && (
              <div className="tab-content">
                <div className="wrappers row gy-5 justify-content-center">
                  {snacks.map((pizza) => (
                    <PizzaCard key={pizza._id} pizza={pizza} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaList;
