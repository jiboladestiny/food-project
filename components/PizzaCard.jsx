
import Link from "next/link";

const PizzaCard = ({ pizza }) => {
  return (
    <div className="col-md-6 col-lg-3 col-6">
      <div className="pizza-container">
        <div className="row align-items-center">
          <div className="col-md-7 col-sm-12 col-12">
            <Link href={`/product/${pizza._id}`} passHref>
              <img src={pizza.img} className="product-img" alt="" />
            </Link>
          </div>
          <div className="col-md-5 col-sm-12 col-12">
            <div className="desc-cont">
              <h1 className="pizza-title">{pizza.title}</h1>
              <p className="pizza-desc">{pizza.desc}</p>
              <span className="pizza-price">
                <span> ${pizza.prices[0]}.00</span>{" "}
                <i className="bx bx-plus-medical"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
