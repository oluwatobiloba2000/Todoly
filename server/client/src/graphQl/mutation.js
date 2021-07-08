import { gql } from 'graphql-request';

export const Login = gql`
  mutation Login($email: String!, $password: String! ){
    login(email: $email, password: $password){
        id
        lastName
        firstName
        token
  }
}
`

export const Signup = gql`
  mutation Signup($email: String!, $firstName: String!, $lastName: String!, $password: String!){
    signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName){
      token
      firstName
      lastName
      id
  }
}
`


export const User = gql`
  mutation User($token: String!){
    user(token: $token){
      id
      firstName
      lastName
    }
}
`

export const CreateCollectionQuery = gql`
  mutation CreateCollection($token: String!, $name: String!, $color: String!){
    createCollection(token: $token, name: $name, color: $color){
      id
      name
      color
      user{
        id
        email
        firstName
        lastName
      }
    }
}
`

export const CreateTaskQuery = gql`
 mutation createTask($token: String!, $name: String!, $collectionId: String!, $dueDate: String){
 createTask(token: $token , collectionId: $collectionId, name: $name, dueDate: $dueDate){
    id
    name
    isCompleted
    dueDate
    createdAt
    updatedAt
  }
 }
`

export const CompletedTask = gql`
 mutation completeTask($token: String!, $taskId: String!){
        completeTask(token : $token, taskId: $taskId){
          id
        }
      }

`

export const unCompleteTaskQuery = gql`
 mutation unCompleteTask($token: String!, $taskId: String!){
        unCompleteTask(token : $token, taskId: $taskId){
          id
        }
      }

`

export const deleteTaskQuery = gql`
 mutation deleteTask($token: String!, $taskId: String!){
          deleteTask(token : $token, taskId: $taskId){
          taskId
        }
      }

`

export const editTaskQuery = gql`
 mutation editTask($token: String!, $taskId: String!, $name: String!){
   editTask(token : $token, taskId: $taskId, name: $name){
          id
          name
    }
}`

export const deleteCollectionQuery = gql`
 mutation deleteCollection($token: String!, $collectionId: String!){
  deleteCollection(token : $token, collectionId: $collectionId){
    collectionId
  }
}`