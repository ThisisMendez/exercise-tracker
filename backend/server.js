const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); //helps connect to mongo DB 

require('dotenv').config(); 

// Create Express Server
const app = express(); 
const port = process.env.PORT || 5000; 

//Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}); 
const connection = mongoose.connection; 
connection.once('open', () => { 
    console.log("MongoDB DB connection established successfully");
})

// Routes 
const exercisesRouter = require('./routes/exercises'); 
const usersRouter = require('./routes/users'); 

app.use('/exercises', exercisesRouter); 
app.use('/users', usersRouter); 

//Starts the Server 
app.listen(port, () => { 
    console.log(`Server is running on port : ${port}`);
});