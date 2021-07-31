import {useParams} from "react-router-dom";

import styles from './ProductDetails.module.css'
import {useEffect, useState} from "react";
import TopProducts from "../components/TopProducts";

const ProductDetails = () => {
    const params = useParams();
    const id = params.id;
    const [productDetails, setProductDetais] = useState({});

    useEffect(() => {
        fetch(window.$server + '/product/' + id)
            .then((res) => res.json())
            .then(data => {
                setProductDetais(data.productDetails);
            })
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
                            <span className="mrp">&#8377;{' ' + productDetails.mrp}</span>}
                            &#8377;{' ' + productDetails.price + ' / ' + productDetails.weight}
                        </div>
                    </div>
                    <div className="col-lg-7">
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
                                        <th className="product-details-heading">Purity Percentage</th>
                                        <td>
                                            {productDetails.purity}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="product-details-heading">Chemical State</th>
                                        <td>
                                            {productDetails.state}
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
                                        <th className="product-details-heading">Description</th>
                                        <td>
                                            {productDetails.description}
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