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
          ? "navbar fixed-top navbar-expand-lg navbar-light bg-light active"
          : "navbar navbar-expand-lg navbar-light bg-light"
      }
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          Foodie
        </a>

        <ul className="navbar-nav">
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
