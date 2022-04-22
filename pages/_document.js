import Document, {Html, Head, Main, NextScript} from 'next/document'
import React from "react";

const title = "MINT CONFUSED HEROES"

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html>
                <Head>
                    <title>{title}</title>
                    <link rel="shortcut icon" href="/favicon.png"/>
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
