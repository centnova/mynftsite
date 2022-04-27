import '../styles/globals.css'
import Head from 'next/head'
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
      <>
      <Head>
        <title>MINT CONFUSED HEROES</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}


export default MyApp
