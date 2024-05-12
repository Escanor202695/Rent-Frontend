import "../public/assets/scss/app.scss";
import Head from "next/head";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import TapToTop from "../layout/TapToTop";
import Customizer from "../layout/Customizer";
import { store } from "../redux-toolkit/store";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import StoreOldData from "../utils/StoreOldData";
import "react-toastify/dist/ReactToastify.css";
import { ConfigDB } from "../config/themeCustomizerConfig";
import "bootstrap/dist/css/bootstrap.min.css";


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      document.documentElement.style.setProperty(
        "--theme-default",
        ConfigDB.PrimaryColor ? ConfigDB.PrimaryColor : "#01B060"
      );
      document.documentElement.style.setProperty(
        "--theme-default2",
        ConfigDB.SecondaryColor ? ConfigDB.SecondaryColor : "#01B060"
      );
    });
    document.documentElement.style.setProperty(
      "--theme-default",
      ConfigDB.PrimaryColor ? ConfigDB.PrimaryColor : "#01B060"
    );
    document.documentElement.style.setProperty(
      "--theme-default2",
      ConfigDB.SecondaryColor ? ConfigDB.SecondaryColor : "#01B060"
    );
  }, [router.events]);

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="ashol-property"
        />
        <meta name="keywords" content="ashol-property" />
        <meta name="author" content="ashol-property" />
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/x-icon"
        />
        <title>Ashol Property</title>
      </Head>
      <Provider store={store}>
        <>
          <Component {...pageProps} key={router.asPath}/>
         
          <TapToTop />
          <StoreOldData />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={"light"}
          />
        </>
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp);
