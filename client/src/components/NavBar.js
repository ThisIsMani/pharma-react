import styles from './NavBar.module.css';
import {Navbar} from 'react-bootstrap';
import logo from '../images/RVSlogo.svg'
import {Link, NavLink, useHistory} from 'react-router-dom'
import {useRef} from "react";


let searchFormRef;
let history;

function searchHandler(event) {
    event.preventDefault();
    history.push(`/search/?q=${searchFormRef.current.value}`)
    searchFormRef.current.value='';
}

function NavBarMain() {
    searchFormRef = useRef();
    history = useHistory();

    return (
        <Navbar className={"navbar navbar-light navbar-expand-md fixed-top py-0 " + styles["navbar-container"]}>
            <div className="container-fluid row px-0 flex-wrap g-0 justify-content-start justify-content-md-center"
                 id="navBar">
                {/*<button className="navbar-toggler navbar-dark col-1 px-0 m-3" type="button" data-bs-toggle="collapse"*/}
                {/*        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"*/}
                {/*        aria-label="Toggle navigation">*/}
                {/*    <span className="navbar-toggler-icon"></span>*/}
                {/*</button>*/}

                <Link className="navbar-brand col-4 col-md-4 col-xl-2 col-xxl-2 m-0" to="/home">
                    <img src={logo} className={styles['topLogo'] + " img-fluid"} alt="logo"/>
                </Link>

                <div className="navbar-nav col-10 col-md-7 col-xl-4 col-xxl-5 mx-4 searchBarNav">
                    <form className="input-group" onSubmit={searchHandler}>
                        <input type="search" className="form-control" name="q" ref={searchFormRef} placeholder="Search" id="tempForLabel"/>
                        <button className="btn btn-outline-light" id={styles["searchBtn"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </button>
                    </form>
                </div>

                <ul className="navbar-nav col-md-10 col-xl-5 col-xxl-4 my-2 d-none d-md-flex ps-0 px-xl-5 justify-content-around">
                    <li className={styles['nav-item']}>
                        <NavLink to="/home" activeClassName={styles.active} className={styles['nav-link'] + ' px-3'}>Home</NavLink>
                    </li>
                    <li className={styles['nav-item']}>
                        <NavLink to="/products" activeClassName={styles.active} className={styles['nav-link'] + ' px-3'}>Our Products</NavLink>
                    </li>
                    <li className={styles['nav-item']}>
                        <NavLink to="/about" activeClassName={styles.active} className={styles['nav-link'] + ' px-3'}>About</NavLink>
                    </li>
                </ul>
            </div>
        </Navbar>
    );
}

export default NavBarMain;