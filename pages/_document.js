import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
          <Head>
              <link
                  href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Raleway:300,400,500,600,700,800,900|Montserrat:400,700|Abril+Fatface|Yellowtail&display=swap"
                  rel="stylesheet" type="text/css"/>
          </Head>
        <body className="stretched dark" style={{touchAction: "pan-y"}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
