import {Fragment} from "react";
import ProductNavbar from "../components/ProductNavbar";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import Products from "../components/Products";
import styles from "./ProductsPage.module.css";

function ProductsPage() {
    let {path, url} = useRouteMatch();
    const [allCards, setAllCards] = useState([]);

    useEffect(() => {
        fetch(window.$server + '/productDetails')
            .then((res) => res.json())
            .then(data => {
                const tempCards = []
                for (let element of data.allProducts) {
                    tempCards.push(element)
                }
                setAllCards(tempCards);
                console.log(tempCards)
            })
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