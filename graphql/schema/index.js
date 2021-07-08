const { gql } = require("apollo-server");

 const typeDef = gql`

type User{
    id: String!
    email: String!
    firstName: String!
    lastName: String!
    tokenId: String!
    collection: [Collection]!
    createdAt: String!
    updatedAt: String
}


type Collection{
    id: String
    name: String!
    color: String!
    task: [Task]
    createdAt: String
    updatedAt: String
}

type Task{
    id: String
    name: String
    isCompleted: Boolean
    # user: User
    # collection: Collection!
    dueDate: String
    createdAt: String
    updatedAt: String
}

type Auth{
    id: String!
    email: String!
    firstName: String!
    lastName: String!
    tokenId: String
    token: String!
    createdAt: String!
    updatedAt: String
}

type CreateCollection{
    id: String
    name: String!
    color: String!
    user: User
    createdAt: String
    updatedAt: String
}

type CompleteTask{
    id: String
    name: String
    isCompleted: Boolean
    user: User
    dueDate: String
    createdAt: String
    updatedAt: String
}

type DeleteTask{
    message: String!
    taskId: String!
}

type EditCollection{
    id: String
    name: String!
    color: String!
    createdAt: String
    updatedAt: String
}

type DeleteCollection{
    message: String!
    collectionId: String!
}


type Query {
    collections(token: String!): [Collection]
    taskByCollectionId(token: String!, id: String!): [Task]!
    collectionById(token: String!, id: String!): Collection!
}

type Mutation{
    user(token: String!): User
    signup(email: String!, firstName: String!, lastName: String!, password: String!, tokenId: String ): Auth!
      
    login(email: String!, password: String! ): Auth!
    
    createCollection(
        token: String!
        name: String!
        color: String!
    ): CreateCollection!

    editCollection(
        token: String!
        collectionId: String!
        name: String
        color: String
    ): EditCollection!

    deleteCollection(
        collectionId: String!
        token: String!
    ): DeleteCollection!

    createTask(
        token: String!
        name: String!
        collectionId: String!
        dueDate: String
    ): Task!

    completeTask(
        token: String!
        taskId: String!
    ): CompleteTask!

    unCompleteTask(
        token: String!
        taskId: String!
    ): CompleteTask!

    editTask(
        token: String!
        taskId: String!
        name: String!
    ): CompleteTask!

    deleteTask(
        token: String!
        taskId: String!
    ): DeleteTask!
}

type Subscription{
    collectionAdded(collectionId: String!): Collection!
}
`

module.exports = typeDef;