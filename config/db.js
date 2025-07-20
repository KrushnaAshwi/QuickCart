import mongoose from "mongoose";

let cashed = global.mongoose

if (!cashed) {
  cashed = global.mongoose={conn:null,Promise:null}
  
}
async function connectionSB ()  {

  if (cashed.conn) {
    return cashed.conn
    
  }
  if (!cashed.Promise) {
    const opts ={
      bufferCommands:false
    }
    cashed.Promise=mongoose.connect('${process.env.MONGODB_URI}/quickcart',opts).then(mongoose =>{
      return mongoose
    } )

  }
cashed.conn= await cashed.Promise
return cashed.conn
  
}
export default connectionSB;