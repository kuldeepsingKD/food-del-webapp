import Razorpay from "razorpay"


 
const placeOrder = async (req,res) => {
           console.log("backend running");
           
    try {
        const razorpay = new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET 
        });
        if (!req.body) {
           return res.status(400).send("Bad Request"); 
        }
        const options = req.body;

        const placeOrder = await razorpay.orders.create(options);

        if (!placeOrder) {
            return res.status(400).send("Bad Request");
        }

        res.json(placeOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
}
// // import razorpay from 'razorpay'
// import Razorpay from "razorpay";

// const razorpayInstance = createRazorpayInstance();

// // const razorpay = require('razorpay');

 
// // const createRazorpayInstance = () =>{
// //     return new razorpay({
// //      key_id :process.env.RAZORPAY_KEY_ID,
// //      key_secret: process.env.RAZORPAY_KEY_SECRET 
// //     });
// // }

// // placing user order for frontend
// const placeOrder = async(req,res) =>{

//     const frontend_url = "http://localhost:5173";
//     const razorpay = new Razorpay({
//             key_id :process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_KEY_SECRET 
//         })
//          const options = {
//             amount:req.body.amount,
//             currency:"USD",
//             payment_capture:1
//          } 

//     try {
//         const newOrder = new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address
//         })
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//         const line_items = req.body.items.map((item)=>({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:item.name
//                 },
//                 unit_amount:item.price*100*80
//             },
//             quantity:item.quantity
            
//         }))

//         line_items.push({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:2*100*80
//             },
//             quantity:1
//         })
        
//         // const session = await razorpayInstance.checkout.create({
//         //     line_items:line_items,
//         //     mode:'payment',
//         //     success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//         //     cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//         // })
        
//         // const razorpay = new Razorpay({
//         //     key_id :process.env.RAZORPAY_KEY_ID,
//         //     key_secret: process.env.RAZORPAY_KEY_SECRET 
//         // })
//         //  const options = {
//         //     amount:req.body.amount,
//         //     currency:req.body.currency,
//         //     payment_capture:1
//         //  } 

//          const response = await razorpay.orders.create(options)


//         res.json({success:true})

//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error while razorpay"});
        
//     }
// }

export {placeOrder};