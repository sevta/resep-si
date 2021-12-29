import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress />
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
