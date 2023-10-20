const express = require('express');
const cors=require("cors");
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

// MiddleWare
app.use(cors());
app.use(express.json());
const port= process.env.port || 5000;
// moincse022
// PcWJwAzlGA3RHYql


console.log(process.env.BD_USER);
const uri = "mongodb+srv://moincse022:PcWJwAzlGA3RHYql@cluster0.ggdiyfe.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
const productCollection=client.db("insertDB").collection("product")

app.post('/products',async(req,res)=>{
    const product=req.body;
    console.log(product)
    const result=await productCollection.insertOne(product);
    console.log(result);
    res.send(result);
})

app.get("/products", async (req, res) => {
  const curser=productCollection.find()
    const result = await curser.toArray();
    res.send(result);
  });
//   Delete
// Data delete from database
app.delete("/products/:id",async(req,res)=>{
    const id=req.params.id;
    const query={_id: new ObjectId(id)};
    console.log(query);
    const result=await productCollection.deleteOne(query);
    res.send(result);

});
app.get(`/products/:id`,async(req,res)=>{
    const id=req.params.id;
    const query={_id: new ObjectId(id)};
    console.log(query);
    const result = await productCollection.findOne(query);
    res.send(result);
})
// Update
// app.put('/products/:id',async(req,res)=>{
//     const id=req.params.id;
//     const filter={_id:new ObjectId(id)}
//     const options={upset:true};
//     const updateProduct=req.body;
//      const products={
//         $set:{
        //    name:updateProduct.name,
        //    brandName:updateProduct.brandName,
        //    type:updateProduct.type,
        //    price:updateProduct.price,
        //    rating:updateProduct.rating,
        //    photo:updateProduct.photo
//         }
//     }
//     const result=await productCollection.updateOne(filter,options,products)
//     res.send(result);
// })

app.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    const updatedProduct= req.body;
    console.log("id", id, updatedProduct);
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const products = {
      $set: {
        name:updatedProduct.name,
        brandName:updatedProduct.brandName,
        type:updatedProduct.type,
        price:updatedProduct.price,
        rating:updatedProduct.rating,
        photo:updatedProduct.photo
      },
    };
    const result = await productCollection.updateOne(
      filter,
      products,
      options
    );
    res.send(result);
  });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Crud is running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})