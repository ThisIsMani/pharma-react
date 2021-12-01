import styles from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles["page-footer"]}>
            <div className={"container " + styles['footer-container']}>
                <div className="row billAndMail justify-content-evenly">
                    <div className={styles.itemsbm + " col-12 col-md-6"}>
                        <h3 className={styles["footer-titles"]}><span>Lab Address</span></h3>
                        <p>Plot no. 36/1</p>
                        <p>T.I.E. Balanagar</p>
                        <p>Hyderabad – 500072</p>
                        <p>Telangana. India</p>
                        <h3 className={styles["footer-titles"]}><span>Contact Us</span></h3>
                        <p><a href={"mailto: info.rvspharma@gmail.com"}>info.rvspharma@gmail.com</a></p>
                        <p><a href={"tel: +918074023855"}>+91 8074023855</a></p>
                        <p><a href={"tel: 040-35954545"}>040-35954545</a></p>
                    </div>
                    <div className={styles.itemsbm + " col-12 col-md-6"}>
                        <h3 className={styles["footer-titles"]}><span>Office Address</span></h3>
                        <p>Flat no. 401A, Block A</p>
                        <p>Sri Sai Krupa Apartments</p>
                        <p>Ramakrishna Nagar, Madinaguda</p>
                        <p>Miyapur</p>
                        <p>Hyderabad – 500049</p>
                        <p>Telangana. India</p>
                    </div>
                </div>
            </div>
            <hr/>
            <p className="end text-center">All rights reserved. Developed By RVS Pharma.</p>
        </footer>
    )
}

export default Footer;