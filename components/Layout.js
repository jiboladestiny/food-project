import Footer from "./Footer";
import Navbar from "./Navbar";
import Tab from "./Tab";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Tab/>
      <Footer />
    </>
  );
};

export default Layout;
