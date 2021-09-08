const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: "*" }));
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const PORT=process.env.PORT ||3000
//urlstructuring dbprotocal://localhost(i.e)ipaddress:portnumber/dbname
const url = "mongodb+srv://ammu:ammu@cluster0.urd2x.mongodb.net?retryWrites=true&w=majority";
app.use(express.json());

app.get("/products", async (req, res) => {
try {
  //connect to the database
  let client = await  mongoclient.connect(url);
  //select the db
  let db= await client.db("todo_app");
  //select the collection and perform the action
let data= await db.collection("tasks").find({}).toArray();
//close the connection
await client.close();
res.json(data)
} catch (error) {
  res.status(500).json({
    message:"something went wrong"
  })
}
});
app.post("/createtask",async (req, res) => {
 try {
   //connect to the database
  let client = await  mongoclient.connect(url);
  //select the db
  let db= await client.db("todo_app");
  //select the collection and perform the action
let data= await db.collection("tasks").insertOne(req.body);
//close the connection
 await client.close();
res.json({
  message:"Task created successfully"
})
 } catch (error) {
   res.status(500).json({
     message:"something went wrong"
   })
 }
});
app.put("/updatetask/:id",async (req, res) => {
  try {
     //connect to the database
  let client = await  mongoclient.connect(url);
  //select the db
  let db= await client.db("todo_app");
  //select the collection and perform the action
  let data=await db.collection("tasks").findOneAndUpdate({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})
  //close the connection
 await client.close();
 res.json({
   message:"Task updated"
 })
  } catch (error) {
    res.status(500).json({
      message:"something went wrong"
    })
  }
});
app.delete("/deletetask/:id",async (req, res) => {
  try {
    //connect to the database
  let client = await  mongoclient.connect(url);
  //select the db
  let db= await client.db("todo_app");
  //select the collection and perform the action
  let data=await db.collection("tasks").findOneAndDelete({_id:mongodb.ObjectId(req.params.id)})
//close the connection
 await client.close();
res.json({
  message:"Task Deleted successfully"
})
  } catch (error) {
    res.status(500).json({
      message:"Something went wrong"
    })
  }
});
app.listen(PORT, () => {
  console.log(`the port is listening in ${PORT}`);
});
