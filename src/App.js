import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import React from "react";
import {Redirect, Route} from 'react-router-dom';

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import SearchPage from "./pages/SearchPage";
import ProductDetails from "./pages/ProductDetails";


function App() {
    return (
        <div>
            <NavBar/>

            <Route exact path='/'>
                <Redirect to='/home'/>
            </Route>
            <Route path='/home'>
                <HomePage/>
            </Route>
            <Route path='/search'>
                <SearchPage/>
            </Route>
            <Route path='/products/:id'>
                <ProductDetails/>
            </Route>

            <Footer/>
        </div>
    );
}

export default App;
