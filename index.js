import express from "express"
import mongoose from "mongoose";
import cors from "cors"
const app = express()
const port = 3002
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://rohimalaa1_db_user:0uAvzBspv4wrziQq@cluster2.q43zjop.mongodb.net/?appName=Cluster2")
.then(()=>{
    console.log("db is connected");
    
})
.catch((err)=>{
    console.log(err);
    
})
 const productSchema=mongoose.Schema({
    name:String,
    price:Number
})
const productModel=mongoose.model("product",productSchema)
app.post('/add',async (req, res) => {
    const {name,price}=req.body
   await productModel.insertMany({name,price})
    
    res.json({message:"success",
            
    })
})
app.get("/product",async(req,res)=>{
     const products = await productModel.find()
     res.json({
        message:"success",
        data:products
    })
})

app.get("/product/:id",async(req,res)=>{
    const id=req.params.id
     const products = await productModel.findById(id)
     
     res.json({
        message:"success",
        data:products
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))