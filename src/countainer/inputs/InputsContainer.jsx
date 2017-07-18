import React, { Component } from 'react'
import AddBook from './addInput'
import {addBook, changeBook} from '../../actions/userActions'
import { connect } from 'react-redux'


class InputsContainer extends Component {
    render() {
        return <AddBook addBook={this.props.addBook} changeBook={this.props.changeBook} />
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    addBook: (item) => dispatch(addBook(item)),
    changeBook: (book) => dispatch(changeBook(book))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputsContainer)