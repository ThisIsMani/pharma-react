import {Fragment} from "react";
import CardComponent from "./CardComponent";
import {useParams} from "react-router-dom";

function getData(alphabet, allCards) {
    if (alphabet === 'all') {
        return allCards
    }
    console.log(alphabet)
    let elementArray = [];
    for (let element of allCards) {
        if (element.titleLower.charAt(0) === alphabet || element.casLower.charAt(0) === alphabet) {
            elementArray.push(element);
        }
    }
    return elementArray;
}

function Products(props) {
    const cards = []
    const params = useParams();
    for (let element of getData(params.alphabet, props.data)) {
        cards.push(<CardComponent key={element.id} className={'searchCard'} data={element}/>)
    }
    return (
        <Fragment>
            <div className={'container d-flex flex-wrap'}>
                {cards.length !== 0 ? cards : <h2>No Cards</h2>}
            </div>
        </Fragment>
    )
}

export default Products;