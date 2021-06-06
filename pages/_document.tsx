import Document, { Html, Main, Head, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
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
