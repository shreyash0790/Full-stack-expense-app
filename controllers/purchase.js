const RazorPay=require('razorpay');
const User = require('../models/sign');
const Order = require('../models/Orders');

require('dotenv').config();

exports.PremiumMember = async (req, res, next) => {
  try {
      var rzp = new RazorPay({
          key_id:process.env.RAZORPAY_ID_KEY,
          key_secret: process.env.RAZORPAY_SECRET_KEY
      });

  

     
    const order = await rzp.orders.create({ amount:3500, currency: 'INR' });


    await Order.create({ OrderId: order.id, Status: 'Pending', userId: req.users });

   
    return res.status(201).json({ order, key_id: rzp.key_id});

  } catch (err) {
    console.error(err); 
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.updateTrans = async (req, res, next) => {
  try {
      const { payment_id, order_id } = req.body;

      const order = await Order.findOne({ OrderId: order_id });

      if (!order) {
          return res.status(404).json({ error: 'Order not found' });
      }

      // Update the order and the user in parallel using Promise.all
      await Promise.all([
          Order.updateOne({ OrderId: order_id }, { PaymentId: payment_id, Status: 'Successful' }),
          User.updateOne({ _id: req.users._id }, { IsPremiumUser: true })
      ]);

      return res.status(202).json({ success: true, message: 'Transaction Successful' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUsers= async (req, res, next) => {
  try {

 
  const isPremiumUser= await req.users.IsPremiumUser
  const Username=await req.users.Name

  return res.status(201).json({ isPremiumUser,Username});

} catch (err) {
  console.error(err); 
    res.status(500).json({ error: 'Internal Server Error' });
}

}










