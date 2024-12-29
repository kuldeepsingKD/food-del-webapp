import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useState, useEffect } from 'react';
import axios from 'axios'
const PlaceOrder = () => {
   

   const token = localStorage.getItem("token");
  const {getTotalCartAmount,food_list,cartItems,url} = useContext(StoreContext);
  // setAmount(getTotalCartAmount())
  const amount = .02;
  
  

  const paymentHandler = async (event) => {
    // const amount = getT;
    // const[amount,setAmount]=useState(2)
    console.log(amount,"checking");
    
    const currency = 'INR';
    const receiptId= "1234567890";
    // useEffect(() => {
    //   // const connection = createConnection(serverUrl, roomId);
    //   // connection.connect();
    //   return () => {
    //     setAmount(getTotalCartAmount())
    //   };
    // }, []);

    const response = await fetch('http://localhost:4000/api/order/placeOrder',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token':token
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt:receiptId
      })
    })


    const placeOrder = await response.json();
    console.log('placeOrder',placeOrder);
    const Amount = placeOrder.amount*100;
    // console.log(Amount);
    


   if (amount>0) {
    var option = {
      key:"rzp_test_4Dt3UB045a4VBN",
      Amount,
      currency,
      name:"Kuldeep Singh",
      description:"Test Transaction",
      image:"https://images.pexels.com/photos/29749744/pexels-photo-29749744/free-photo-of-silhouette-of-woman-with-flower-in-sunlit-room.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
      placeOrder_id:placeOrder.id,
      handler: async function (response) {
        alert("Transaction Successful");
      },
      prefill: {
        name:"Kuldeep Singh",
        email:"sibkuldeep84@gmail.com",
        contact:"6388785273",
      },
      notes:{
        address:"Razorpay Corporate Office",
      },
      theme:{
        color:"#3399cc",
      },

    }
   }
   else{
    alert("Order amount less than minimum amount allowed")
   }

    var rzp1 = new Razorpay(option);
    rzp1.on("payment.failed", function(response){
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.placeOrder_id);
      alert(response.error.metadata.payment_id);
    })

    rzp1.open();
    event.preventDefault();
    
   }

  

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
    })

    const onChangeHandler =(event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const placeOrder = async (event) => {
      event.preventDefault();
      let orderItems = [];
      food_list.map((item)=>{
       if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
       }
      })
       let orderData ={
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+2,
       }
       let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
       if (response.data.success) {
        const {session_url} = response.data;
        window.location.replace(session_url);
       }
       else{
        alert("Error");
       }
       
    }    
  
  return (
    <>
    <div className='place-order'>

      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'/>
        </div>
        <div className="multi-fields">
          <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        </div>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code'/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />

      </div>
      <div className="place-order-right">
      <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
          </div>
 
        </div>
        <button onClick={paymentHandler}>PROCEED TO PAYMENT</button>
      </div>
      </div>
    </div>
    
   </>
  )
}

export default PlaceOrder;
