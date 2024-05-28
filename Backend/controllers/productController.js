import Product from '../models/pizzaFile.js'

export const getProducts = async (req,res,next) =>{
    let products;
     
    try {
        products = await Product.find()
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
    if(!products){
        return res.status(404).json({message:"Could not find products"})
    }
    return res.status(200).json({products})
}

//AddProducts 

export const addProducts = async (req,res,next) =>{
    const {image,name,size,price} = req.body;

    const product = new Product ({
        image,
        name,
        size,
        price,
    });

    try {
        await product.save()
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
    return res.status(200).json({product})
}

// update 

export const updateProduct = async (req,res,next) =>{
    const productId = req.params.id;
    const {size,price} = req.body;

    let product;
    try {
        product = await Product.findByIdAndUpdate(productId,{
            size,
            price,
        })
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
    if(!product){
        return res.status(500).json({message:"Unable to update "})
    }
    return res.status(200).json({product})
}

// get by id 

export const getById = async (req,res,next)=>{
   const productId = req.params.id;

   let product ;

   try {
     product = await Product.findById(productId)
   } catch (error) {
      console.log(`Error: ${error.message}`);
   }
   if(!product){
      return res.status(404).json({message:"No Product found"})
   }
   return res.status(200).json({product})

}

//delete 

export const deleteProduct = async (req,res,next) =>{
    const productId = req.params.id;
    let product;
    try {controllers/productController.js
        product = await Product.findByIdAndRemove(productId)
      } catch (error) {
         console.log(`Error: ${error.message}`);
      }
      if(!product){
         return res.status(500).json({message:"Unable to Delete"})
      }
      return res.status(200).json({message:"Successfully Deleted"})
    
}