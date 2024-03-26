import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Meetups Demo</title>
        <meta description='Find and join public meetups near you! Explore detailed event information, discover new opportunities, and create your own meetups. Start connecting with like-minded individuals today!' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
