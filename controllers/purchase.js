const RazorPay=require('razorpay');
const Orders=require('../models/Orders')


exports.PremiumMember=async (req, res, next) => {
    try {
     var rzp=new RazorPay({
        key_id: 'rzp_test_Rw5CRl8LJoz3YI',
        key_secret: 'qszHBay3bGUGTpr6Y1nOGE3w'
     })

    const amount=2500;

    rzp.orders.create({amount,currency:"INR"},(err,order)=>{
     if(err){
       throw new Error("err in creating rzp Oder")   
     }
     req.user.createOrder({OrderId:order.id,Status:'Pending'}).then(()=>{
        return res.status(201).json({order,key_id:rzp.key_id})
     })


    })

      } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
}

exports.UpdateTrans = async (req, res, next) => {
    try {
        const { payment_id, order_id } = req.body;

        const order = await Orders.findOne({ where: { OrderId: order_id } });

        await Promise.all([
            order.update({ PaymentId: payment_id, Status: 'Successful' }),
            req.user.update({ isPremiumUser: true })
        ]);

        return res.status(202).json({ success: true, message: 'Transaction Successful' });

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}







