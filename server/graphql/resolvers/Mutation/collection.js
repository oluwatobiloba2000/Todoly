const { ApolloError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const { fetchSingleUserById } = require('../../repository/user/user');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require('../../../utils/helpers/constants');
require("dotenv").config();

const pubsub = new PubSub()


async function createCollection(root, { token, name, color }, { model }) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET, async (err, { userId }) => {
            if (err) {
                throw new ApolloError('Invalid access', BAD_REQUEST, {
                    descriptiveMessage: err.message
                })
            }
            else {
                const singleUser = await fetchSingleUserById(model, userId);
                if (!singleUser) {
                    throw new ApolloError('user does not exist', BAD_REQUEST, {
                        descriptiveMessage: "this user is not found"
                    })
                }

                const collection = await model.collections.create({
                    user_id: singleUser.id,
                    name,
                    color
                });

                pubsub.publish('collectionAdded', { collectionAdded: { ...collection.dataValues}})

                return {
                    ...collection.dataValues,
                    user: singleUser
                }
            }
        })

    } catch (e) {
        throw new ApolloError('Internal Server Error', INTERNAL_SERVER_ERROR, {
            descriptiveMessage: e.descriptiveMessage || "something went wrong"
        })
    }
}


async function editCollection(root, { token, collectionId, name, color }, { model }) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET, async (err, { userId }) => {
            if (err) {
                throw new ApolloError('Invalid access', BAD_REQUEST, {
                    descriptiveMessage: err.message
                })
            }
            else {
                const singleUser = await fetchSingleUserById(model, userId);
                if (!singleUser) {
                    throw new ApolloError('user does not exist', BAD_REQUEST, {
                        descriptiveMessage: "this user is not found"
                    })
                }

                const collectionExist = await model.collections.findOne(
                    {
                        where: {
                            id: collectionId
                        },
                    }
                );

                if (!collectionExist) {
                    throw new ApolloError('collection does not exist', BAD_REQUEST, {
                        descriptiveMessage: "this collection is not found"
                    })
                }

                const collection = await model.collections.update({
                    name: name || collectionExist.dataValues.name,
                    color: color || collectionExist.dataValues.color
                }, {
                    where: {
                        id: collectionId
                    },
                    returning: true
                });
                return {
                    user: singleUser,
                    ...collection[1][0].dataValues,
                }
            }
        })


    } catch (e) {
        throw new ApolloError('Internal Server Error', INTERNAL_SERVER_ERROR, {
            descriptiveMessage: e.descriptiveMessage || "something went wrong"
        })
    }
}

async function deleteCollection(root, {token, collectionId }, { model }) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET, async (err, { userId }) => {
            if (err) {
                throw new ApolloError('Invalid access', BAD_REQUEST, {
                    descriptiveMessage: err.message
                })
            }
            else {
                const singleUser = await fetchSingleUserById(model, userId);
                if (!singleUser) {
                    throw new ApolloError('user does not exist', BAD_REQUEST, {
                        descriptiveMessage: "this user is not found"
                    })
                }


                const collectionExist = await model.collections.findOne(
                    {
                        where: {
                            id: collectionId
                        },
                    }
                );

                if (!collectionExist) {
                    throw new ApolloError('collection does not exist', BAD_REQUEST, {
                        descriptiveMessage: "this collection is not found"
                    })
                }

                await model.collections.destroy({
                    where: {
                        id: collectionId
                    }
                });
                return {
                    message: 'Collection deleted',
                    collectionId,
                }
            }
        })

    } catch (e) {
        throw new ApolloError('Internal Server Error', INTERNAL_SERVER_ERROR, {
            descriptiveMessage: e.descriptiveMessage || "something went wrong"
        })
    }
}


module.exports = {
    createCollection,
    editCollection,
    deleteCollection
}