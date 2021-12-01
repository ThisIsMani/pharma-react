import styles from "./AboutPage.module.css";

const AboutPage = () => {
    return (
        <div className={styles["main-container"] + " container"}>
            <h1>About</h1>
            <p>
                We specialize in the manufacturing and exportation of pharmaceutical impurity reference substances and
                we have more than ten years' experience in this field. We have more than 3000 impurities now. We hope you
                can visit our website for details of each product.
            </p>
            <p>
                Please let us have your specific enquiry if you are interested in any of our products. We shall
                make quotations promptly.
            </p>
        </div>
    );
};

export default AboutPage;