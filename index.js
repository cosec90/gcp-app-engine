const express = require('express')
const bodyParser = require('body-parser')
path = require('path');
const dotenv = require('dotenv').config();

var https = require('https');
var cors = require('cors')
const app = express()
port = 6000

const { Storage } = require('@google-cloud/storage');
const {ImagesClient} = require('@google-cloud/compute').v1


// -----------------------

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser({ limit: '50mb' }))
app.use(express.json({ limit: '50mb' }));

// -----------------------

// -----------------------

// -----------------------

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

app.get('/', (req, res) => {

    res.status(200).json({ message: "Initial route" })

})

app.get('/test2', (req, res) => {

    // Imports the Google Cloud client library.
    // listAllInstances()

    res.status(200).json({message: "Test route 2"})

})
app.get('/test3', (req, res) => {
    // const storage = new Storage();
    // // Makes an authenticated API request.
    // async function listBuckets() {
    //     try {
    //         const results = await storage.getBuckets();

    //         const [buckets] = results;

    //         console.log('Buckets:');
    //         buckets.forEach(bucket => {
    //             console.log(bucket.name);
    //         });
    //     } catch (err) {
    //         console.error('ERROR:', err);
    //     }
    // }
    // listBuckets();
    res.status(200).json({message: "Test route 3"})

})