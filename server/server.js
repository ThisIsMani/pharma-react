const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const csrf = require('csurf');
const bodyParser = require("body-parser");
const idGenerator = require("firebase-auto-ids")
const os = require("os");
const fs = require("fs");
const Busboy = require('busboy');
let UUID = require('uuid-v4');

// const cors = require('cors')

const serviceAccountKey = require('./serviceAccountKey.json');
const cookieParser = require('cookie-parser');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://pharma-9e4a8-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: 'pharma-9e4a8.appspot.com'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

const csrfMiddleware = csrf({cookie: true});

const PORT = process.env.PORT || 3001;
const app = express();
const generator = new idGenerator.Generator();
app.use(express.static(path.join(__dirname, 'public')))


// app.use(cors())

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.set("view engine", "ejs")

app.set("views", path.join(__dirname, '/views'));

app.use(bodyParser.json());
app.use(cookieParser())
app.use(csrfMiddleware)

app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

app.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/adminpanel", function (req, res) {
    const sessionCookie = req.cookies.session || "";

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(() => {
            res.render("adminpanel");
        })
        .catch(() => {
            res.redirect("/login");
        });
});

app.post("/createcard", async (req, res) => {
    const sessionCookie = req.cookies.session || "";

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(() => {
            const busboy = new Busboy({headers: req.headers});
            let uuid = UUID();
            let fields = {};
            let fileData = {}
            let id = generator.generate(Date.now());
            let ext = '';

            busboy.on('file', function (fieldname, file, oldfilename, encoding, mimetype) {
                ext = path.extname(oldfilename)
                let newfilename = id + ext;

                let newfilepath = path.join(os.tmpdir(), newfilename)
                file.pipe(fs.createWriteStream(newfilepath))

                fileData = {filepath: newfilepath, mimetype}
            });
            busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
                fields[fieldname] = val;
            });
            busboy.on('finish', function () {
                bucket.upload(fileData.filepath, {
                        uploadType: 'media',
                        metadata: {
                            metadata: {
                                contentType: fileData.mimetype,
                                firebaseStorageDownloadTokens: uuid,
                            }
                        },
                    },
                    (err, uploadedFile) => {
                        if (!err) {
                            createDocument(uploadedFile);
                        }
                    });

                function createDocument(uploadedFile) {
                    db.collection('cards').doc(id).set(fields).then(newCard => {
                        db.collection('cards').doc(id).set({
                            id: id,
                            fileExt: ext,
                            image: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`,
                        }, {merge: true}).then(res => {
                            console.log('Card Added!');
                        })
                    })
                }

                // res.writeHead(303, { Connection: 'close', Location: '/' });
                res.send("Parsing done");
            });
            req.pipe(busboy);
        })
        .catch((error) => {
            res.redirect("/login");
        });
});

app.get("/allcards", function (req, res) {
    const sessionCookie = req.cookies.session || "";

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(async () => {
            const searchResultCards = [];
            const casSearch = await db.collection('cards').get();
            casSearch.forEach((doc) => {
                searchResultCards.push(doc.data());
            });
            res.render("allcards", {searchResultCards});
        })
        .catch((error) => {
            res.redirect("/login");
        });
});

app.get("/updatecard/:id", async (req, res) => {
    const sessionCookie = req.cookies.session || "";

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(async () => {
            let id = req.params.id;
            let cardResult = await (await db.collection('cards').doc(id).get()).data();
            res.render("updatecard", {cardResult});
        })
        .catch((error) => {
            res.redirect("/login");
        });
})

app.get("/editcardpage/:id", async (req, res) => {
    const sessionCookie = req.cookies.session || "";

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(async () => {
            let id = req.params.id;
            let cardResult = await (await db.collection('cards').doc(id).get()).data();
            res.render("editcardpage", {cardResult});
        })
        .catch((error) => {
            res.redirect("/login");
        });
})

app.post("/editpost/:id", async (req, res) => {
    const sessionCookie = req.cookies.session || "";

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(() => {
            const busboy = new Busboy({headers: req.headers});
            let uuid = UUID();
            let fields = {};
            let fileData = {}
            let id = req.params.id;
            let ext = '';
            let sawFile = false;

            busboy.on('file', function (fieldname, file, oldfilename, encoding, mimetype) {
                sawFile = true;
                ext = path.extname(oldfilename)
                let newfilename = id + ext;

                let newfilepath = path.join(os.tmpdir(), newfilename)
                file.pipe(fs.createWriteStream(newfilepath))

                fileData = {filepath: newfilepath, mimetype}
            });
            busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
                fields[fieldname] = val;
            });
            busboy.on('finish', async function () {
                const cardData = (await db.collection('cards').doc(id).get()).data();
                if (sawFile) {
                    const fileName = cardData.id + cardData.fileExt;
                    let delFile = admin.storage().bucket().file(fileName).delete();

                    bucket.upload(fileData.filepath, {
                            uploadType: 'media',
                            metadata: {
                                metadata: {
                                    contentType: fileData.mimetype,
                                    firebaseStorageDownloadTokens: uuid,
                                }
                            },
                        },
                        (err, uploadedFile) => {
                            if (!err) {
                                createDocument(uploadedFile);
                            }
                        });
                } else {
                    createDocument(null)
                }

                function createDocument(uploadedFile) {
                    db.collection('cards').doc(id).set(fields).then(newCard => {
                        if (sawFile) {
                            db.collection('cards').doc(id).set({
                                fileExt: ext,
                                image: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`,
                            }, {merge: true}).then(res => {
                                console.log('Card Added!');
                                updateTopCards()
                            })
                        } else {
                            db.collection('cards').doc(id).set({
                                fileExt: cardData.fileExt,
                                image: cardData.image,
                            }, {merge: true}).then(res => {
                                console.log('Card Added!');
                                updateTopCards()
                            })
                        }
                    })
                }

                async function updateTopCards() {
                    let topCards = await (await db.collection('top-products').doc('top-products-array').get()).data().main;
                    const topCardIds = topCards.map(x => JSON.parse(x).id)
                    if (topCardIds.includes(id)) {
                        topCards[topCardIds.indexOf(id)] = JSON.stringify(await (await db.collection('cards').doc(id).get()).data())
                    }
                    await db.collection('top-products').doc('top-products-array').set({
                        main: topCards,
                    })
                }

                res.send("Parsing done");
            });
            req.pipe(busboy);
        })
        .catch(() => {
            res.redirect("/login");
        });
})

app.get('/deletecard/:id', async (req, res) => {
    const sessionCookie = req.cookies.session || "";

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(async () => {
            const cardData = (await db.collection('cards').doc(req.params.id).get()).data();
            const fileName = cardData.id + cardData.fileExt;
            await admin.storage().bucket().file(fileName).delete();
            await db.collection('cards').doc(req.params.id).delete();
            res.redirect("/allcards");
        })
        .catch((error) => {
            console.log(error)
            res.redirect("/login");
        });
})

app.get("/addcardpage", function (req, res) {
    const sessionCookie = req.cookies.session || "";
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(() => {
            res.render("addcardpage");
        })
        .catch(() => {
            res.redirect("/login");
        });
});

app.get("/editTopCards", (req, res) => {
    const sessionCookie = req.cookies.session || "";
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(async () => {
            let topCardsArray = [];
            const topCardIds = await (await db.collection('top-products').doc('top-products-array').get()).data().main;
            for (let card of topCardIds) {
                let getObject = JSON.parse(card)
                topCardsArray.push(getObject)
            }
            res.render("editTopCards", {topCardsArray})
        })
        .catch(() => {
            res.redirect("/login");
        });
})

app.get("/addtopCardsPage", (req, res) => {
    const sessionCookie = req.cookies.session || "";

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(async () => {
            const searchResultCards = [];
            const casSearch = await db.collection('cards').get();
            const topCards = await (await db.collection('top-products').doc('top-products-array').get()).data().main;
            const topCardIds = topCards.map(x => JSON.parse(x).id)
            casSearch.forEach((doc) => {
                if (!topCardIds.includes(doc.data().id)) {
                    searchResultCards.push(doc.data());
                }
            });
            res.render("addTopCardsPage", {searchResultCards});
        })
        .catch(() => {
            res.redirect("/login");
        });
})

app.post('/addTopCards', async (req, res) => {
    const sessionCookie = req.cookies.session || "";
    const topCards = [];
    for (let id of req.body) {
        const cardResult = await (await db.collection('cards').doc(id).get()).data();
        topCards.push(JSON.stringify(cardResult))
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(async () => {
            const topCardIds = await (await db.collection('top-products').doc('top-products-array').get()).data().main;
            for (let card of topCards) {
                topCardIds.push(card)
            }
            await db.collection('top-products').doc('top-products-array').set({
                main: topCardIds,
            })
            res.send("Update Done")
        })
        .catch(() => {
            res.redirect("/login");
        });
})

app.post('/saveTopCards', async (req, res) => {
    const sessionCookie = req.cookies.session || "";
    const topCards = [];
    for (let id of req.body) {
        const cardResult = await (await db.collection('cards').doc(id).get()).data();
        topCards.push(JSON.stringify(cardResult))
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true)
        .then(() => {
            db.collection('top-products').doc('top-products-array').set({
                main: topCards,
            })
            res.send("Update Done")
        })
        .catch(() => {
            res.redirect("/login");
        });
})

app.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();

    const expiresIn = 60 * 60 * 3 * 1000;

    admin
        .auth()
        .createSessionCookie(idToken, {expiresIn})
        .then(
            (sessionCookie) => {
                const options = {maxAge: expiresIn, httpOnly: true};
                res.cookie("session", sessionCookie, options);
                res.end(JSON.stringify({status: "success"}));
            },
            () => {
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        );
});

app.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/login");
});


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
    const topCardIds = await (await db.collection('top-products').doc('top-products-array').get()).data().main;
    for (let card of topCardIds) {
        searchResultCards.push(JSON.parse(card));
    }
    res.json({topProducts: searchResultCards})
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});