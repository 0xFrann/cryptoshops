import type { AppProps /*, AppContext */ } from "next/app";
import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import AppContext, { ILocation } from "../context/AppContext";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const [location, setLocation] = useState<ILocation>(null);

  useEffect(() => {
    const localStorageLocation = JSON.parse(localStorage.getItem("location"));

    if (localStorageLocation) {
      setLocation({
        location: {
          address: localStorageLocation.address,
          latLng: {
            lat: localStorageLocation.latLng.lat,
            lng: localStorageLocation.latLng.lng,
          },
          setLocation: setLocation,
        },
      });
    }
  }, []);

  return (
    <AppContext.Provider value={location}>
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
