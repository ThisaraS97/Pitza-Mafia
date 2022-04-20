import Image from "next/image";
import styles from "../styles/AppertizerCard.module.css";
import Link from "next/link";

const AppertizerCard = ({ appertizer }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${appertizer._id}`} passHref>
        <Image src={appertizer.img} alt="" width="500" height="500"/>
      </Link>
      <h1 className={styles.title}>{appertizer.title}</h1>
      <span className={styles.prices}>Rs: {appertizer.prices[0]}</span>
      <p className={styles.desc}>{appertizer.desc}
      </p>
   
    </div>
  );
};

export default AppertizerCard;
