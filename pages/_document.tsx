/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/no-danger */
import Document, { Html, Main, Head, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* <!-- Google / Search Engine Tags --> */}
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
