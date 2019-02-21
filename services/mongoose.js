const mongoose=require('mongoose');
const conn=mongoose.createConnection("mongodb://localhost:27017/assign_db");

exports.mongoose=mongoose;
exports.conn=conn;