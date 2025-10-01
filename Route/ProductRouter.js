import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductByID, updateProduct } from "../controller/ProductController.js"

const ProductRouter = express.Router()

ProductRouter.get("/", getAllProducts)

ProductRouter.post("/", createProduct)

ProductRouter.delete("/:productID", deleteProduct)

ProductRouter.put("/:productID",updateProduct )

ProductRouter.get("/:productID", getProductByID)

export default ProductRouter