const Users = require('../models/sign');

exports.GetUser = async (req, res, next) => {
    try {
        const Email = req.query.Email;

        const existingUser = await Users.findOne({ where: { Email: Email } });

        if (existingUser) {
            return res.status(200).json({ User: 'login successful' });
        } else {
            return res.status(400).json({ User: null }); 
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};