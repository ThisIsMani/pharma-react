import {useParams} from "react-router-dom";

import styles from './ProductDetails.module.css'
import {useEffect, useState} from "react";
import TopProducts from "../components/TopProducts";
import Firebase from "../components/Firebase";
import {doc, getDoc} from "firebase/firestore/lite";

const ProductDetails = () => {
    const params = useParams();
    const id = params.id;
    const [productDetails, setProductDetails] = useState({
        mrp: '...',
        price: '...',
        weight: '...',
        cas: 'loading',
        expiry: 'loading',
        description: 'loading',
        purity: '..',
        available: 'loading',
        city: 'loading',
        chemName: 'loading',
    });

    useEffect(() => {
        // fetch(window.$server + '/productDetails/' + id)
        //     .then((res) => res.json())
        //     .then(data => {
        //         setProductDetais(data.productDetails);
        //     })

        async function getAllProducts() {
            const productDetailsCol = doc(Firebase, 'cards', id);
            const productDetails = await getDoc(productDetailsCol);
            setProductDetails(productDetails.data());
        }
        getAllProducts().catch(err => console.log(err));
    }, [id])

    return (
        <div>
            <div className={"container " + styles['product-details-container']}>
                <div className={`row ${styles["product-image-big"]}`}>
                    <div className="col-lg-5">
                        <img className={"col-12 " + styles["display-img"]} src={productDetails.image} alt="product"/>
                        <div className={styles["details-price"] + " text-center m-3"}>
                            <span>Price: </span>
                            {productDetails.discount !== '0' &&
                            <span className={styles.mrp}>&#8377;{productDetails.mrp}</span>}
                            {" "} &#8377;{productDetails.price + ' / ' + productDetails.weight}
                        </div>
                    </div>
                    <div className={"col-lg-7 " + styles["product-details-text"]}>
                        <h1 className={styles["product-title"] + " m-1 pb-2"}>
                            {productDetails.title}
                        </h1>
                        <div className={"p-2 " + styles["table-div"]}>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th className="product-details-heading col-3">CAS Number</th>
                                        <td>
                                            {productDetails.cas}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="product-details-heading">Expiry Date</th>
                                        <td className="expiry">
                                            {(productDetails.expiry) && productDetails.expiry.replace(/^(\d{1,2})-(\d{1,2})-(\d{4})$/, "$3-$2-$1")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="product-details-heading">Purity</th>
                                        <td>
                                            {productDetails.purity}%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="product-details-heading">Description</th>
                                        <td>
                                            {productDetails.description}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="product-details-heading">Available Quantity</th>
                                        <td>
                                            {productDetails.available}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="product-details-heading">Country</th>
                                        <td>India</td>
                                    </tr>
                                    <tr>
                                        <th className="product-details-heading">City</th>
                                        <td>
                                            {productDetails.city}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="product-details-heading">Chemical Name</th>
                                        <td>
                                            {productDetails.chemName}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <TopProducts/>
        </div>
    )
}

export default ProductDetails;