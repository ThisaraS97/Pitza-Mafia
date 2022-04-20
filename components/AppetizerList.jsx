import styles from "../styles/AppetizerList.module.css";
import AppetizerCard from "../components/AppetizerCard"

const AppetizerList = ({appetizerList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enjoy savory food and great savings with our discounted items.</h1>
      <p className={styles.desc}>
        We offer the hand-crafted Gourmet Frozen Appetizers featured at resorts & hotels. Checkout our variety of Hors d’Oeurvres, Cocktail Appetizers and Gourmet Appetizers & Finger foods perfect for all parties. Ideal for caterers & event organizers
      </p>
      <div className={styles.wrapper}>
        {appetizerList.map((appertizer) =>  (
          <AppetizerCard key={appertizer._id} appertizer={appertizer}/>
        ))  }         
      </div>
    </div>
  );
};

export default AppetizerList;
