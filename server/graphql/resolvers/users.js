const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
const { SECRET_KEY } = require('../../config')
const User = require('../../models/userSchema')

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
    }, SECRET_KEY, { expiresIn: '1h'})
}

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            }
            catch (err) {
                throw new Error(err)
            }
        },
        async getUser(_, { userId }) {
            try {
                const user = await User.findById(userId)
                if (user) {
                    return user
                } else {
                    throw new Error('User not found')
                }
            }
            catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async login(_, {name, password}){
            const {errors, valid} = validateLoginInput(name, password)
            if(!valid){
                throw new UserInputError('Errors!', { errors })
            }
            
            const user = await User.findOne({ name })
            if(!user)
            {
                errors.general = 'User not found!'
                throw new UserInputError('User not found!', { errors })
            }

            const match = await bcrypt.compare(password, user.password)
            if(!match)
            {
                errors.general = 'Wrong credentials!'
                throw new UserInputError('Wrong credentials!', { errors })
            }

            const token = generateToken(user)

            return{
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_, { registerInput: { name, email, password, confirmPassword, phone } }) {
            const { valid, errors } = validateRegisterInput(name, email, password, confirmPassword, phone)
            if(!valid){
                throw new UserInputError('sos un trolaso y te gusta el pedazo', { errors })
            }

            const user = await User.findOne({
                name
            })
            if(user){
                throw new UserInputError('Name is already taken!', {
                    errors: {
                        name: 'Name is already taken!'
                    }
                })
            }

            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                name,
                email,
                password,
                phone,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save()

            const token = generateToken(res)

            return{
                ...res._doc,
                id: res._id,
                token
            }
        },
    }
}