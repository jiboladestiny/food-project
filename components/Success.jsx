import { useState } from "react";
import Link from "next/link";
const Success = ({ id }) => {
  const [copy, setCopy] = useState(false);
  const text = "63652418cdabb18ca99b0665";

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
            <button className="btn btn-sm btn-secondary me-2">Home page</button>
          </Link>
          <Link href="/orders/status" passHref>
            <button className="btn btn-sm btn-success">Track Order</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
