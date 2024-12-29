import userModel from "../models/userModel.js"

const addToCart = async (req,res) => {
  try {
    let userData = await userModel.findById(req.headers.userId); 
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId])
    { 
        cartData[req.body.itemId] = 1
       }
       else{
        cartData[req.body.itemId] += 1;
       }
       await userModel.findByIdAndUpdate(req.headers.userId,{cartData});
       res.json({success:true,message:"Added to Cart"});
  } catch (error) {
    console.log(error);
    removeFromCart.json({success:false,message:"Error whilew"});
  }
}

// remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.headers.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
            
        }
        await userModel.findByIdAndUpdate(req.headers.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
      
        
    }
}

// fetch user cart data
const getCart = async (req,res) => {
   try {
    let userData = await userModel.findById(req.headers.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData});
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
   }
}


export {addToCart,removeFromCart,getCart};