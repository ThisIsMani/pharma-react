import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import SearchPage from "./pages/SearchPage";
import ProductDetails from "./pages/ProductDetails";
import ProductsPage from "./pages/ProductsPage";
import ScrollToTop from "./components/ScrollToTop";
import Products from "./components/Products";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/home'/>
                </Route>
                <Route path='/home'>
                    <HomePage/>
                </Route>
                <Route path='/search'>
                    <SearchPage/>
                </Route>
                <Route exact path='/product/:id'>
                    <ProductDetails/>
                </Route>
                <Route path='/products'>
                    <ProductsPage/>
                </Route>
            </Switch>
            <Footer/>
            <ScrollToTop/>
        </div>
    );
}

export default App;
