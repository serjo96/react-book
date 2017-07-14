import React, { Component } from 'react'
import Inputs from './index'
import {addBook} from '../actions/userActions'
import { connect } from 'react-redux'


class InputsContainer extends Component {
    render() {
        return <Inputs addBook={this.props.addBook} />
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    addBook: (item) => dispatch(addBook(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputsContainer)