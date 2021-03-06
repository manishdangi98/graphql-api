const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb+srv://graph:graphapi@cluster0-o5czy.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.once('open',()=>{
    console.log('connected to the database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
    
}))

app.listen(4000,()=>{
    console.log('now listening for requests on port 4000');
});