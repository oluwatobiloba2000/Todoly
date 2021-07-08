const bcrypt = require('bcryptjs');
const sequelize = require("sequelize");
const { ApolloError } = require('apollo-server-errors');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('jsonwebtoken');
const { fetchSingleUser, fetchSingleUserById } = require('../repository/user/user');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } = require('../../utils/helpers/constants');
const { signup, login } = require("./Mutation/auth");
const { createCollection, editCollection, deleteCollection} = require("./Mutation/collection");
const {createTask, completeTask, unCompleteTask, editTask, deleteTask} = require("./Mutation/task");
require("dotenv").config();

const pubsub = new PubSub()

const resolvers = {
    Query: {
       
        async collections(root, { token }, { model }) {
            return jwt.verify(token, process.env.JWT_SECRET, async (err, {userId})=>{
                if (err) {
                      throw new ApolloError('Invalid access', BAD_REQUEST, {
                        descriptiveMessage: err.message
                    })
                }
                else{
                    const singleUser = await fetchSingleUserById(model, userId);
                    if (!singleUser) {
                        throw new ApolloError('user does not exist', BAD_REQUEST, {
                            descriptiveMessage: "this user is not found"
                        })
                    }
        
                    const collection = await model.collections.findAll(
                        {
                            where: {
                                user_id: userId
                            },
                            include: [
                                {
                                    model: model.tasks,
                                    as: "task",
                                    
                                }
                            ],
                            order: [[sequelize.col("collections.createdAt"), "DESC" ]]
                        }
                    );
        
                    if (!collection) {
                        throw new ApolloError('No collection', OK, {
                            descriptiveMessage: "create a new collection"
                        })
                    }
        
                    // const array = []
                    // collection.map((data) => {
                    //     array.push(data.toJSON())
                    // })
                    return collection
                    // return collection;
            }})

        },
        async taskByCollectionId(root, {token, id }, { model }) {
            return jwt.verify(token, process.env.JWT_SECRET, async (err)=>{
                if (err) {
                      throw new ApolloError('Invalid access', BAD_REQUEST, {
                        descriptiveMessage: err.message
                    })
                }
                else{
                    const collection = await model.collections.findOne({
                        where:{
                            id
                        }
                    })
                    return await model.tasks.findAll({
                        where: {
                            collection_id: id
                        },
                    })
                    
                    
            }})
        },
        async collectionById(root, {token, id }, { model }) {
            return jwt.verify(token, process.env.JWT_SECRET, async (err)=>{
                if (err) {
                      throw new ApolloError('Invalid access', BAD_REQUEST, {
                        descriptiveMessage: err.message
                    })
                }
                else{
                    return await model.collections.findOne({
                        where:{
                            id
                        }
                    })
            }})
        }
    },


    Mutation: {
        signup,
        login,
        createCollection,
        editCollection,
        deleteCollection,
        createTask,
        completeTask,
        unCompleteTask,
        editTask,
        deleteTask,
        async user(root, { token }, { model }) {
            return jwt.verify(token, process.env.JWT_SECRET, async (err, decoded)=>{
             if (err) {
                   throw new ApolloError('Invalid access', BAD_REQUEST, {
                     descriptiveMessage: err.message
                 })
             }
             else{
                 
                 return await model.users.findOne({
                     where: {
                         id: decoded.userId
                     },
                     include: [
                         {
                             model: model.collections,
                             as: "collection"
                         },
                     ],
                 });
             }
            });
  
             
     },
    },
    Subscription: {
        collectionAdded: {
            subscribe: ()=> pubsub.asyncIterator("collectionAdded")
        }
    }
    //  Collection: {
    //    async user(recipe) {
    //      return recipe.getUser();
    //    },
    //  },
    //  Task: {
    //     async collection(task) {
    //       return task.getCollection();
    //     },
    //   },
}
module.exports = resolvers;