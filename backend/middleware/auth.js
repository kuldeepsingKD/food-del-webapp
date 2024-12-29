import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) => {
   const {token} = req.headers;
   if (!token) {
    return res.json({success:false,message:"Not Authorized Login Again"})
   }
   try {
    const toke_decode = jwt.verify(token,process.env.JWT_SECRET);
    console.log(toke_decode);
    
   //  req.body.userId = toke_decode.id;
   //   let userid = req.body.userId;
     let userid = toke_decode.id;
     req.headers.userId = userid;
    next();
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
   }
    

}

export default authMiddleware;