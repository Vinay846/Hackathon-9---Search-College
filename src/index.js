const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require('mongoose');
const { connection } = require('./connector');

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
    if(isNullOrUndefined(name) && isNullOrUndefined(state) && isNullOrUndefined(city) && isNullOrUndefined(minPackage) &&
    isNullOrUndefined(maxFees) && isNullOrUndefined(course) && isNullOrUndefined(exams)){
        res.send(await connection.find());
    }

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
    if(!isNullOrUndefined(minPackage) && minPackage > 0){
        const listOfminPackage = await connection.find({minPackage:{$gte : minPackage}});
        listOfminPackage.forEach(element => {
            result.push(element);
        });    
    }
    if(!isNullOrUndefined(maxFees) && maxFees > 0){
        const listOfmaxFees = await connection.find({maxFees:{$lte : maxFees}});
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
        const listOfexams = await connection.find({exam:{$regex:exams,$options:"$i"}});
        listOfexams.forEach(element => {
            result.push(element);
        });    
    }
    res.send([...new Set(result)]);
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;