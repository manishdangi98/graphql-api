const graphql = require('graphql');
const _= require('lodash');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
    } = graphql;

var books=[
    {name:'name of the wind', genre:'fantasy', id:'1'},
    {name:'name wind', genre:'fantasy', id:'2'},
    {name:'name the wind', genre:'fantasy', id:'3'}
    
];

var authors =[
    {name: 'Amish Tripathi', age : 44, id:'1'},
    {name:'Chetan Bhagat',age:34, id:'2'},
    {name:'Murakami', age:65,id:'3'}
];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id : { type: GraphQLID},
        name: { type: GraphQLString},
        genre: {type : GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id : { type: GraphQLID},
        name: { type: GraphQLString},
        age: {type : GraphQLInt}
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
    },
    Author:{
        type: AuthorType,
        args: {id:{type: GraphQLID}},
        resolve(parent,args){
            return _.find(authors,{id:args.id})
        }
    }
}
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
