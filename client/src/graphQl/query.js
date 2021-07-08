import { gql } from 'graphql-request';


export const Collections = gql`
  query User($token: String!){
    collections(token: $token){
        id
        name
        color
        createdAt
        task {
            name
            id
            isCompleted
            dueDate
        }
  }
}`

export const Tasks = gql`
  query Task($token: String!, $id: String!){
      taskByCollectionId(id: $id, token: $token ){
        id
        dueDate
        createdAt
        isCompleted
        name
    }
  }
`

export const singleCollection = gql`
query collectionById($token: String!, $id: String){
    collectionById(token: $token, id: $id){
          name
          color
          id
    }
}
`