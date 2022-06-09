const express = require('express')
const bodyParser = require('body-parser')
path = require('path');
const dotenv = require('dotenv').config();

var https = require('https');
var cors = require('cors')
const app = express()
port = parseInt(process.env.PORT) || 6000

const { Storage } = require('@google-cloud/storage');
const {ImagesClient} = require('@google-cloud/compute').v1

const axios = require('axios').default
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'token': ''
    }
}

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

app.get('/test2', async (req, res) => {

    // Imports the Google Cloud client library.
    // listAllInstances()
    let resObj = {}
    await axios.get('http://34.93.250.5:7000/test',axiosConfig).then((response) =>{

        console.log('Test2 res',response.data)
        resObj = response.data
    }).catch((err) =>{
        console.log('Test2 err',err.data)
        resObj = err.data
    })

    res.status(200).json(resObj)

})
app.get('/test3', async (req, res) => {
    
    let resObj = {}
    let reqBody = {
        username: "operator1",
        password: "operator1@1234"
    }
    await axios.post('http://34.93.250.5:7000/api/user/signIn',reqBody,axiosConfig).then((response) =>{

        console.log('Sign res',response.data)
        resObj = response.data
    }).catch((err) =>{
        console.log('Test3',err)
        resObj = err.data
    })
    
    res.status(200).json(resObj)

})