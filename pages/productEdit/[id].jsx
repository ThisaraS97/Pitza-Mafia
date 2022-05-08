import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const appertizerEdit = ({ appertizer }) => {
  const [appertizerList, setappertizerList] = useState(appertizer);
  const title = ["applertizer.title"];

  const handleStatus = async (id) => {
    const item = setappertizerList.filter((appertizer) => appertizer._id === id)[0];
    const currentStatus = item.title;

    

    try {
      const res = await axios.put("http://localhost:3000/api/products/" + id, {
        title: currentStatus,
      });
      setappertizerList([
        res.data,
        ...appertizerList.filter((appertizer) => appertizer._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <div className={styles.container1}>
      <div className={styles.wrapper1}>
      
        <h1>Edit</h1>
       
        <div className={styles.item}>
          
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Product ID</label>
          
          <input
            className={styles.input}
            type="read-only"
            onChange={(e) => setTitle(e.target.value)}
            value={appertizer._id}
          />
        </div>
        
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={appertizer.title}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            value={appertizer.desc}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
              value={appertizer.prices[0]}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
              value={appertizer.prices[1]}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
              value={appertizer.prices[2]}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
            />
            <button onClick={() => handleStatus(appertizer._id)}>
                   update
                  </button>
          </div>
          
          </div>
        </div>
       
      </div>
      </div>
   
    
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      appertizer: res.data,
    },
  };
};

export default appertizerEdit;
