import Document, {Html, Head, Main, NextScript} from 'next/document'
import React from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/favicon.png"/>
                    <meta httpEquiv="content-type" content="text/html; charset=utf-8"/>
                    <meta name="author" content="CONFUSED HEROES"/>
                    <meta name="description" content="CONFUSED HEROES"/>
                    <link rel="icon" type="image/png" href="/favicon.png"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <link href="css/plugins.css" rel="stylesheet"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
