const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require('mongoose');
const { connection } = require('./connector')

const isNullOrUndefined = val => val === null || val === undefined;

app.get("/findColleges", async (req, res)=>{
    const name = req.query.name;
    const state = req.query.state;
    const city = req.query.city;
    const minPackage = req.query.minPackage;
    const maxFees = req.query.maxFees;
    const course = req.query.course;
    const exams = req.query.exams;
    let result = [];
    if(!isNullOrUndefined(name)){
        const listOfName = await connection.find({name:{$regex:name,$options:"$i"}});
        listOfName.forEach(element => {
            result.push(element);
        });    
    }
    if(!isNullOrUndefined(state)){
        const listOfstate = await connection.find({state:{$regex:state,$options:"$i"}});
        listOfstate.forEach(element => {
            result.push(element);
        });    
    }
    if(!isNullOrUndefined(city)){
        const listOfcity = await connection.find({city:{$regex:city,$options:"$i"}});
        listOfcity.forEach(element => {
            result.push(element);
        });    
    }
    if(!isNullOrUndefined(minPackage)){
        const listOfminPackage = await connection.find({minPackage:{$regex:minPackage,$options:"$i"}});
        listOfminPackage.forEach(element => {
            result.push(element);
        });    
    }
    if(!isNullOrUndefined(maxFees)){
        const listOfmaxFees = await connection.find({maxFees:{$regex:maxFees,$options:"$i"}});
        listOfmaxFees.forEach(element => {
            result.push(element);
        });    
    }
    if(!isNullOrUndefined(course)){
        const listOfcourse = await connection.find({course:{$regex:course,$options:"$i"}});
        listOfcourse.forEach(element => {
            result.push(element);
        });    
    }
    if(!isNullOrUndefined(exams)){
        console.log(exams);
        const listOfexams = await connection.find({exams:{$regex:exams,$options:"$i"}});
        console.log(listOfexams);
        listOfexams.forEach(element => {
            console.log(element);
            result.push(element);
        });    
        console.log("called");
    }
    // console.log(result);
    res.send(result);
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;