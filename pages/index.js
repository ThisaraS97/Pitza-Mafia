import axios from 'axios';
import AppertizerFeatured from '../components/AppertizerFeatured';
import AppetizerList from "../components/AppetizerList";

export default function Home({ appetizerList, admin }) {
  return (
    <div>
      <AppertizerFeatured />
      <AppetizerList appetizerList={appetizerList} />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || {};
  let admin = false;

  if (myCookie.token && myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  try {
    const res = await axios.get("http://localhost:3000/api/products");
    return {
      props: {
        appetizerList: res.data,
        admin,
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: {
        appetizerList: [],
        admin,
      },
    };
  }
};
