import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  const router = useRouter();
  const pathname = router.pathname

  console.log(pathname)
  return (
    <nav
      className={
        pathname === "/"
          ? "navbar fixed-top navbar-expand-sm navbar-light bg-light active"
          : "navbar navbar-expand-sm navbar-light bg-light others"
      }
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          Foodie
        </a>

        <ul className="navbar-nav">
          <li className="nav-item me-3 nav-status">
            <Link href="/orders/status" passHref>
              <button className="btn order-status">Order status</button>
            </Link>
          </li>

          <li className="nav-item">
            <button className="btn direct-order">
              <i className="bx bxs-phone-call bx-flashing"></i> Direct Order
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
