const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
// const csrf = require('csurf');
// const bodyParser = require("body-parser");
// const idGenerator = require("firebase-auto-ids")
// const os = require('os')
// const fs = require('fs')
// const Busboy = require('busboy');
// let UUID = require('uuid-v4');
const cors = require('cors')

const serviceAccountKey = require('./serviceAccountKey.json');
// const cookieParser = require('cookie-parser');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://pharma-9e4a8-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: 'pharma-9e4a8.appspot.com'
});

const db = admin.firestore();
// const bucket = admin.storage().bucket();

// const csrfMiddleware = csrf({cookie: true});

const app = express();
// const generator = new idGenerator.Generator();

const PORT = process.env.PORT || 3001;

// app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/products', async (req, res) => {
    const allProducts = [];
    const casSearch = await db.collection('cards').get();
    casSearch.forEach((doc) => {
        allProducts.push(doc.data());
    });
    res.json({allProducts});
})

app.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    const cardResult = await (await db.collection('cards').doc(id).get()).data();
    res.json({productDetails: cardResult})
})

app.get('/search', async (req, res) => {
    const q = req.query.q;
    const searchResultCards = [];
    const casSearch = await db.collection('cards').where('casLower', '==', q.toLowerCase()).get();
    const titleSearch = await db.collection('cards').where('titleLower', '==', q.toLowerCase()).get();
    casSearch.forEach((doc) => {
        searchResultCards.push(doc.data());
    });
    titleSearch.forEach((doc) => {
        searchResultCards.push(doc.data());
    });
    console.log(searchResultCards.length)
    res.json({searchResults: searchResultCards});
});

app.get('/topProducts', async (req, res) => {
    const searchResultCards = [];
    const casSearch = await db.collection('cards').get();
    casSearch.forEach((doc) => {
        searchResultCards.push(doc.data());
    });
    res.json({topProducts: searchResultCards})
})

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});