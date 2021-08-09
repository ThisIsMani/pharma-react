import {Fragment, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import CardComponent from "../components/CardComponent";

import styles from './SearchPage.module.css'

const SearchPage = () => {
    const {search} = useLocation();
    const [cards, setCards] = useState([]);
    const searchParams = new URLSearchParams(search);

    useEffect(() => {
        fetch(window.$server + `/search/${search}`)
            .then(res => res.json())
            .then(data => {
                let newCards = [];
                for (let element of data.searchResults) {
                    newCards.push(<CardComponent key={element.id} className={'searchCard'} data={element}/>)
                }
                setCards(newCards)
            })
    }, [search])

    return (
        <Fragment>
            <div className="container border my-3">
                <h3 className={styles.searchResultsText}>{cards.length === 0 ? 'No' : 'Search'} results for
                    <span className={styles.searchQueryHeading}>{' ' + searchParams.get('q')}</span>
                </h3>
                <div className={`${styles.cardResults} container flex-wrap`}>
                    {cards}
                </div>
            </div>
        </Fragment>
    )
}

export default SearchPage;