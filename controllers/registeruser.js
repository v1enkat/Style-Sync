const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generatetoken, login } = require('../utils/generatetoken');


module.exports.registeruser = async function (req, res) {
    try {
        let { fullname, password, email } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You alredy Have an account please Login");
 
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        password: hash,
                        email
                    });
                    let token = generatetoken(user);
                    res.cookie("token", token);
                    res.redirect("/index"); 
                }
            })
        })


    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

module.exports.login = async function (req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });

    if (!user) return res.status(402).send("There is no user with that email, please register");

    bcrypt.compare(password, user.password, function (err, result) {
        if (err) return res.status(500).send(err.message);
        if (!result) return res.status(403).send("Incorrect password, please try again");

        let token = generatetoken(user);
        res.cookie("token", token);
        res.redirect("/index");
    });
};
module.exports.logout = async function (req, res) {
    // Clear the token cookie
    res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    
    // Destroy the session if using express-session
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Could not log out.");
        }
        res.redirect("/");
    });
};
