const {gql} = require('apollo-server-express');

const typeDefs = gql`
type User{
    id:ID,
    firstName:String!
    LastName:String!
    email:String!
}
type Query{
    getUser(id:ID!):User
    getUsers:[User]
}
type Mutation{
    createUser(firstName:String!,lastName:String!,email:String!):User
}
`

module.exports = typeDefs;
