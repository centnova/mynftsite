import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import useWhitelist from "../lib/useWhitelist"

const title = "Confused Heroes";
const description = "Confused Heroes Site"

const Home = props => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>----=== UNDER CONSTRUCTION ===----</h1>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

Home.getInitialProps = async ({req, res}) => {
    const ipData = useWhitelist(req, res)
    return ipData
}

export default Home
