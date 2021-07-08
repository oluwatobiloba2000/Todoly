const bcrypt = require('bcryptjs');
const { ApolloError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const { fetchSingleUser } = require('../../repository/user/user');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../../../utils/helpers/constants');
require("dotenv").config();



async function signup (root, { firstName, lastName, tokenId, email, password }, { model }) {
    try {
        const singleUser = await fetchSingleUser(model, email);
        if (singleUser) {
            throw new ApolloError('email already exist', BAD_REQUEST, {
                descriptiveMessage: "Try another email address"
            })
        }
        const user =  await model.users.create({
            firstName,
            email,
            lastName,
            tokenId,
            password: await bcrypt.hash(password, 10),
        });

        const token = jwt.sign({ userId: user.dataValues.id, email: user.dataValues.email }, process.env.JWT_SECRET, { expiresIn: '1y' })

        return {
            ...user.dataValues,
            token
        }
    } catch (e) {
        throw new ApolloError('Internal Server Error', INTERNAL_SERVER_ERROR, {
            descriptiveMessage: e.descriptiveMessage || "something went wrong"
        })
    }
}

async function login(root, { email, password }, { model }) {
    
        const singleUser = await fetchSingleUser(model, email);
        if (!singleUser) {
            throw new ApolloError('Incorrect username or password', BAD_REQUEST, {
                descriptiveMessage: "check your email address or password and try again"
            })
        }
        const isPassowrdValid = await bcrypt.compare(password, singleUser.dataValues.password)

        if (!isPassowrdValid) {
            throw new ApolloError('Incorrect username or password', BAD_REQUEST, {
                descriptiveMessage: "check your email address or password and try again"
            })
        }
        
        const token = jwt.sign({ userId: singleUser.dataValues.id, email: singleUser.dataValues.email }, process.env.JWT_SECRET, { expiresIn: '1y' });
 

        return {
           ...singleUser.dataValues,
            token
        }
}


module.exports={
    signup,
    login
}
