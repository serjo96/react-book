import React, { Component } from 'react';
import { connect } from 'react-redux'
import  {deleteBook, takeChanges} from '../actions/userActions'




 class Book extends Component {
     constructor(props) {
         super(props);
         this.test = this.test.bind(this);
         this.deleteItem = this.deleteItem.bind(this);

     }

    deleteItem(){
        this.props.deleteBook(
             this.props.id
        );
    }

    test(){
       this.props.takeChanges({
           id: this.props.id,
           author: this.props.author,
           name: this.props.name,
           img: this.props.img,
           test: true
       });
    }

    render() {
        return (
            <div className="book-item" id={this.props.id}>
                <div className="book-item__btn delete-btn" onClick={this.deleteItem}></div>
                <div className="book-item__btn change-btn" onClick={this.test}></div>
                <div className="book-item__data">
                    <img className="book-item__img" src={this.props.img}  alt=""/>
                    <div className="book-item__info">
                        <div className="book-item__author">{this.props.author}</div>
                        <div className="book-item__name">{this.props.name}</div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps () {
    return {}
}


const mapDispatchToProps = (dispatch) => ({
    deleteBook: (params) => dispatch(deleteBook(params)),
    takeChanges: (params) => dispatch(takeChanges(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Book)