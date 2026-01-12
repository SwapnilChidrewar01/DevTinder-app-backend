// console.log(global);

// console.log(this) // this will be empty in the node js because this is not defined in the node js

// // in browser this will be the window object

// console.log(globalThis); // this is the standard way to access the global object in every where now it is the ecma script standard and it is accepted by all the browsers 
// const { MongoClient } = require('mongodb');

// async function runGetStarted() {
//     // Replace the uri string with your connection string
//     const uri = 'mongodb+srv://chidrewarswapnil01_db_user:swap_1234@cluster0.2nmbmc2.mongodb.net/?appName=Cluster0';
//     const client = new MongoClient(uri);

//     try {
//         const database = client.db('test');
//         const movies = database.collection('notes');

//         // Query for a note that exists in your database
//         // The document in your DB has title: 'why is this think happensrt'
//         const query = { title: 'why is this think happensrt' };
//         const movie = await movies.findOne(query);

//         // Alternative: Get the first document without filtering
//         // const movie = await movies.findOne();

//         console.log(movie, 'movie');
//     } finally {
//         await client.close();
//     }
// }
// runGetStarted().catch(console.dir);

const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})  

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

