import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles["page-footer"]}>
            <div className={"container " + styles['footer-container']}>
                <div className="row billAndMail justify-content-evenly">
                    <div className={styles.itemsbm + " col-12 col-md-6"}>
                        <h3 className={styles["footer-titles"]}><span>Mailing Address</span></h3>
                        <p>Innovative Chemical Interchange Pvt. Ltd.</p>
                        <p>No. 101, Sai Vaishnavi Residency</p>
                        <p>Sardar Patel Nagar, Kukatpally</p>
                        <p>Hyderabad – 500072</p>
                        <p>Telangana. India</p>
                        <p>CIN - U52190TG2015PTC099905</p>
                    </div>
                    <div className={styles.itemsbm + " col-12 col-md-6"}>
                        <h3 className={styles["footer-titles"]}><span>Registered Office Address</span></h3>
                        <p>Innovative Chemical Interchange Pvt. Ltd.</p>
                        <p>No. 101, Sai Vaishnavi Residency</p>
                        <p>Sardar Patel Nagar, Kukatpally</p>
                        <p>Hyderabad – 500072</p>
                        <p>Telangana. India</p>
                        <p>GST - 36AADCI8853P1C3</p>
                    </div>
                </div>
            </div>
            <hr/>
            <p className="end text-center">All rights reserved.Developed By *****</p>
        </footer>
    )
}

export default Footer;