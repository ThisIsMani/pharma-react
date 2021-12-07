import {Fragment} from "react";
import ProductNavbar from "../components/ProductNavbar";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import Products from "../components/Products";
import styles from "./ProductsPage.module.css";
import Firebase from "../components/Firebase";
import {collection, getDocs} from "firebase/firestore/lite";

function ProductsPage() {
    let {path, url} = useRouteMatch();
    const [allCards, setAllCards] = useState([]);

    useEffect(() => {
        // fetch(window.$server + '/productDetails')
        //     .then((res) => res.json())
        //     .then(data => {
        //         const tempCards = []
        //         for (let element of data.allProducts) {
        //             tempCards.push(element)
        //         }
        //         setAllCards(tempCards);
        //         console.log(tempCards)
        //     })

        async function getAllProducts() {
            const allProductsCol = collection(Firebase, 'cards');
            const allProductsSnapshot = await getDocs(allProductsCol);
            let newCards = [];
            let topProductsData = allProductsSnapshot.docs.map(doc => doc.data());
            topProductsData.forEach(element => {
                newCards.push(element)
            });
            setAllCards(newCards);
        }
        getAllProducts().catch(err => console.log(err));
    }, [])

    return (
        <Fragment>
            <ProductNavbar url={url}/>
            <div className={"container border my-3 py-3 " + styles["products-container"]}>
                <Switch>
                    <Route exact path={path}>
                        <Redirect to={path + '/all'}/>
                    </Route>
                    <Route path={path + '/:alphabet'}>
                        <Products data={allCards}/>
                    </Route>
                </Switch>
            </div>
        </Fragment>
    )
}

export default ProductsPage;