const mongoose= require("mongoose")
const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"please provide product name"],
        maxlength:[100,"name cannot be more than 100 characters"]
    },
    price:{
        type:Number,
        required:[true,"please provide product price"],
        default:0
    },
    description:{
        type:String,
        required:[true,"please provide product description"],
        maxlength:[1000,"description cannot be more than 1000 characters"]

    },
    image:{
        type:String,
        required:[true,"please provide product image"]
    },
    category:{
        type:String,
        required:[true,"please provide product category"]
    },
    company:{
        type:string,
        required:[true,"please provide product company"],
    },
    colors:{
        type:[],
        required:[true,"please provide product colors"]
    },
    featured:{
        type:Boolean,
        required:[true,"please provide product featured"]
    },
    inventory:{
        type:Number,
        required:[true,"please provide product inventory"]
    },
    averageRating:{
        type:Number,
        required:[true,"please provide product"]
    },
    user:{
        type:
    }
})