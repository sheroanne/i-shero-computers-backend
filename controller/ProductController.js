import Product from "../models/Product.js";
import { isAdmin } from "./UserController.js";

export function createProduct(req, res){
// console.log(req)
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "Forbidden"
        })
        return;
    }

    const product = new Product(req.body)

    product.save().then(
        () => {
            res.json({
                message: "product created successfully"
            })
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message: "error creating product",
                error: error.message
            })
        }
    )
}

export function getAllProducts(req, res) {

    if (isAdmin(req)) {

        Product.find().then(
            (products) => {
                res.json(products)
            }
        ).catch(
            (error) => {
                res.status(500).json({
                    message: "error fetching products",
                    error: error.message
                })
            }
        )

    } else {

        Product.find({isAvailable : true}).then(
            (products) => {
                res.json(products)
            }

        ).catch(
            (error) => {
                res.status(500).json({
                    message: "error fetching products",
                    error: error.message
                })
            }
        )
    }
}


export function deleteProduct(req,res){
    if (!isAdmin(req)) {
        res.status(403).json({
            message: "only admin can delete products"
        })
        return;
    }

    const productID = req.params.productID

    Product.deleteOne({productId : productID}).then(
        ()=>{
            res.json({
               message : "product deleted successfully" 
            })
        }
    )
}

export function updateProduct(req,res){
     if (!isAdmin(req)) {
        res.status(403).json({
            message: "only admin can update products"
        })

    }

     const productID = req.params.productID

    Product.updateOne({productId : productID}, req.body).then(
         ()=>{
            res.json({
               message : "product updated successfully" 
            })
        }

    )
}

export function getProductByID(req,res){
   const productID = req.params.productID

   Product.findOne({productId : productID}).then(
    (product)=>{
        if(product == null){
            res.status(404).json({
                message : "product not found"
            })
        }
        else{
            res.json(product)
        }
    }

   ).catch(
    (error)=>{
        res.status(500).json({
            message : "Error fetching product",
            error :  error.message

        })
    }
   )
 
}
     