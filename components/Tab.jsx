import React from 'react'
import { useRouter } from "next/router";
import Link from "next/link";

const Tab = () => {
     const router = useRouter();
  return (
    <div className="mobile-tab">
      <Link href="/" passHref>
        <button
          className={
            router.pathname == "/" ? "active btn btn-sm" : "btn btn-sm"
          }
        >
          <i className="bx bx-home"></i> Home
        </button>
      </Link>

      <Link href="/orders/status" passHref>
        <button
          className={
            router.pathname == "/orders/status"
              ? "active btn btn-sm"
              : "btn btn-sm"
          }
        >
          <i className="bx bxs-bowl-hot"></i> Track order
        </button>
      </Link>

      <Link href="/cart" passHref>
        <button
          className={
            router.pathname == "/cart" ? "active btn btn-sm" : "btn btn-sm"
          }
        >
          <i className="bx bxs-basket"></i> Basket
        </button>
      </Link>
    </div>
  );
}

export default Tab