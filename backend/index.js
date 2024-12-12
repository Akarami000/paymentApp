const express = require("express");
const{ApolloServer} = require('apollo-server-express');
const connectDB = require('./config/db')
const typeDefs = require('./graphql/typeDefs')
const resolver = require('./graphql/resolvers')
const cors = require('cors');
//MiddleWare 
const app = express();
app.use(cors());

//connecting to data base
connectDB();
app.use(express.json());

app.use('/api/users',require('./routes/api/users'));
app.use('/api/users',require('./routes/api/auth'));
app.use('/api/users',require('./routes/api/update'));
app.use('/api/users',require('./routes/api/profile'));
app.use('/api/users',require('./routes/api/account'))

async function startServer(){
      // const server = new ApolloServer({typeDefs,resolver});
      // await server.start(); // Ensure the server starts before applying middleware
      // server.applyMiddleware({app,path:'/gql'});
      const PORT  = 8000;
      app.listen(PORT,()=>{
         console.log(`server starts on port ${PORT}`)
      //   console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
      } )
}
startServer();




