const tailorModel = require('../models/tailor-model');
const bcrypt = require('bcrypt');
const { generatetoken } = require('../utils/generatetoken');

module.exports.registertailor = async function (req, res) {
    try {
        let { fullname, password, email } = req.body;

        let existingTailor = await tailorModel.findOne({ email: email });
        if (existingTailor) return res.status(401).send("You already have an account, please login.");

        bcrypt.genSalt(10, function (err, salt) {
            if (err) return res.status(500).send(err.message);

            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.status(500).send(err.message);

                let newTailor = await tailorModel.create({
                    fullname,
                    password: hash,
                    email
                });
                let token = generatetoken(newTailor);
                res.cookie("token", token);
                res.redirect("/products/createproducts");
            });
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

module.exports.login = async function (req, res) {
    try {
        let { email, password } = req.body;

        let tailor = await tailorModel.findOne({ email: email });
        if (!tailor) return res.status(402).send("There is no user with that email, please register.");

        bcrypt.compare(password, tailor.password, function (err, result) {
            if (err) return res.status(500).send(err.message);
            if (!result) return res.status(403).send("Incorrect password, please try again.");

            let token = generatetoken(tailor);
            res.cookie("token", token);
            res.redirect("/products/createproduct");
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

module.exports.logout = async function (req, res) {
    res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Could not log out.");
        }
        res.redirect("/");
    });
};
