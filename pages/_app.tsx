import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import "tailwindcss/tailwind.css";
import AppContext, { useInitializeContextHook } from "../context/AppContext";
import "../styles/globals.css";

const defaultLocation = {
  address: "Córdoba, Argentina",
  latLng: {
    lat: -31.4173391,
    lng: -64.183319,
  },
};

const defaultCategories = {
  list: [],
  selected: "",
};

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const { location, categories } = useInitializeContextHook(defaultLocation, defaultCategories);

  return (
    <AppContext.Provider value={{ location: { ...location }, categories: { ...categories } }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
