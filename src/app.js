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
const connectDB = require('./config/database')

const app = express()
//middleware

// const auth = require('./middleware/auth')
// const userauth = require('./middleware/user')


// app.use("/admin", auth)
// app.get("/admin/getalldata", (req, res) => {
//     res.send('all the data related to the admin')
// })  

// app.get("/user", userauth, (req, res) => {
//     try {
//         //get the data from the database and respond to the client server
//           res.send('all the data related to the user')
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error)
//     }

// })
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })  
// app.post('/', (req, res) => {
//     res.send('you posted a request')
// })  


const User = require('./model/user')
app.use(express.json())
// user fine and update user by id 
app.patch("/user/:userid", async (req, res) => {
    console.log(req.body)
    const userid = req.params.userid
    const value = req.body

    try {
        const allowedUpdates = ["age", "photo_url", "about", "skills"]
        const canupdate = Object.keys(value).every((value) => allowedUpdates.includes(value))
        if (!canupdate) {
            return res.status(500).send('Invalid update')
        }
        if(value.skills.length>10){
            return res.status(500).send('skills can not be more than 10')
        }
        const user = await User.findByIdAndUpdate({ _id: userid }, req.body, { new: true })
        if (!user) {
            return res.status(404).send('User not found')
        } else {
            res.status(200).send({ message: "User updated successfully", user })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
// delete user api 
app.delete("/user", async (req, res) => {
    console.log(req.body)
    const userid = req.body.userid

    try {
        const user = await User.findByIdAndDelete({ _id: userid })
        if (!user) {
            return res.status(404).send('User not found')
        } else {
            res.status(200).send({ message: "User deleted successfully", user })
        }


    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
// for one user get user by the email adress 
app.get("/userone", async (req, res) => {
    const emailId = req.body.emailId
    if (!emailId) {
        return res.status(400).send('Email is required')
    }
    try {
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            return res.status(404).send('User not found')
        } else {
            res.status(200).send({ user })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
// feed api for that need all user get api 
app.get("/users", async (req, res) => {
    try {
        const users = await User.find()
        if (!users) {
            return res.status(404).send('Users not found')
        } else {
            res.status(200).send({ users })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
app.post('/signup', async (req, res) => {
    // console.log(req.body)
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

connectDB().then(() => {
    console.log('Connected to MongoDB')
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
})
    .catch((error) => {
        console.log(error)
    })



