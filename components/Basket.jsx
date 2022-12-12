import React from 'react'
import { useSelector } from "react-redux";
import Link from "next/link";
const Basket = () => {
   const quantity = useSelector((state) => state.cart.quantity);
  return (
    <Link href="/cart" passHref>
      <div className="basket">
        <i className="bx bxs-basket"></i>
        <div className="number">{quantity}</div>
      </div>
    </Link>
  );
}

export default Basket
