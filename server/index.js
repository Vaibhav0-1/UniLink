import express from "express"
import mongoose from "mongoose"
const app = express();

const port = 3000;

app.get("/" ,(req , res)=>{
    res.send("<h1>Hello from Node </h1>")
} )

app.listen(port , ()=>{
    console.log(`App is Listening on port ${port}`)
})