const mongoose = require("mongoose");

const parseCookie = str => str.split(';').map(v => v.split('=')).reduce((acc, v) => { acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim()); return acc;}, {});
async function checkForSession(sessionId){
    return await mongoose.connection.db.collection("sessions").findOne({_id:sessionId});
}
async function deleteSession(sessionId){
    return await mongoose.connection.db.collection("sessions").findOneAndDelete({_id:sessionId});
}

module.exports ={
    parseCookie,
    checkForSession,
    deleteSession,
} 