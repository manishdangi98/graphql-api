import React, { Component } from 'react'
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getAuthorQuery,addBookMutation} from '../queries/queries';



class AddBook extends Component {
 constructor(props){
     super(props);
     this.state={
         name:'',
         genre:'',
         authorId:''
     };
 }

    displayAuthor(){
        var data = this.props.getAuthorQuery;
        // console.log(this.props);
        if(data.loading){
            return(<option disabled>Loading Authors</option>)
        }
        else{
            return data.authors.map(author =>{
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId

            }
        });
    }
    
    render(){
        return (
            <form onSubmit={this.submitForm.bind(this)} id="add-book">

        <div className="fields">
            <label >Book name:</label>
            <input type="text" onChange={(e) =>this.setState({name:e.target.value})}/>
        </div>

        <div className="fields">
            <label >Genre:</label>
            <input type="text" onChange={(e)=>this.setState({genre:e.target.value})}/>
        </div>
    
        <div className="fields">
            <label >Author:</label>
            <select onChange={(e)=>this.setState({authorId:e.target.value})}>
                <option>Select author</option>
                {this.displayAuthor()}
            </select>
        </div>

        <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorQuery,{name:"getAuthorQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);
