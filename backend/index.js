const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolver = require('./graphql/resolvers');
const cors = require('cors');
const path = require('path'); // Make sure `path` is imported

// Middleware
const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', // Local development frontend
    'http://a954cecfc0f3e4bb2a19b1b74a930871-916292411.us-east-1.elb.amazonaws.com', // Deployed frontend
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include cookies or credentials
};
app.use(cors(corsOptions));

// Connecting to database
connectDB();
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/users', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/update'));
app.use('/api/users', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/account'));

async function startServer() {
  // Uncomment if ApolloServer is needed
  // const server = new ApolloServer({ typeDefs, resolver });
  // await server.start(); // Ensure the server starts before applying middleware
  // server.applyMiddleware({ app, path: '/gql' });

  if (process.env.NODE_ENV === 'production') {
    // Serve static files from frontend
    app.use(express.static('frontend/dist'));

    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
  }

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server starts on port ${PORT}`);
    // Uncomment if ApolloServer is needed
    // console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}
startServer();