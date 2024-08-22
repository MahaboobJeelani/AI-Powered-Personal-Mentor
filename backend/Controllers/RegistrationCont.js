const RegistrationModel = require('../Models/RegistrationModel')
const sendMail = require('../Middlewares/SendMail')
const TokenModel = require('../Models/TokenModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');


// ==== Registraion form ============

const Registration = async (req, resp) => {
    const { email, password, role } = req.body;
    try {
        let findUser = await RegistrationModel.findOne({ email })
        if (findUser) resp.send('User already exist')
        else {
            const saltRounds = Number(process.env.SALT_ROUNDS);
            const genSalt = await bcrypt.genSalt(saltRounds);
            const passwordHash = await bcrypt.hash(password, genSalt);

            const createUser = new RegistrationModel({
                email: email,
                password: passwordHash,
                role: role
            })
            findUser = await createUser.save();

            const newToken = new TokenModel({
                userid: findUser._id,
                token: crypto.randomBytes(32).toString("hex"),
            })
            const token = await newToken.save();

            const url = `${process.env.BASE_URL}career/${findUser._id}/verify/${token.token}`

            await sendMail(email, `${role} Verification mail`, url);

            resp.status(201).json({ message: "An Email send to your Account please verify" })
        }
    } catch (error) {
        console.log(error.message);
    }
}


// =================== Login Form ==================

const login = async (req, resp) => {
    const { email, password, role } = req.body
    try {
        const findUser = await RegistrationModel.findOne({ email });

        if (!findUser) resp.status(404).send('invalid user')
        const validPassword = await bcrypt.compare(password, findUser.password)

        if (!findUser.isVerified) {
            const token = await TokenModel.findOne({ userid: findUser._id })
            if (!token) {
                const newToken = new TokenModel({
                    userid: findUser._id,
                    token: crypto.randomBytes(32).toString("hex"),
                })

                const token = await newToken.save();

                const url = `${process.env.BASE_URL}career/${findUser._id}/verify/${token.token}`

                await sendMail(email, `${role} Verification mail`, url);
            }
            resp.status(400).send({ message: 'An Email send to your Account please verify' })
        } else {
            if (validPassword) {
                if (findUser.role === role) {
                    const user = {
                        name: findUser.name,
                        password: findUser.password
                    }
                    const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '2h' })

                    resp.json({ message: "Login Successfully", token })
                } else {
                    resp.send("role is not match")
                }

            } else {
                resp.send('Invalid Credencials')
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { Registration, login }