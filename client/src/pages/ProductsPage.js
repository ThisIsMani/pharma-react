import {Fragment} from "react";
import ProductNavbar from "../components/ProductNavbar";
import {Redirect, Route, Switch, useParams, useRouteMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import Products from "../components/Products";


function ProductsPage() {
    let {path, url} = useRouteMatch();
    const [allCards, setAllCards] = useState([]);

    useEffect(() => {
        fetch(window.$server + '/products')
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

    // let routes = [];
    // for (let ch = 97; ch <= 122; ch++) {
    //     routes.push(
    //         <Route path={path + '/' + String.fromCharCode(ch)} key={String.fromCharCode(ch)}>
    //             <Products data={getData(String.fromCharCode(ch), allCards)}/>
    //         </Route>
    //     )
    // }
    // console.log(routes)
    const params = useParams();
    return (
        <Fragment>
            <ProductNavbar url={url}/>
            <div className="container border my-3">
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