const wishlists = require('../Models/wishlistSchema')

//add to wishlist
exports.addToWishlistController = async (req,res)=>{
    const {id,title,price,description,category,image,rating}= req.body
    const userId = req.payload
    try{
        const existingProduct = await wishlists.findOne({id,userId})
        if(existingProduct){
            res.status(406).json("Product already exist in your wishlist!!!")
        }else{
            const newProduct = new wishlists({
                id,title,price,description,category,image,rating,userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//getwishlist
exports.getUserWishlistController = async (req,res)=>{
    const userId = req.payload
    try{
        const userWishlist = await wishlists.find({userId})
        res.status(200).json(userWishlist)
    }catch(err){
        res.status(401).json(err)
    }
}

//removewishlistitem
exports.removeWishlistItemCOntroller = async (req,res)=>{
    const {id} = req.params
    try{
        const removeItem = await wishlists.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
    }catch(err){
        res.status(401).json(err)
    }
}