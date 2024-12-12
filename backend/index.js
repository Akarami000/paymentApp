// Set NODE_ENV to production if not already set
process.env.NODE_ENV = process.env.NODE_ENV || "production";

// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolver = require('./graphql/resolvers');
const cors = require('cors');

// Middleware 
const app = express();
app.use(cors());

// Connect to the database
connectDB();
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/users', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/update'));
app.use('/api/users', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/account'));

// Start Apollo Server and Express App
async function startServer() {
    // const server = new ApolloServer({ typeDefs, resolver });
    // await server.start(); // Ensure the server starts before applying middleware
    // server.applyMiddleware({ app, path: '/gql' });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server starts on port ${PORT}`);
        // console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
}
startServer();