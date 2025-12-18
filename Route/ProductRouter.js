import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductByID, searchProducts, updateProduct } from "../controller/ProductController.js"

const ProductRouter = express.Router()

ProductRouter.get("/", getAllProducts)

ProductRouter.post("/", createProduct)

ProductRouter.get("/search/:query", searchProducts)

ProductRouter.delete("/:productID", deleteProduct)

ProductRouter.put("/:productID",updateProduct )

ProductRouter.get("/:productID", getProductByID)

export default ProductRouter