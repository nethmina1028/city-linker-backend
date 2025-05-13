const User = require("../models/user");


const addUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

   
        const newUser = new User({
            name,
            email,
            phone,
        });

        await newUser.save();
        res.status(201).json(newUser);
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { addUser };

