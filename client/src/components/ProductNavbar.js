import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import styles from './ProductNavbar.module.css';


function ProductNavbar(props) {
    let navBar = [];
    navBar.push(
        <NavLink to={`${props.url}/all`} activeClassName={styles.active}
                 className={styles['nav-link'] + ' text-center m-1 col-1'}
                 key={'all'}>
            {'ALL'}
        </NavLink>
    )
    for (let ch = 48; ch <= 57; ch++) {
        navBar.push(
            <NavLink to={`/products/${String.fromCharCode(ch)}`} activeClassName={styles.active}
                     className={styles['nav-link'] + ' text-center m-1 col-1'}
                     key={String.fromCharCode(ch)}>
                {String.fromCharCode(ch).toUpperCase()}
            </NavLink>
        )
    }
    for (let ch = 97; ch <= 122; ch++) {
        navBar.push(
            <NavLink to={`/products/${String.fromCharCode(ch)}`} activeClassName={styles.active}
                     className={styles['nav-link'] + ' text-center m-1 col-1'}
                     key={String.fromCharCode(ch)}>
                {String.fromCharCode(ch).toUpperCase()}
            </NavLink>
        )
    }
    return (
        <Fragment>
            <div className={"container flex-nowrap " + styles["nav-link-container"]}>
                {navBar}
            </div>
        </Fragment>
    )
}

export default ProductNavbar;