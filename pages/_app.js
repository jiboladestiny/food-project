import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/PizzaList.css"
import "../styles/PizzaCard.css";
import "../styles/Featured.css";
import "../styles/Navbar.css";
import "../styles/Footer.css";
import "../styles/Basket.css";
import "../styles/Product.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
