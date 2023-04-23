import Link from "next/link";

const PizzaCard = ({ pizza,customclass }) => {
  return (
    <div className={customclass ? customclass : "col-md-6 col-lg-3 col-6"}>
      <Link href={`/product/${pizza._id}`} passHref>
        <div className="pizza-container">
          <div className="row align-items-center">
            <div className="col-md-7 col-sm-12 col-12">
              <img src={pizza.img} className="product-img" alt="" />
            </div>
            <div className="col-md-5 col-sm-12 col-12">
              <div className="desc-cont">
                <h1 className="pizza-title">{pizza.title}</h1>
                <p className="pizza-desc">{pizza.desc.substring(0, 15)}...</p>
                <span className="pizza-price">
                  <span>&#8358;{pizza.prices[0]}</span>{" "}
                  <i className="bx bx-plus-medical"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PizzaCard;
