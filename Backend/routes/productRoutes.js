import express from 'express'
import { addProducts, getProducts, updateProduct,getById, deleteProduct } from '../controllers/productController.js';
const productRouter = express.Router()

productRouter.get('/',getProducts)
productRouter.post('/add',addProducts)
productRouter.put('/update/:id', updateProduct)
productRouter.get('/:id',getById)
productRouter.delete('/:id',deleteProduct)

export default productRouter;