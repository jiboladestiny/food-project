import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const Success = ({ id, resetOrder }) => {
  const [copy, setCopy] = useState(false);
  const router = useRouter();
  const homePage = () => {
    router.push("/");
    resetOrder();
    
  };

  const trackPage = () => {
    router.push("/orders/status");
    resetOrder();
    
  };

// testing this commet

  return (
    <div className="successs">
      <div className="success-wrapper">

        <h5 className="successs-title">Order proccessed successfully</h5>

        <p className="text-center">Copy the ID below to track your order</p>

        <p className="text-center">
          <span className="order-id">Order ID:</span>{" "}
          <span className="order-code">
            {id.substring(0, 10)}...{" "}
            <i
              className="bx copy bx-copy"
              onClick={() => {
                navigator.clipboard.writeText(id);
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 1000);
              }}
            >
              {copy && <span className="tooltiptext">Copied</span>}
            </i>
          </span>
        </p>

        <div className="button-cont d-flex justify-content-center">
          <Link href="/" passHref>
            <button
              className="btn btn-sm btn-secondary me-2"
              onClick={homePage}
            >
              Home page
            </button>
          </Link>
          <Link href="/orders/status" passHref>
            <button className="btn btn-sm btn-success" onClick={trackPage}>
              Track Order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
