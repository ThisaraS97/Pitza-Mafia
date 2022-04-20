import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <img src="/img/bg.jpg" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
          Hand-Breaded, Freshly Prepared & Finger Lickin’ Good! A Taste You Can Trust!          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR Food Corners</h1>
          <p className={styles.text}>
            No 66/A,
            <br /> Malabe, Colombo
            <br /> +9411 225 5555
          </p>
          <p className={styles.text}>
            No 65/B,
            <br /> New Kandy Road, Delgoda
            <br /> +9411 225 4444
          </p>
          <p className={styles.text}>
            No 100
            <br /> Kandy Road, Gampaha
            <br /> +9433 223 2222
          </p>
          <p className={styles.text}>
            No 105,
            <br /> New Kandy Road, Weliweriya
            <br /> +0433 223 5444
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
