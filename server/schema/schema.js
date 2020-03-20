const graphql = require('graphql');
const _= require('lodash');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID
    } = graphql;

var books=[
    {name:'name of the wind', genre:'fantasy', id:'1'},
    {name:'name wind', genre:'fantasy', id:'2'},
    {name:'name the wind', genre:'fantasy', id:'3'}
    
];
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id : { type: GraphQLID},
        name: { type: GraphQLString},
        genre: {type : GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
name: 'RootQueryType',
fields:{
    book:{
        type: BookType,
        args:{id:{type: GraphQLID}},
        resolve(parent,args){
            //code to get from db/other source
            console.log(typeof(args.id));
            return _.find(books,{id:args.id})
        }
    }
}
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
