import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../../styles/Admin.module.css";
import Link from "next/link";
import EditButton from "../../components/EditButton";
import Edit from "../../components/Edit";
import Add from "../../components/Add";
import AddButton from "../../components/AddButton";
import appertizer from "../../components/AppetizerCard"





const Index = ({ orders, products, appertizer }) => {
  const [close, setClose1] = useState(true);
  const [close1, setClose] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [query1, setQuery1] = useState("");


  const [appertizerList, setappertizerList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];



  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setappertizerList(appertizerList.filter((appertizer) => appertizer._id !== id));
    } catch (err) {
      console.log(err);
    }

    
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000?q=${query}`);
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);


  console.log(query)
  
  return (
    

    <div>
      
      <div>
        <button className={styles.mainAddButton1} >
          <Link href="/report" passHref >
            <div className={styles.item}>
              Generate Order Report 
            </div>
        </Link>
      </button >
      </div>
      <div>
        {<AddButton setClose={setClose} />} 
        {!close1 && <Add setClose={setClose} />}
      </div>
      
       
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <div className="app">
          <input
            className="search"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            /> 
          </div> 
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {appertizerList.filter((product) =>
          product.title.toLowerCase().includes(query)).map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>Rs {product.prices[0]}</td>
                <td>
                 <div>
                   <button className={styles.button}>
                      <Link href={`/productEdit/${product._id}`} passHref>
                         Edit
                       </Link>
                   </button>
                   <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}>
                      Delete
                  </button>


                 </div>
                  
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
 
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <div className="app">
          <input
            className="search"
            placeholder="Search..."
            onChange={(e) => setQuery1(e.target.value)}
            />
          </div> 
          <table className={styles.table}>
           <tbody>
             <tr className={styles.trTitle}>
                <th>Id</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </tbody>
            {orderList.filter((order) => 
            order.customer.toLowerCase().includes(query1)).map((order) =>(
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>Rs {order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  </div>
  );
};


export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
