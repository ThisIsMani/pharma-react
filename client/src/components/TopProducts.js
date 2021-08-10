import {Swiper, SwiperSlide} from 'swiper/react';

import styles from './TopProducts.module.css'

import 'swiper/swiper-bundle.css';
import CardComponent from "./CardComponent";
import {Fragment, useEffect, useState} from "react";
import SwiperCore, {Navigation} from "swiper";
import {Link} from "react-router-dom";


SwiperCore.use(Navigation)

const TopProducts = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        fetch(window.$server + '/topProducts')
            .then((res) => res.json())
            .then(data => {
                let newCards = [];
                for (let element of data.topProducts) {
                     newCards.push(
                        <SwiperSlide key={element['id']}>
                            <CardComponent className={'swiper-slide'} data={element}/>
                        </SwiperSlide>)
                }
                setCards(newCards)
            })
    }, [])

    console.log(cards)

    return (
        <Fragment>
            <div className={`container border my-3 ${styles.belowNav} ${styles.productsBar}`}>
                <h2 className={"d-flex " + styles['top-products-text']}>Top Products
                    <Link to="/products">
                        <button className={"btn f-flex " + styles.seeMoreBtn}>See More</button>
                    </Link>
                </h2>
                <div className={styles['swiper-father']}>
                    <Swiper className={styles['swiper-container']}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                    speed: 150,
                                },
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                    slidesPerGroup: 2,
                                    speed: 300,
                                },
                                992: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                    slidesPerGroup: 3,
                                    speed: 450,
                                },
                                1200: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                    slidesPerGroup: 4,
                                    speed: 600,
                                },
                            }}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            }}
                    >
                        {cards}
                    </Swiper>
                    <div className={"swiper-button-prev " + styles["swiper-button-prev"]}/>
                    <div className={"swiper-button-next " + styles["swiper-button-next"]}/>
                </div>
            </div>
        </Fragment>
    )
}

export default TopProducts;