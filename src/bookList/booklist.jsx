import React, { Component } from 'react';
import { connect } from 'react-redux'
import  {deleteBook} from '../actions/userActions'
import Book from './index'



class BookList extends Component {
    render() {
        return (
            <Book deleteBook={this.props.deleteBook} />
        )
    }
};



function mapStateToProps (state) {
    return {
        book: state.id
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteBook: (params) => dispatch(deleteBook(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookList)