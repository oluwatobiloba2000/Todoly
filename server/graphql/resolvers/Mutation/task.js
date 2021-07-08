const bcrypt = require('bcryptjs');
const sequelize = require("sequelize");
const { ApolloError } = require('apollo-server-errors');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');
const { fetchSingleUser, fetchSingleUserById } = require('../../repository/user/user');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } = require('../../../utils/helpers/constants');
require("dotenv").config();


const pubsub = new PubSub()

async function createTask(root, { token, name, collectionId, dueDate }, { model }) {
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

                const collection = await model.collections.findOne(
                    {
                        where: {
                            id: collectionId
                        },
                        include: [
                            {
                                model: model.users,
                                as: "user"
                            }
                        ],
                        group: ['collections.id', "user.id"]
                    }
                );

                if (!collection) {
                    throw new ApolloError('collection does not exist', BAD_REQUEST, {
                        descriptiveMessage: "this collection is not found"
                    })
                }

                const task = await model.tasks.create({
                    user_id: userId,
                    name,
                    collection_id: collectionId,
                    dueDate
                });

        

                return {
                    user: { ...collection.dataValues.user.dataValues },
                    collection: { ...collection.dataValues },
                    ...task.dataValues,
                }
            }
        })



    } catch (e) {
        throw new ApolloError('Internal Server Error', INTERNAL_SERVER_ERROR, {
            descriptiveMessage: e.descriptiveMessage || "something went wrong"
        })
    }
}

async function completeTask(root, { token, taskId }, { model }) {
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

                const taskExist = await model.tasks.findOne(
                    {
                        where: {
                            id: taskId
                        },
                    }
                );

                if (!taskExist) {
                    throw new ApolloError('task does not exist', BAD_REQUEST, {
                        descriptiveMessage: "this task is not found"
                    })
                }

                const task = await model.tasks.update({
                    isCompleted: true
                }, {
                    where: {
                        id: taskId
                    },
                    returning: true
                });
                return {
                    user: singleUser,
                    ...task[1][0].dataValues,
                }
            }
        })


    } catch (e) {
        throw new ApolloError('Internal Server Error', INTERNAL_SERVER_ERROR, {
            descriptiveMessage: e.descriptiveMessage || "something went wrong"
        })
    }

}

async function unCompleteTask(root, { token, taskId }, { model }) {
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

                const taskExist = await model.tasks.findOne(
                    {
                        where: {
                            id: taskId
                        },
                    }
                );

                if (!taskExist) {
                    throw new ApolloError('task does not exist', BAD_REQUEST, {
                        descriptiveMessage: "this task is not found"
                    })
                }

                const task = await model.tasks.update({
                    isCompleted: false
                }, {
                    where: {
                        id: taskId
                    },
                    returning: true
                });
                return {
                    user: singleUser,
                    ...task[1][0].dataValues,
                }
            }
        })

    } catch (e) {
        throw new ApolloError('Internal Server Error', INTERNAL_SERVER_ERROR, {
            descriptiveMessage: e.descriptiveMessage || "something went wrong"
        })
    }
}

async function editTask(root, { token, taskId, name }, { model }) {
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

                const taskExist = await model.tasks.findOne(
                    {
                        where: {
                            id: taskId
                        },
                    }
                );

                if (!taskExist) {
                    throw new ApolloError('task does not exist', BAD_REQUEST, {
                        descriptiveMessage: "this task is not found"
                    })
                }

                const task = await model.tasks.update({
                    name: name
                }, {
                    where: {
                        id: taskId
                    },
                    returning: true
                });
                return {
                    user: singleUser,
                    ...task[1][0].dataValues,
                }
            }
        })


    } catch (e) {
        throw new ApolloError('Internal Server Error', INTERNAL_SERVER_ERROR, {
            descriptiveMessage: e.descriptiveMessage || "something went wrong"
        })
    }
}

async function deleteTask(root, { token, taskId }, { model }) {
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


                const taskExist = await model.tasks.findOne(
                    {
                        where: {
                            id: taskId
                        },
                    }
                );

                if (!taskExist) {
                    throw new ApolloError('task does not exist', BAD_REQUEST, {
                        descriptiveMessage: "this task is not found"
                    })
                }

                await model.tasks.destroy({
                    where: {
                        id: taskId
                    }
                });
                return {
                    message: 'Task deleted',
                    taskId,
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
    createTask,
    completeTask,
    unCompleteTask,
    editTask,
    deleteTask
}