const mongoose = require('mongoose') 

const connectDB = async () => {
        await mongoose.connect('mongodb+srv://chidrewarswapnil01_db_user:swap_1234@cluster0.2nmbmc2.mongodb.net/nasmate_dev?appName=Cluster0')
}

module.exports = connectDB


