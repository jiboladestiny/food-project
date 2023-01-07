import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [direct, setDirect] = useState(false);

  const router = useRouter();
  const pathname = router.pathname;

  const pathtrue =
    pathname === "/" && scroll === true ? "scroll fixed-top" : "";
  const pathfalse =
    pathname === "/" && scroll === false ? "active fixed-top" : "";
  const defaults = pathname !== "/" ? "others" : "";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 300) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  });
  return (
    <nav
      className={`navbar navbar-expand-sm navbar-light bg-light ${defaults} ${pathtrue} ${pathfalse}`}
    >
      <div className="container">
        <Link href="/" passHref>
          <span className="navbar-brand">Foodie</span>
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item me-3 nav-status">
            <Link href="/orders/status" passHref>
              <button className="btn order-status">Order status</button>
            </Link>
          </li>

          <li className="nav-item order-button">
            <button
              className="btn direct-order"
              onClick={() => {
                setDirect(!direct);
              }}
            >
              <i className="bx bxs-phone-call bx-flashing"></i> Direct Order
            </button>

            {direct && (
              <div className="order-toggle">
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link href="https://wa.me/08106203404" passHref>
                      <button className="btn dropdown-item">
                        <i className="bx bxl-whatsapp"></i> Whatsapp
                      </button>
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="tel:08106203404" passHref>
                      <button className="btn dropdown-item">
                        <i className="bx bxs-phone-call"></i> Direct call
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
