import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import AppertizerFeatured from '../components/AppertizerFeatured';
import AppertizerCard from '../components/AppetizerCard';
import AppetizerList from "../components/AppetizerList"
import styles from '../styles/Home.module.css'
import Add from "../components/Add";
import AddButton from "../components/AddButton";

export default function Home({ appetizerList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Appertizer Plaza</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppertizerFeatured />
      {<AddButton setClose={setClose} />}
      <AppetizerList appetizerList={appetizerList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      appetizerList: res.data,
      admin,
    },
  };
};