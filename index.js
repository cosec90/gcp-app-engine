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

const { AccessApprovalClient } = require('@google-cloud/access-approval');
const compute = require('@google-cloud/compute');
const { DNS } = require('@google-cloud/dns');
const { GCEImages } = require('gce-images');
const { JWT } = require('google-auth-library');
const { MachineTypesClient } = require('@google-cloud/compute').v1;
const { RegionsClient } = require('@google-cloud/compute').v1;
const {SubnetworksClient} = require('@google-cloud/compute').v1;
const {NetworksClient} = require('@google-cloud/compute').v1;
const computeClient1 = new NetworksClient();
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


app.get('/createInstance', async (req, res) => {

    // const instancesClient = new compute.InstancesClient();

    // try {
    //     let paramsObj = {
    //         instanceResource: {
    //             name: 'skn-test-01',
    //             disks: [
    //                 {
    //                     // Describe the size and source image of the boot disk to attach to the instance.
    //                     initializeParams: {
    //                         sourceImage: "projects/sonyliv-live-streaming/global/images/family/docker-encoder",
    //                     },
    //                     boot: true,
    //                 },
    //             ],
    //             machineType: `zones/asia-south1-c/machineTypes/n2-highcpu-80`,
    //             networkInterfaces: [
    //                 {
    //                     "network": "global/networks/default",
    //                     "subnetwork": "regions/asia-south1/subnetworks/default",
    //                     "accessConfigs": [
    //                         {
    //                             "name": "External NAT",
    //                             "type": "ONE_TO_ONE_NAT"
    //                         }
    //                     ]
    //                 }
    //             ],
    //         },
    //         project: "sonyliv-live-streaming",
    //         zone: "asia-south1-c",
    //     }

    //     console.log('PArams -', paramsObj)
    //     const callApi = await instancesClient.insert(paramsObj)

    //     console.log('Call API response ------', callApi)
    //     console.log('Call API response obj------', JSON.stringify(callApi))

    // } catch (err) {
    //     console.log('Err', err)
    // }

    res.status(200).json({message: "Test create instance"})

})

app.get('/getZones', async (req, res) => {

    const maxResults = 10
    const project = 'sonyliv-live-streaming'
    let request = {
        project,
    };

    try {
        const computeClient = new RegionsClient();
        const iterable = await computeClient.list(request);
        console.log('zones', JSON.stringify(iterable))
        res.status(200).json({ message: "done" })

    } catch (err) {
        console.log('Err', err)
        res.status(200).json({ message: "done" })
    }

    res.status(200)

})

app.get('/getMachines', async (req, res) => {

    let finalObj = {}
    try {
        // const filter = ```labels.data:*```
        const computeClient = new MachineTypesClient();
        const maxResults = 10
        const project = 'sonyliv-live-streaming'
        let request = {
            project,
            zone: "asia-south1-c"
        };
        
        const response = await computeClient.list(request)
        // console.log('Machines', JSON.stringify(response[0][1]))
        const finalData = response[0].map((val) =>{
            
            return{
                name :val.name,
                imageSpaceGb: val.imageSpaceGb,
                memoryMb: val.memoryMb,
                description: val.description
            }   
        })
        // let resArr = []
        // for(let i=0; i< response[0].length; i++){

        //     resArr.push({name: response[0][i].name})


        // }
        console.log('Response arr',JSON.stringify(finalData))
    } catch (err) {
        console.log('Err', err)
        res.status(200).json({ message: "done" })
    }



})

app.get('/auth', async (req, res) => {

    const client = new JWT({
        email: '621286246845-compute@developer.gserviceaccount.com',
        key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6xZEFIcYbl0jJ\nybgEfl7m6QqWZUDlz4pZra0BPaUr1wG6UOFTfOF8PdZX03RMbJDdSBMkG6T/WVyC\na/dpLEdMcrWsEWw8B48xZXa6uYGpg9b+JkWYDva0Tp8l7jBZgRKLUHrUII67l17W\nsaEoj/RTMKTy2yaFfnmWpCOjroEP/TRR/4PCT2CRW0BtQvK+TQIQMmpyRFP1pG7k\nQHxCycFKNc8KOKd8zWcaz5ADumjKMVbmjbkBvJBnnqt+Hnd3GquCTfl/RyObA6WR\n/9vMRaP1GsYVQiR1gwO2SPnWgE2MxrfOmF4nuvt7C6EDmDu1QNeVW48nOCMp9OD6\nZCQiZgevAgMBAAECggEAFLZ8UrlgIwcwB1Dbm4P4Olt11R/9hn7xtOhR22Vev/Hk\nOyllE8ExsHmbH7pPl3oixqeLl+GI9tiOLdiTY5KJhazjAOYdvrqH4s6B0EtqWcZJ\nPX45EZf3PB/L/oTfz81EpTaTqJrDuYIb/mtMmBb+3YrzgAtVxlA0Y8RoP2rG3WLi\nj4N6yQGDj8b1pWmctWaLXX4cVLUWlIgD6H+n/VEg/X+ZJYb9zPYGQ0R48VjLO2xa\nE4g8eZfHBP8d0pfSO2V5AKNv+WXvuvaZF383mAJ/ca+Ib+LF5jQHrelYqcMXa74Q\ndxhs/okslP+gXUhvovFzORio/Ml1guRy6JIDO7cOAQKBgQDui0lUCJlZZD5T9cK6\nPLF8s1Nloyr4GNdyR3e7oWxcZULCzSrFuIFPgRgTwe4p0thur0pZf/u53QzQ6rN9\n3xd5Ko9rLG1CN4XvkKrVHjLGTL8EZt9qJ0u2X6eDTny6W+vxwpQMIs4eo5m7qAH6\n2ZIG6Hk7WuKPRZTNyfcNu3QGQQKBgQDIcGoGJTNmy88Z9jBCr2xvqgcb0OFzMYaq\nmG6QjVGebSu75AGB0kBs72xh/LMlmRsAvC7xjAeLRyX48r5ajgUDoh6fV5L44sZo\nuQs7Hm528PQgYXyWxDcYS3bStK9ryEK+ifFL/1ql9U578FcZ/nHfqTmbUfRIFH29\nWazHBPHx7wKBgEOpNGJmkgCeA2PTOKmUn49MWiJhFsYKXcnnZZnN3quSeU5B3Zj5\njYwchNTN1Bz+1i8G/2LFf4QnpAP6HnFcfw76OHXgwxjeINpjwWDz0NkYWbII7+Pv\nQ3V2SlBfSdeeTR1k4JNUp/xe0TM+I1mgrt/QvtpMHCkhRmTcnXvCqNVBAoGBAKoK\npAeem6LDmGif8IVCKS36ApnYdMqy41nqgzHikbFjUEzPu2+VHM7NtxbRuHFXGA9h\nljmY3/WKYG54EIDmJt7UNEJdmvPF/yhsg1ieEnyZIaIu0fFdeJgFvUI3wvIfLHBU\nuf4NHavZFcITPPFyaMyj1Zksx542tA1k/CzCxzbFAoGAKs+iu5twPCWxgTNzNaSN\nvAgrlup0xEzEoSX1xADfWboTN5eIhPbPHkXbYL3ziYHGi/WlDCldeEjaqTzU148w\nMnx0TA01+EwZDWlFK9SSiwvlYsOvSRbB0CuH4QjC+8pps9gEriPeaqVmCUJiH02Y\nxnFSvqdFUigW1AQ9eWE5wPM=\n-----END PRIVATE KEY-----\n",
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    console.log('res.data', client);
    const url = `https://compute.googleapis.com/compute/v1/projects/sonyliv-live-streaming/zones/asia-south1-c/instances`;
    const ress = await client.request({ url });
    // console.log('res.data', client);

})

app.get('/getSubnet',async (req,res) =>{

    try{

        const maxResults = 10
        const project = 'sonyliv-live-streaming'
        let request = {
            project,
            region: "asia-south1"
        };
        const computeClient = new SubnetworksClient();
        const jj = await computeClient.list(request)
        console.log('ll', JSON.stringify(jj))
        console.log('ll', jj)

        res.status(200).json({ message: "done" })
    }catch(err){

        console.log('Err', err)
        res.status(200).json({ message: "done" })
    }

})

app.get('/getNetwork',async (req,res) =>{

    try{

        const maxResults = 10
        const project = 'sonyliv-live-streaming'
        let request = {
            project,
            region: "asia-south1"
        };
        // const computeClient = new NetworksClient();        
        const jj = await computeClient1.list(request)
        // console.log('ll', JSON.stringify(jj))
        console.log('ll', jj)

        console.log()

        res.status(200).json({ message: "done" })
    }catch(err){
        
        console.log('Err', err)
        res.status(200).json({ message: "done" })
    }

})

app.get('/getImages',async (req,res) =>{
    const project = "fancode-poc"
    const request = {
        project,
      };
    // const computeClient = new ImagesClient();
    // const response = await computeClient.list(request)
    // console.log('Response -------------',JSON.stringify(response))

    const computeClient = new ImagesClient();
    let response = await computeClient.list(request)
    // for await (const response of iterable) {
    //     console.log(response);
    // }
    console.log('Response -------------',JSON.stringify(response))

    res.status(200).json()
})

// app.get('/getMachines',async (req,res) =>{
//     const project = "fancode-poc"
//     const request = {
//         project,
//       };
//     // const computeClient = new ImagesClient();
//     // const response = await computeClient.list(request)
//     // console.log('Response -------------',JSON.stringify(response))

//     const computeClient = new ImagesClient();
//     let response = await computeClient.list(request)
//     // for await (const response of iterable) {
//     //     console.log(response);
//     // }
//     console.log('Response -------------',JSON.stringify(response))

//     res.status(200).json()
// })



async function listAllInstances() {
    const instancesClient = new compute.InstancesClient();

    //Use the `maxResults` parameter to limit the number of results that the API returns per response page.
    const aggListRequest = instancesClient.aggregatedListAsync({
        project: 'sonyliv-live-streaming',
        maxResults: 10,
    });

    console.log('Instances found:', aggListRequest);

    // Despite using the `maxResults` parameter, you don't need to handle the pagination
    // yourself. The returned object handles pagination automatically,
    // requesting next pages as you iterate over the results.
    for await (const [zone, instancesObject] of aggListRequest) {
        const instances = instancesObject.instances;

        if (instances && instances.length > 0) {
            console.log(` ${zone}`);
            for (const instance of instances) {
                // console.log(`Main Instance`,JSON.stringify(instance));
            }
            console.log(`Main Instance`, JSON.stringify(instances[0]));
            console.log(`Main Instance`, instances[0]);
        }
    }
}