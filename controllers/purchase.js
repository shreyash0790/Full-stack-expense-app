const RazorPay=require('razorpay');
const Orders=require('../models/Orders')
const Expense = require('../models/home');

require('dotenv').config();

exports.PremiumMember = async (req, res, next) => {
  console.log(process.env.RAZORPAY_ID_KEY)
  console.log(process.env.RAZORPAY_SECRET_KEY)
  try {
      var rzp = new RazorPay({
          key_id:process.env.RAZORPAY_ID_KEY,
          key_secret: process.env.RAZORPAY_SECRET_KEY
      });

  

     
    const order = await rzp.orders.create({ amount:3500, currency: 'INR' });


    await req.users.createOrder({ OrderId: order.id, Status: 'Pending' });

    // const isPremiumUser=req.users.IsPremiumUser
    // const Username=req.users.Name

    return res.status(201).json({ order, key_id: rzp.key_id});

  } catch (err) {
    console.error(err); 
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.UpdateTrans = async (req, res, next) => {
    try {
        const { payment_id, order_id } = req.body;

        const order = await Orders.findOne({ where: { OrderId: order_id } });

        await Promise.all([
            order.update({ PaymentId: payment_id, Status: 'Successful' }),
            req.users.update({ IsPremiumUser: true})
        ]);

        return res.status(202).json({ success: true, message: 'Transaction Successful' });

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
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










