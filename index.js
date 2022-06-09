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

const baseUrl = 'http://34.93.250.5:7000'
let resObj = {}

// GET NETWORKS --------------------------------------

app.get('/getNetworks', async (req, res) => {

    resObj = {}
    // console.log('Request headers ----------',req.headers)
    // console.log("x-api key",header["x-api-key"])
    axiosConfig.headers.token = token
    await axios.get(`${baseUrl}/api/utilities/getNetworks?region=${req.query.region}`,axiosConfig).then((response) =>{
        
        resObj = response.data
    }).catch((err) =>{
        
        resObj = err.response.data
    })

    res.status(resObj.status).json(resObj)
    // res.status(200).json({messsas: ""})

})

// GET SUBNETWORKS --------------------------------------

app.get('/getNetworks', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.get(`${baseUrl}/api/utilities/getSubnetworks?region=${req.query.region}`,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        console.log('Test2 err',err)
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   

})


// GET REGIONS --------------------------------------

app.get('/getRegions', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.get(`${baseUrl}/api/utilities/getRegions`,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   

})

// CREATE INSTANCE --------------------------------------

app.post('/createInstance', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.post(`${baseUrl}/api/encoder/createInstance`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// GET INSTANCES --------------------------------------

app.get('/getInstances', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.get(`${baseUrl}/api/encoder/getInstances?zone=${req.query.zone}`,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// START INSTANCE --------------------------------------

app.post('/startInstance', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.get(`${baseUrl}/api/encoder/startInstance`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})


// STOP INSTANCE --------------------------------------

app.post('/stopInstance', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.get(`${baseUrl}/api/encoder/stopInstance`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// CREATE USER --------------------------------------

app.post('/createUser', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.get(`${baseUrl}/api/user/createUser`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// SIGN IN--------------------------------------

app.post('/signIn', async (req, res) => {

    resObj = {}
    await axios.get(`${baseUrl}/api/user/signIn`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// SERVICE CREATION IN ATEME ENCODER --------------------------------------

app.post('/createAtemeService', async (req, res) => {

    resObj = {}
    await axios.get(`${baseUrl}/api/ateme/createAtemeService?atemeIP=${req.query.atemeIP}`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// GET ALL SERVICES --------------------------------------

app.get('/getAtemeServices', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.get(`${baseUrl}/api/ateme/getAtemeServices?atemeIP=${req.query.atemeIP}&name=${req.query.name}`,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// START ATEME SERVICE--------------------------------------

app.post('/startAtemeService', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.post(`${baseUrl}/api/ateme/startAtemeService`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// STOP ATEME SERVICE --------------------------------------

app.post('/stopAtemeService', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.post(`${baseUrl}/api/ateme/stopAtemeService`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// EDIT ATEME SERVICE --------------------------------------

app.put('/editAtemeService', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.put(`${baseUrl}/api/ateme/editAtemeService?atemeIP=${req.query.atemeIP}&uid=${req.query.uid}`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// DELETE INSTANCE --------------------------------------

app.post('/deleteInstance', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.post(`${baseUrl}/api/encoder/deleteInstance`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// ACTIVITY LOGS --------------------------------------

app.post('/getUserActivity', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.post(`${baseUrl}/api/utilities/getUserActivity`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// ATTACH LICENSE --------------------------------------

app.post('/attatchLicense', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.post(`${baseUrl}/api/ateme/attatchLicense`,req.body,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// GET LICENSE SERVER --------------------------------------

app.get('/getLicenseInstance', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.post(`${baseUrl}/api/encoder/getLicenseInstance?zone=${req.query.zone}`,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// GET MACHINES --------------------------------------

app.get('/getMachines', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.post(`${baseUrl}/api/utilities/getMachines?zone=${req.query.zone}`,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})


// GET IMAGES --------------------------------------

app.get('/getImages', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.post(`${baseUrl}/api/utilities/getImages`,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

// GET SINGLE INSTANCE --------------------------------------

app.get('/getSingleInstance', async (req, res) => {

    resObj = {}
    axiosConfig.headers.token = token
    await axios.post(`${baseUrl}/api/encoder/getSingleInstance?zone=${req.query.zone}&instanceName=${req.query.instanceName}`,axiosConfig).then((response) =>{
        resObj = response.data
    }).catch((err) =>{
        resObj = err.response.data
    })
    res.status(resObj.status).json(resObj)
   
})

//--------------------------------------




// app.get('/test2', async (req, res) => {

//     // Imports the Google Cloud client library.
//     // listAllInstances()
//     let resObj = {}
//     await axios.get('http://34.93.250.5:7000/test',axiosConfig).then((response) =>{

//         console.log('Test2 res',response.data)
//         resObj = response.data
//     }).catch((err) =>{
//         console.log('Test2 err',err.response.data)
//         resObj = err.response.data
//     })

//     res.status(200).json(resObj)

// })
// app.get('/test3', async (req, res) => {
    
//     let resObj = {}
//     let reqBody = {
//         username: "operator123",
//         password: "operator1@1234"
//     }
//     await axios.post('http://34.93.250.5:7000/api/user/signIn',reqBody,axiosConfig).then((response) =>{

//         console.log('Sign res',response.data)
//         resObj = response.data
//     }).catch((err) =>{
//         console.log('Test3',err.response.data)
//         resObj = err.response.data
//     })
    
//     res.status(200).json(resObj)

// })